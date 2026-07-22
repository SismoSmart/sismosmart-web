# Changelog

## Unreleased

No unreleased changes.

## v0.1.2 - 2026-05-17

- Pass contact and newsletter endpoint secrets into the production post-deploy verification step so endpoint reachability is checked by CI/CD instead of being skipped as local-only configuration.

## v0.1.1 - 2026-05-17

- Prerender localized pages as static HTML by removing request-header locale injection from the root layout and proxy.
- Replace small React client islands for mobile navigation, cookie consent, and JSON form submission with server-rendered HTML plus minimal vanilla browser scripts.
- Defer below-the-fold home sections with `content-visibility: auto` to reduce first viewport layout cost.
- Update the analysis and agent run logs with final CI/CD, release, and NotebookLM sync evidence.

## v0.1.0 - 2026-05-17

- Add CI, security, release, Lighthouse, and production deployment workflows.
- Add cPanel post-deploy verification and rollback automation.
- Add repository contract tests for deployment and automation invariants.
- Enforce `https://www.sismosmart.com` as the canonical site URL in app metadata and deploy-managed redirects.
- Improve light-green badge contrast for Lighthouse accessibility.
- Retry transient SSH/SFTP handshake drops during cPanel deployment without retrying commands after they start.
- Update GitHub Actions workflow action versions to Node.js 24-compatible major releases.
- Guard optional AI issue summaries behind `ISSUE_AI_SUMMARY_ENABLED` so unavailable GitHub Models access cannot fail repository checks.
- Warm production pages before post-deploy and Lighthouse checks to remove cPanel Passenger cold-start noise from quality audits.
