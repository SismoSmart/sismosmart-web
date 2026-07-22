# CI/CD automation

GitHub is the sole source-control, pull-request, CI/CD, release, security, and operational automation platform for SismoSmart Web. No secondary execution provider or repository mirror is supported.

## Continuous integration

`.github/workflows/quality-ci.yml` validates commit policy, lint, TypeScript, tests with coverage, production build, standalone deployment smoke, dependency audit, and browser/accessibility behavior. `.github/workflows/security.yml` provides dependency, secret, and code scanning.

Pull requests must use GitHub status checks as the canonical review evidence. When hosted runners are unavailable, changes remain blocked until GitHub capacity is restored or an approved self-hosted GitHub runner is available. A different CI platform must not be used as substitute evidence.

## Production deployment

`.github/workflows/deploy-prod.yml` is the only production deployment control plane. Production deployment is manual-only and transactional. It requires the exact current `main` SHA, an operation-specific confirmation phrase, production environment approval, and scoped deployment credentials. A push never activates production automatically.

## Read-only audits

GitHub Actions schedules DNS cutover, mail DNS, Lighthouse, analytics observability, and production-health audits. Audit jobs publish compact, redacted evidence with bounded retention and do not receive deployment credentials unless their documented operation requires them.

## No staging target

The project intentionally has no staging environment or staging deployment automation. Pull-request CI and guarded production validation are the pre-production quality gates.

## Ownership

The platform owner maintains GitHub organization access, repository settings, Actions permissions, environments, runners, secrets, variables, GitHub Apps, webhooks, artifact retention, and recovery access. Repository automation changes require pull-request review and successful checks.
