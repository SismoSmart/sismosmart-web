# Optional DNS Legacy Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Allow the DNS cutover audit to run without a guessed retired-origin address while preserving all legacy checks when a real address is configured.

**Architecture:** Treat the legacy address as optional protected configuration. Keep the main audit flow intact, guard only the legacy-IP-dependent operations, and provide a stable `not-configured` report object for consumers.

**Tech Stack:** Node.js 22, ECMAScript modules, Node test runner, GitHub Actions.

## Global Constraints

- `DNS_ORIGIN_IPV4` remains required and private.
- Never commit actual origin or provider addresses.
- A non-empty `DNS_LEGACY_IPV4` must be valid and distinct from the origin.
- Missing legacy configuration must not produce a warning or failure.
- Existing configured-legacy behavior must remain compatible.

---

### Task 1: Optional protected network configuration

**Files:**
- Modify: `tests/ops-network-config.test.mjs`
- Modify: `scripts/ops/network-config.mjs`

**Interfaces:**
- Consumes: `hydrateNetworkConfig(config, environment, options)`
- Produces: a config with `originIpv4` always present and `legacyIpv4` present only for a valid non-empty environment value.

- [ ] Add failing tests for absent optional legacy configuration, invalid non-empty legacy configuration, and equal optional addresses.
- [ ] Run the focused network-config test and confirm failure.
- [ ] Implement optional normalization and validation.
- [ ] Run the focused test and confirm success.

### Task 2: Conditional legacy audit result

**Files:**
- Modify: `tests/dns-cutover.test.mjs`
- Modify: `scripts/ops/dns-cutover-lib.mjs`
- Modify: `scripts/ops/dns-cutover.mjs`

**Interfaces:**
- Produces: `createUnconfiguredLegacyEndpoint()` returning a stable report object with `configured: false` and classification `not-configured`.

- [ ] Add a failing unit test for the unconfigured legacy report shape.
- [ ] Run the focused DNS test and confirm failure.
- [ ] Add the pure helper and guard former-nameserver IP comparison and endpoint requests behind `config.legacyIpv4`.
- [ ] Keep the configured legacy branch behavior unchanged.
- [ ] Run both focused test files and confirm success.

### Task 3: Operations documentation and repository contracts

**Files:**
- Modify: `docs/operations/dns-cutover.md`
- Review: `.github/workflows/dns-cutover.yml`

**Interfaces:**
- The workflow continues passing both secret names, but an empty `DNS_LEGACY_IPV4` is now valid application input.

- [ ] Update the runbook to describe Cloudflare delegation without claiming a known retired origin.
- [ ] Document conditional legacy checks and the `not-configured` state.
- [ ] Confirm no private address or credential is introduced.

### Task 4: Verification and delivery

**Files:**
- All changed files.

- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Run `npm audit --audit-level=high`.
- [ ] Run the live audit with only the protected origin value and confirm `legacy=not-configured`.
- [ ] Push the feature branch, open a pull request, inspect all checks and feedback, merge only when clean.
- [ ] Trigger `dns-cutover.yml` on `main` and verify success.
