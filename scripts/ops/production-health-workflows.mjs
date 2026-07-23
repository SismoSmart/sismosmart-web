import process from "node:process";

export const productionHealthWorkflowTargets = {
  deploy: "deploy-prod.yml",
  lighthouse: "lighthouse.yml",
  security: "security.yml",
};

export async function readTargetWorkflowRuns({
  fetchImpl = fetch,
  repository = process.env.GITHUB_REPOSITORY,
  token = process.env.GITHUB_TOKEN,
} = {}) {
  if (!repository || !token) {
    throw new Error("GITHUB_ACTIONS_READ_UNAVAILABLE");
  }

  const entries = await Promise.all(
    Object.entries(productionHealthWorkflowTargets).map(async ([key, workflow]) => {
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
