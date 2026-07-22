import dns from "node:dns/promises";
import fs from "node:fs/promises";
import https from "node:https";
import net from "node:net";
import path from "node:path";
import { performance } from "node:perf_hooks";
import process from "node:process";
import { pathToFileURL } from "node:url";

import {
  requireConfig,
  requireSshAuth,
  toRemoteAbsolutePath,
} from "../deploy/config.mjs";
import {
  getApplications,
  runRemoteCommand,
} from "../deploy/helpers.mjs";
import {
  aggregateFormAccess,
  classifyHealth,
  evaluateReleaseState,
  evaluateThreshold,
  evaluateWorkflowStreak,
  normalizeQuota,
  normalizeResourceUsage,
  sanitizeReport,
} from "./production-health-lib.mjs";

const GIB = 1024 ** 3;
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_CAPTURE_BYTES = 64 * 1024;

export const productionHealthPublicRoutes = [
  {
    expectedLocationSuffix: "/en",
    expectedStatuses: [307, 308],
    key: "root",
    path: "/",
  },
  { expectedStatuses: [200], key: "en", path: "/en" },
  { expectedStatuses: [200], key: "tr", path: "/tr" },
  { expectedStatuses: [200], key: "robots", path: "/robots.txt" },
  { expectedStatuses: [200], key: "sitemap", path: "/sitemap.xml" },
  {
    expectedStatuses: [200],
    key: "manifest",
    path: "/site.webmanifest",
  },
  {
    expectedStatuses: [200],
    formTarget: "contact",
    key: "contact",
    path: "/api/contact",
  },
  {
    expectedStatuses: [200],
    formTarget: "waitlist",
    key: "waitlist",
    path: "/api/waitlist",
  },
];

const ORIGIN_ROUTES = productionHealthPublicRoutes.filter((route) =>
  ["en", "robots", "contact", "waitlist"].includes(route.key),
);

const WORKFLOW_TARGETS = {
  deploy: "deploy-prod.yml",
  lighthouse: "lighthouse.yml",
  security: "security.yml",
};

function shellEscape(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function rounded(value) {
  return Number.isFinite(value) ? Math.round(value * 100) / 100 : null;
}

function safeErrorCode(error) {
  const code = String(error?.code || "REQUEST_FAILED");
  return /^[A-Z0-9_]+$/.test(code) ? code : "REQUEST_FAILED";
}

function fixedLookup(address, family) {
  return (_hostname, options, callback) => {
    if (options?.all) {
      callback(null, [{ address, family }]);
      return;
    }
    callback(null, address, family);
  };
}

async function measureHttps({ hostname, lookupAddress, route }) {
  const startedAt = performance.now();
  let lookupAt;
  let connectAt;
  let secureAt;
  let responseAt;

  return new Promise((resolve) => {
    const request = https.request(
      {
        agent: false,
        headers: {
          accept: route.formTarget ? "application/json" : "text/html,*/*",
          "user-agent": "SismoSmart-Production-Health/1.0",
        },
        hostname,
        lookup: lookupAddress
          ? fixedLookup(lookupAddress.address, lookupAddress.family)
          : undefined,
        method: "GET",
        path: route.path,
        port: 443,
        rejectUnauthorized: true,
        servername: hostname,
      },
      (response) => {
        responseAt = performance.now();
        const chunks = [];
        let capturedBytes = 0;

        response.on("data", (chunk) => {
          if (!route.formTarget || capturedBytes >= MAX_CAPTURE_BYTES) return;
          const remaining = MAX_CAPTURE_BYTES - capturedBytes;
          const bounded = chunk.subarray(0, remaining);
          chunks.push(bounded);
          capturedBytes += bounded.length;
        });

        response.on("end", () => {
          const endedAt = performance.now();
          const status = response.statusCode ?? null;
          const location = String(response.headers.location || "");
          const redirectOk = route.expectedLocationSuffix
            ? location.endsWith(route.expectedLocationSuffix)
            : true;
          let configured;
          let target;
          let formOk = true;

          if (route.formTarget) {
            try {
              const payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
              configured = payload?.configured === true;
              target = payload?.target;
              formOk =
                payload?.ok === true &&
                configured &&
                target === route.formTarget;
            } catch {
              formOk = false;
            }
          }

          const statusOk = route.expectedStatuses.includes(status);
          resolve({
            cacheStatus: response.headers["cf-cache-status"] || null,
            cloudflare: Boolean(
              response.headers["cf-ray"] ||
                String(response.headers.server || "").toLowerCase() ===
                  "cloudflare",
            ),
            configured,
            connectMs: rounded(connectAt ? connectAt - startedAt : null),
            errorCode: null,
            lookupMs: rounded(lookupAt ? lookupAt - startedAt : null),
            ok: statusOk && redirectOk && formOk,
            status,
            target,
            tlsMs: rounded(secureAt ? secureAt - startedAt : null),
            totalMs: rounded(endedAt - startedAt),
            ttfbMs: rounded(responseAt - startedAt),
          });
        });
      },
    );

    request.on("socket", (socket) => {
      socket.once("lookup", () => {
        lookupAt = performance.now();
      });
      socket.once("connect", () => {
        connectAt = performance.now();
      });
      socket.once("secureConnect", () => {
        secureAt = performance.now();
      });
    });

    request.setTimeout(REQUEST_TIMEOUT_MS, () => {
      const error = new Error("request timeout");
      error.code = "ETIMEDOUT";
      request.destroy(error);
    });

    request.on("error", (error) => {
      const endedAt = performance.now();
      resolve({
        cacheStatus: null,
        cloudflare: false,
        configured: undefined,
        connectMs: rounded(connectAt ? connectAt - startedAt : null),
        errorCode: safeErrorCode(error),
        lookupMs: rounded(lookupAt ? lookupAt - startedAt : null),
        ok: false,
        status: null,
        target: undefined,
        tlsMs: rounded(secureAt ? secureAt - startedAt : null),
        totalMs: rounded(endedAt - startedAt),
        ttfbMs: null,
      });
    });

    request.end();
  });
}

async function probeRouteSet({ hostname, lookupAddress, routes }) {
  const cold = await Promise.all(
    routes.map((route) => measureHttps({ hostname, lookupAddress, route })),
  );
  await new Promise((resolve) => setTimeout(resolve, 500));
  const warm = await Promise.all(
    routes.map((route) => measureHttps({ hostname, lookupAddress, route })),
  );

  const results = routes.map((route, index) => ({
    cold: cold[index],
    key: route.key,
    warm: warm[index],
  }));

  return {
    ok: results.every((result) => result.cold.ok && result.warm.ok),
    routes: results,
  };
}

export async function resolvePublicDns({ hostname }) {
  const startedAt = performance.now();
  try {
    const addresses = await dns.lookup(hostname, { all: true });
    return {
      durationMs: rounded(performance.now() - startedAt),
      ok: addresses.length > 0,
    };
  } catch (error) {
    return {
      durationMs: rounded(performance.now() - startedAt),
      errorCode: safeErrorCode(error),
      ok: false,
    };
  }
}

export async function resolveOriginAddress({ config }) {
  try {
    const family = net.isIP(config.sshHost);
    if (family) {
      return { address: config.sshHost, family, ok: true };
    }
    const resolved = await dns.lookup(config.sshHost);
    return { address: resolved.address, family: resolved.family, ok: true };
  } catch (error) {
    return { errorCode: safeErrorCode(error), ok: false };
  }
}

export function probePublicRoutes({ config }) {
  const hostname = new URL(config.publicBaseUrl).hostname;
  return probeRouteSet({ hostname, routes: productionHealthPublicRoutes });
}

export function probeOriginRoutes({ config, origin }) {
  if (!origin?.ok || !origin.address) {
    return Promise.resolve({ ok: false, routes: [] });
  }
  const hostname = new URL(config.publicBaseUrl).hostname;
  return probeRouteSet({
    hostname,
    lookupAddress: origin,
    routes: ORIGIN_ROUTES,
  });
}

export function parseRemoteInspection(stdout, passenger) {
  const result = {
    buildId: "",
    current: "",
    filesystemUsagePercent: null,
    formLogAvailable: false,
    formRecords: [],
    htaccess: "",
    passenger,
    processCwds: [],
    releaseBytes: null,
    releaseCount: null,
  };

  for (const line of stdout.split(/\r?\n/)) {
    if (!line) continue;
    const [kind, key, value] = line.split("\t");
    if (kind === "state") {
      if (key === "current") result.current = value || "";
      if (key === "htaccess") result.htaccess = value || "";
      if (key === "buildId") result.buildId = value || "";
      if (key === "processCwd" && value) result.processCwds.push(value);
    }
    if (kind === "metric") {
      if (key === "filesystemUsagePercent") {
        result.filesystemUsagePercent = Number(value);
      }
      if (key === "releaseBytes") result.releaseBytes = Number(value);
      if (key === "releaseCount") result.releaseCount = Number(value);
    }
    if (kind === "formLog") result.formLogAvailable = key === "available";
    if (kind === "form") {
      result.formRecords.push({ route: key, status: Number(value) });
    }
  }

  return result;
}

export function buildRemoteInspectionScript({
  config,
  htaccessPath,
  passenger,
  remoteAppRoot,
  remoteReleasesRoot,
}) {
  return `
set -u
domain=${shellEscape(config.domain)}
current="$(readlink -f ${shellEscape(remoteAppRoot)} 2>/dev/null || true)"
htaccess="$(awk '$1 == "PassengerAppRoot" { value=$2; gsub(/^"|"$/, "", value); print value; exit }' ${shellEscape(htaccessPath)} 2>/dev/null || true)"
build_id=""
if [ -s ${shellEscape(path.posix.join(passenger || "/missing", ".next", "BUILD_ID"))} ]; then
  build_id="$(cat ${shellEscape(path.posix.join(passenger || "/missing", ".next", "BUILD_ID"))} 2>/dev/null || true)"
fi
printf 'state\tcurrent\t%s\n' "$current"
printf 'state\thtaccess\t%s\n' "$htaccess"
printf 'state\tbuildId\t%s\n' "$build_id"
for pid in $(ps -u ${shellEscape(config.sshUser)} -o pid= -o comm= 2>/dev/null | awk '$2 == "next-server" { print $1 }'); do
  cwd="$(readlink -f "/proc/$pid/cwd" 2>/dev/null || true)"
  if [ -n "$cwd" ]; then printf 'state\tprocessCwd\t%s\n' "$cwd"; fi
done
release_count="$(find ${shellEscape(remoteReleasesRoot)} -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')"
release_bytes="$(du -sk ${shellEscape(remoteReleasesRoot)} 2>/dev/null | awk '{print $1 * 1024}' || true)"
filesystem_usage="$(df -Pk ${shellEscape(config.remoteHome)} 2>/dev/null | awk 'NR == 2 { gsub(/%/, "", $5); print $5 }' || true)"
printf 'metric\treleaseCount\t%s\n' "\${release_count:-0}"
printf 'metric\treleaseBytes\t%s\n' "\${release_bytes:-0}"
printf 'metric\tfilesystemUsagePercent\t%s\n' "\${filesystem_usage:-0}"
log_file=""
for candidate in \
  "$HOME/access-logs/$domain" \
  "$HOME/access-logs/\${domain}-ssl_log" \
  "$HOME/access_logs/$domain" \
  "$HOME/logs/$domain"; do
  if [ -f "$candidate" ] && [ -r "$candidate" ]; then
    log_file="$candidate"
    break
  fi
done
if [ -z "$log_file" ]; then
  for candidate in "$HOME/access-logs/$domain"*; do
    if [ -f "$candidate" ] && [ -r "$candidate" ]; then
      log_file="$candidate"
      break
    fi
  done
fi
if [ -n "$log_file" ]; then
  if form_output="$(set -o pipefail; tail -n 20000 "$log_file" 2>/dev/null | awk '
    {
      method = substr($6, 2)
      contact = ($7 == "/api/contact" || index($7, "/api/contact?") == 1)
      waitlist = ($7 == "/api/waitlist" || index($7, "/api/waitlist?") == 1)
      if ((method == "GET" || method == "POST") &&
          (contact || waitlist) &&
          $9 ~ /^[0-9][0-9][0-9]$/) {
        route = contact ? "contact" : "waitlist"
        printf "form\\t%s\\t%s\\n", route, $9
      }
    }
  ')"; then
    printf 'formLog\tavailable\t1\n'
    if [ -n "$form_output" ]; then printf '%s\n' "$form_output"; fi
  else
    printf 'formLog\tunavailable\t0\n'
  fi
else
  printf 'formLog\tunavailable\t0\n'
fi
`;
}

export async function inspectRemoteProduction({ config }) {
  const applications = await getApplications(config);
  const application = applications.find(
    (candidate) =>
      candidate.domain === config.remoteAppDomain &&
      candidate.uri === config.remoteAppUri &&
      candidate.appRoot,
  );
  const passenger = application?.appRoot || "";
  const remoteAppRoot = toRemoteAbsolutePath(config, config.remoteAppRoot);
  const remoteReleasesRoot = toRemoteAbsolutePath(
    config,
    config.remoteReleasesRoot,
  );
  const publicHtmlPath = toRemoteAbsolutePath(config, config.remotePublicRoot);
  const htaccessPath = path.posix.join(publicHtmlPath, ".htaccess");

  const script = buildRemoteInspectionScript({
    config,
    htaccessPath,
    passenger,
    remoteAppRoot,
    remoteReleasesRoot,
  });

  const { stdout } = await runRemoteCommand(config, script);
  return parseRemoteInspection(stdout, passenger);
}

async function fetchCpanel(config, moduleName, functionName, fetchImpl) {
  const response = await fetchImpl(
    `${config.cpanelHost}/execute/${moduleName}/${functionName}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `cpanel ${config.sshUser}:${config.cpanelToken}`,
      },
      signal: AbortSignal.timeout(10_000),
    },
  );
  if (!response.ok) {
    throw new Error(`CPANEL_${moduleName.toUpperCase()}_${response.status}`);
  }
  return response.json();
}

export async function readCpanelHealth({ config, fetchImpl = fetch }) {
  if (!config.cpanelHost || !config.cpanelToken || !config.sshUser) {
    return {
      quotaPayload: null,
      resourcePayload: null,
      warnings: ["cPanel quota/resource usage is unavailable"],
    };
  }

  const warnings = [];
  const [quota, resources] = await Promise.allSettled([
    fetchCpanel(config, "Quota", "get_quota_info", fetchImpl),
    fetchCpanel(config, "ResourceUsage", "get_usages", fetchImpl),
  ]);

  if (quota.status === "rejected") {
    warnings.push("cPanel quota usage could not be read");
  }
  if (resources.status === "rejected") {
    warnings.push("cPanel LVE resource usage could not be read");
  }

  return {
    quotaPayload: quota.status === "fulfilled" ? quota.value : null,
    resourcePayload: resources.status === "fulfilled" ? resources.value : null,
    warnings,
  };
}

export async function readTargetWorkflowRuns({
  fetchImpl = fetch,
  repository = process.env.GITHUB_REPOSITORY,
  token = process.env.GITHUB_TOKEN,
} = {}) {
  if (!repository || !token) {
    throw new Error("GITHUB_ACTIONS_READ_UNAVAILABLE");
  }

  const entries = await Promise.all(
    Object.entries(WORKFLOW_TARGETS).map(async ([key, workflow]) => {
      const response = await fetchImpl(
        `https://api.github.com/repos/${repository}/actions/workflows/${encodeURIComponent(workflow)}/runs?status=completed&per_page=3`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "User-Agent": "SismoSmart-Production-Health/1.0",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          signal: AbortSignal.timeout(10_000),
        },
      );
      if (!response.ok) {
        throw new Error(`GITHUB_WORKFLOW_${key.toUpperCase()}_${response.status}`);
      }
      const payload = await response.json();
      const runs = Array.isArray(payload.workflow_runs)
        ? payload.workflow_runs.map((run) => ({
            conclusion: run.conclusion,
            createdAt: run.created_at,
          }))
        : [];
      return [key, runs];
    }),
  );

  return Object.fromEntries(entries);
}

function warmRoute(routeSet, key) {
  return routeSet?.routes?.find((route) => route.key === key)?.warm;
}

function summarizeProbe(probe) {
  if (!probe) return null;
  return {
    cacheStatus: probe.cacheStatus || null,
    cloudflare: Boolean(probe.cloudflare),
    configured:
      typeof probe.configured === "boolean" ? probe.configured : undefined,
    connectMs: probe.connectMs ?? null,
    errorCode: probe.errorCode || null,
    lookupMs: probe.lookupMs ?? null,
    ok: Boolean(probe.ok),
    status: probe.status ?? null,
    target: probe.target,
    tlsMs: probe.tlsMs ?? null,
    totalMs: probe.totalMs ?? null,
    ttfbMs: probe.ttfbMs ?? null,
  };
}

function summarizeRouteSet(routeSet) {
  return {
    ok: Boolean(routeSet?.ok),
    routes: (routeSet?.routes || []).map((route) => ({
      cold: summarizeProbe(route.cold),
      key: route.key,
      warm: summarizeProbe(route.warm),
    })),
  };
}

function capacityResult(remote, quota, resources, warnings) {
  const filesystem = evaluateThreshold(remote?.filesystemUsagePercent, {
    critical: 95,
    warning: 85,
  });
  const releaseCount = evaluateThreshold(remote?.releaseCount, {
    critical: 13,
    warning: 9,
  });
  const releaseBytes = evaluateThreshold(remote?.releaseBytes, {
    critical: 2 * GIB + 1,
    warning: GIB + 1,
  });
  const quotaThreshold = quota.available
    ? evaluateThreshold(quota.usagePercent, { critical: 90, warning: 80 })
    : null;
  const normalizedResources = resources.map((resource) => {
    const usagePercent =
      resource.maximum > 0
        ? Math.round((resource.usage / resource.maximum) * 10_000) / 100
        : null;
    return {
      ...resource,
      usagePercent,
    };
  });

  for (const [label, measurement] of [
    ["filesystem usage", filesystem],
    ["release count", releaseCount],
    ["release bytes", releaseBytes],
    ["account quota", quotaThreshold],
  ]) {
    if (measurement?.severity === "warning") {
      warnings.push(`${label} is above the warning threshold`);
    }
    if (measurement?.severity === "error") {
      warnings.push(`${label} is above the critical threshold`);
    }
    if (measurement?.severity === "unavailable") {
      warnings.push(`${label} measurement is unavailable`);
    }
  }

  if (!quota.available) warnings.push("account quota limit is unavailable");

  return {
    blocking: [filesystem, releaseCount, releaseBytes, quotaThreshold].some(
      (measurement) => measurement?.severity === "error",
    ),
    filesystem,
    quota: { ...quota, severity: quotaThreshold?.severity || "unavailable" },
    releaseBytes,
    releaseCount,
    resources: normalizedResources,
  };
}

function formsResult(publicSet, remote, warnings) {
  const contact = warmRoute(publicSet, "contact");
  const waitlist = warmRoute(publicSet, "waitlist");
  const runtimeOk = Boolean(
    contact?.ok &&
      contact?.configured &&
      contact?.target === "contact" &&
      waitlist?.ok &&
      waitlist?.configured &&
      waitlist?.target === "waitlist",
  );
  const access = aggregateFormAccess(remote?.formRecords || []);
  const blocking =
    access.serverError >= 5 && access.serverErrorRate >= 0.2;

  if (!remote?.formLogAvailable && access.total === 0) {
    warnings.push("form access-log aggregation is unavailable");
  } else if (access.serverError > 0) {
    warnings.push("form access logs contain server errors");
  }

  return {
    access,
    blocking,
    ok: runtimeOk,
    runtime: {
      contact: Boolean(contact?.ok && contact?.configured),
      waitlist: Boolean(waitlist?.ok && waitlist?.configured),
    },
  };
}

function workflowResult(runsByTarget, warnings) {
  const targets = {};
  for (const key of Object.keys(WORKFLOW_TARGETS)) {
    const result = evaluateWorkflowStreak(runsByTarget?.[key] || [], 2);
    targets[key] = result;
    if (result.consecutiveFailures === 1) {
      warnings.push(`${key} workflow latest run failed once`);
    }
  }
  return {
    blocking: Object.values(targets).some((target) => target.blocking),
    targets,
  };
}

async function callOrFallback(task, fallback) {
  try {
    return await task();
  } catch (error) {
    return fallback(error);
  }
}

export async function runProductionHealth({
  config,
  inspectRemote = inspectRemoteProduction,
  now = () => new Date(),
  probeOrigin = probeOriginRoutes,
  probePublic = probePublicRoutes,
  readCpanel = readCpanelHealth,
  readWorkflowRuns = readTargetWorkflowRuns,
  resolveOrigin = resolveOriginAddress,
  resolvePublic = resolvePublicDns,
} = {}) {
  if (!config) throw new Error("Production health config is required.");

  const warnings = [];
  const hostname = new URL(config.publicBaseUrl).hostname;

  const dnsResult = await callOrFallback(
    () => resolvePublic({ config, hostname }),
    (error) => ({ errorCode: safeErrorCode(error), ok: false }),
  );
  const originResolution = await callOrFallback(
    () => resolveOrigin({ config, hostname }),
    (error) => ({ errorCode: safeErrorCode(error), ok: false }),
  );

  const cpanelPromise = callOrFallback(
    () => readCpanel({ config }),
    () => ({
      quotaPayload: null,
      resourcePayload: null,
      warnings: ["cPanel quota/resource usage could not be read"],
    }),
  );
  const workflowPromise = callOrFallback(
    () => readWorkflowRuns({ config }),
    () => null,
  );
  const [publicRaw, originRaw] = await Promise.all([
    callOrFallback(
      () => probePublic({ config, hostname }),
      (error) => ({ errorCode: safeErrorCode(error), ok: false, routes: [] }),
    ),
    callOrFallback(
      () => probeOrigin({ config, hostname, origin: originResolution }),
      (error) => ({ errorCode: safeErrorCode(error), ok: false, routes: [] }),
    ),
  ]);
  const remoteRaw = await callOrFallback(
    () => inspectRemote({ config }),
    () => null,
  );
  const [cpanelRaw, workflowRuns] = await Promise.all([
    cpanelPromise,
    workflowPromise,
  ]);

  const publicResult = summarizeRouteSet(publicRaw);
  const originResult = summarizeRouteSet(originRaw);
  const publicWarmTtfb = warmRoute(publicRaw, "en")?.ttfbMs;
  const originWarmTtfb = warmRoute(originRaw, "en")?.ttfbMs;
  if (Number.isFinite(publicWarmTtfb) && publicWarmTtfb > 1500) {
    warnings.push("public warm TTFB is above 1500 ms");
  }
  if (Number.isFinite(originWarmTtfb) && originWarmTtfb > 1200) {
    warnings.push("origin warm TTFB is above 1200 ms");
  }
  if (!originResolution.ok) {
    warnings.push("origin address could not be resolved from the SSH host");
  }

  const release = remoteRaw
    ? evaluateReleaseState(remoteRaw)
    : { mismatches: ["inspection-unavailable"], ok: false };
  if (!remoteRaw) warnings.push("release inspection is unavailable");
  const quota = normalizeQuota(cpanelRaw?.quotaPayload);
  const resources = normalizeResourceUsage(cpanelRaw?.resourcePayload);
  warnings.push(...(cpanelRaw?.warnings || []));
  const capacity = capacityResult(remoteRaw, quota, resources, warnings);
  const forms = formsResult(publicRaw, remoteRaw, warnings);

  let workflows;
  if (workflowRuns) {
    workflows = workflowResult(workflowRuns, warnings);
  } else {
    warnings.push("target workflow history could not be read");
    workflows = { blocking: false, targets: {} };
  }

  const reportBase = {
    capacity,
    dns: {
      durationMs: dnsResult.durationMs ?? null,
      errorCode: dnsResult.errorCode || null,
      ok: Boolean(dnsResult.ok),
    },
    forms,
    generatedAt: now().toISOString(),
    origin: originResult,
    public: publicResult,
    release: {
      buildIdPresent: Boolean(remoteRaw?.buildId),
      mismatches: release.mismatches,
      ok: release.ok,
    },
    schemaVersion: 1,
    warnings: [...new Set(warnings)],
    workflows,
  };
  const health = classifyHealth(reportBase);
  const report = sanitizeReport({ ...reportBase, ...health });

  return {
    exitCode: health.blocking ? 1 : 0,
    report,
  };
}

function safeFailureProbe(probe) {
  return {
    cloudflare: Boolean(probe?.cloudflare),
    configured:
      typeof probe?.configured === "boolean" ? probe.configured : null,
    errorCode: probe?.errorCode || null,
    ok: Boolean(probe?.ok),
    status: probe?.status ?? null,
    target: probe?.target || null,
  };
}

function failedRouteSummaries(routeSet) {
  return (routeSet?.routes || [])
    .filter((route) => !route?.cold?.ok || !route?.warm?.ok)
    .map((route) => ({
      key: route.key,
      cold: safeFailureProbe(route.cold),
      warm: safeFailureProbe(route.warm),
    }));
}

export function formatSafeLogSummary(report) {
  const safe = sanitizeReport({
    blocking: Boolean(report?.blocking),
    capacity: {
      filesystem: report?.capacity?.filesystem || null,
      quota: report?.capacity?.quota
        ? {
            severity: report.capacity.quota.severity,
            usagePercent: report.capacity.quota.usagePercent,
          }
        : null,
      releaseBytes: report?.capacity?.releaseBytes || null,
      releaseCount: report?.capacity?.releaseCount || null,
    },
    classification: report?.classification || "unknown",
    forms: {
      access: report?.forms?.access || null,
      ok: Boolean(report?.forms?.ok),
    },
    originFailures: failedRouteSummaries(report?.origin),
    publicFailures: failedRouteSummaries(report?.public),
    releaseMismatches: report?.release?.mismatches || [],
    warnings: report?.warnings || [],
    workflows: report?.workflows || null,
  });
  return `PRODUCTION_HEALTH_SAFE ${JSON.stringify(safe)}`;
}

function markdownSummary(report) {
  const lines = [
    "## Production health",
    "",
    `- Classification: **${report.classification}**`,
    `- Blocking: **${report.blocking ? "yes" : "no"}**`,
    `- DNS: ${report.dns.ok ? "healthy" : "failed"}`,
    `- Public edge: ${report.public.ok ? "healthy" : "failed"}`,
    `- Origin/Passenger: ${report.origin.ok ? "healthy" : "failed"}`,
    `- Release state: ${report.release.ok ? "consistent" : report.release.mismatches.join(", ")}`,
    `- Form runtime: ${report.forms.ok ? "healthy" : "failed"}`,
    `- Capacity critical: ${report.capacity.blocking ? "yes" : "no"}`,
    `- Repeated workflow failures: ${report.workflows.blocking ? "yes" : "no"}`,
  ];

  if (report.warnings.length > 0) {
    lines.push("", "### Warnings", "");
    for (const warning of report.warnings) lines.push(`- ${warning}`);
  }
  return `${lines.join("\n")}\n`;
}

function workflowCommandValue(value) {
  return String(value)
    .replaceAll("%", "%25")
    .replaceAll("\r", "%0D")
    .replaceAll("\n", "%0A");
}

async function writeReport(report) {
  const outputPath = path.resolve(
    process.env.PRODUCTION_HEALTH_OUTPUT || ".artifacts/production-health.json",
  );
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, {
    mode: 0o600,
  });
  await fs.chmod(outputPath, 0o600);

  if (process.env.GITHUB_STEP_SUMMARY) {
    await fs.appendFile(
      process.env.GITHUB_STEP_SUMMARY,
      markdownSummary(report),
      "utf8",
    );
  }

  for (const warning of report.warnings) {
    console.log(
      `::warning title=Production health::${workflowCommandValue(warning)}`,
    );
  }

  console.log(
    `PRODUCTION_HEALTH classification=${report.classification} blocking=${report.blocking} warnings=${report.warnings.length}`,
  );
  console.log(formatSafeLogSummary(report));
  console.log(`Production health report: ${outputPath}`);
}

async function main() {
  const config = requireSshAuth(
    requireConfig([
      "domain",
      "publicBaseUrl",
      "remoteAppDomain",
      "remoteAppRoot",
      "remoteAppUri",
      "remoteHome",
      "remotePublicRoot",
      "remoteReleasesRoot",
      "sshHost",
      "sshUser",
    ]),
  );
  const result = await runProductionHealth({ config });
  await writeReport(result.report);
  process.exitCode = result.exitCode;
}

const isCli =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isCli) {
  main().catch((error) => {
    console.error(`Production health audit failed: ${safeErrorCode(error)}`);
    process.exitCode = 1;
  });
}
