function isIpv4(value) {
  if (typeof value !== "string") return false;
  const parts = value.split(".");
  return parts.length === 4 && parts.every((part) => {
    if (!/^\d{1,3}$/.test(part)) return false;
    const number = Number(part);
    return number >= 0 && number <= 255 && String(number) === part;
  });
}

export function hydrateNetworkConfig(config, environment = process.env, { requireLegacy = false } = {}) {
  const required = ["DNS_ORIGIN_IPV4", ...(requireLegacy ? ["DNS_LEGACY_IPV4"] : [])];
  const missing = required.filter((key) => !environment[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required protected network configuration: ${missing.join(", ")}`);
  }

  for (const key of required) {
    if (!isIpv4(environment[key])) {
      throw new Error(`${key} must be a valid IPv4 address.`);
    }
  }

  if (requireLegacy && environment.DNS_ORIGIN_IPV4 === environment.DNS_LEGACY_IPV4) {
    throw new Error("DNS origin and legacy addresses must differ.");
  }

  return {
    ...config,
    originIpv4: environment.DNS_ORIGIN_IPV4,
    ...(requireLegacy ? { legacyIpv4: environment.DNS_LEGACY_IPV4 } : {}),
  };
}
