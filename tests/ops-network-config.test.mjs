import assert from "node:assert/strict";
import test from "node:test";

import { hydrateNetworkConfig } from "../scripts/ops/network-config.mjs";

const baseConfig = Object.freeze({ domain: "example.com" });

test("network audit addresses come from protected environment values", () => {
  assert.deepEqual(
    hydrateNetworkConfig(baseConfig, {
      DNS_ORIGIN_IPV4: "203.0.113.10",
      DNS_LEGACY_IPV4: "198.51.100.20",
    }, { requireLegacy: true }),
    {
      domain: "example.com",
      originIpv4: "203.0.113.10",
      legacyIpv4: "198.51.100.20",
    },
  );
});

test("network audit configuration fails closed without exposing values", () => {
  assert.throws(
    () => hydrateNetworkConfig(baseConfig, {}, { requireLegacy: true }),
    /Missing required protected network configuration: DNS_ORIGIN_IPV4, DNS_LEGACY_IPV4/,
  );
  assert.throws(
    () => hydrateNetworkConfig(baseConfig, {
      DNS_ORIGIN_IPV4: "not-an-ip",
      DNS_LEGACY_IPV4: "198.51.100.20",
    }, { requireLegacy: true }),
    (error) => {
      assert.match(error.message, /DNS_ORIGIN_IPV4 must be a valid IPv4 address/);
      assert.doesNotMatch(error.message, /not-an-ip/);
      return true;
    },
  );
});

test("origin and legacy addresses must differ", () => {
  assert.throws(
    () => hydrateNetworkConfig(baseConfig, {
      DNS_ORIGIN_IPV4: "203.0.113.10",
      DNS_LEGACY_IPV4: "203.0.113.10",
    }, { requireLegacy: true }),
    /origin and legacy addresses must differ/,
  );
});
