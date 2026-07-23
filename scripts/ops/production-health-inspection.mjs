import path from "node:path";

import { toRemoteAbsolutePath } from "../deploy/config.mjs";
import {
  getApplications,
  runRemoteCommand,
} from "../deploy/helpers.mjs";

function shellEscape(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
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

export async function inspectRemoteProduction({
  config,
  getApplicationsImpl = getApplications,
  runRemoteCommandImpl = runRemoteCommand,
  toRemoteAbsolutePathImpl = toRemoteAbsolutePath,
}) {
  const applications = await getApplicationsImpl(config);
  const application = applications.find(
    (candidate) =>
      candidate.domain === config.remoteAppDomain &&
      candidate.uri === config.remoteAppUri &&
      candidate.appRoot,
  );
  const passenger = application?.appRoot || "";
  const remoteAppRoot = toRemoteAbsolutePathImpl(config, config.remoteAppRoot);
  const remoteReleasesRoot = toRemoteAbsolutePathImpl(
    config,
    config.remoteReleasesRoot,
  );
  const publicHtmlPath = toRemoteAbsolutePathImpl(config, config.remotePublicRoot);
  const htaccessPath = path.posix.join(publicHtmlPath, ".htaccess");

  const script = buildRemoteInspectionScript({
    config,
    htaccessPath,
    passenger,
    remoteAppRoot,
    remoteReleasesRoot,
  });

  const { stdout } = await runRemoteCommandImpl(config, script);
  return parseRemoteInspection(stdout, passenger);
}
