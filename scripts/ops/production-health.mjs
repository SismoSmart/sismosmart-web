import process from "node:process";
import { pathToFileURL } from "node:url";

import {
  requireConfig,
  requireSshAuth,
} from "../deploy/config.mjs";
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

import {
  probeOriginRoutes,
  probePublicRoutes,
} from "./production-health-probes.mjs";
export {
  productionHealthPublicRoutes,
  probeOriginRoutes,
  probePublicRoutes,
} from "./production-health-probes.mjs";

import {
  resolveOriginAddress,
  resolvePublicDns,
  safeErrorCode,
} from "./production-health-resolution.mjs";
export {
  resolveOriginAddress,
  resolvePublicDns,
} from "./production-health-resolution.mjs";

import { inspectRemoteProduction } from "./production-health-inspection.mjs";
export {
  buildRemoteInspectionScript,
  inspectRemoteProduction,
  parseRemoteInspection,
} from "./production-health-inspection.mjs";

import { readCpanelHealth } from "./production-health-cpanel.mjs";
export { readCpanelHealth } from "./production-health-cpanel.mjs";

import {
  productionHealthWorkflowTargets,
  readTargetWorkflowRuns,
} from "./production-health-workflows.mjs";
export { readTargetWorkflowRuns } from "./production-health-workflows.mjs";

import { writeProductionHealthReport } from "./production-health-report.mjs";
export { formatSafeLogSummary } from "./production-health-report.mjs";

const GIB = 1024 ** 3;
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
  for (const key of Object.keys(productionHealthWorkflowTargets)) {
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
  await writeProductionHealthReport(result.report);
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
