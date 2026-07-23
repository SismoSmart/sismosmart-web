export async function fetchCpanelHealthResource(config, moduleName, functionName, fetchImpl) {
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
    fetchCpanelHealthResource(config, "Quota", "get_quota_info", fetchImpl),
    fetchCpanelHealthResource(config, "ResourceUsage", "get_usages", fetchImpl),
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
