import process from "node:process";

import { google } from "googleapis";

import {
  getCommandUsage,
  normalizeSearchConsoleSite,
  opsConfig,
  parseCliArgs,
  printJson,
} from "./config.mjs";
import { getAnalyticsIdentifiers } from "./analytics-config.mjs";
import { ensureTxtRecord } from "./cpanel-dns.mjs";
import { getGoogleAuthClient, GOOGLE_SCOPES } from "./google-auth.mjs";

const usage = getCommandUsage("ops:search-console", [
  "status",
  "list-sites",
  "generate-token [domain]",
  "verify-domain [domain]",
  "submit-sitemap [site] [sitemapUrl]",
  "bootstrap-domain [domain] [--verify]",
]);

function getClients(auth) {
  return {
    siteVerification: google.siteVerification({
      version: "v1",
      auth,
    }),
    webmasters: google.webmasters({
      version: "v3",
      auth,
    }),
  };
}

function buildVerificationSite(domain) {
  return {
    identifier: domain,
    type: "INET_DOMAIN",
  };
}

async function getVerificationToken(siteVerification, domain) {
  const response = await siteVerification.webResource.getToken({
    requestBody: {
      site: buildVerificationSite(domain),
      verificationMethod: "DNS_TXT",
    },
  });

  return response.data.token;
}

function getSearchConsoleConfig() {
  const identifiers = getAnalyticsIdentifiers();
  return {
    site: normalizeSearchConsoleSite(identifiers.searchConsoleSite.value),
    sitemapUrl: identifiers.searchConsoleSitemapUrl.value || opsConfig.sitemapUrl,
  };
}

async function runStatus() {
  const { client, mode } = await getGoogleAuthClient([
    GOOGLE_SCOPES.searchConsole,
    GOOGLE_SCOPES.siteVerification,
  ]);
  const { siteVerification, webmasters } = getClients(client);
  const [sitesResponse, verifiedResponse] = await Promise.all([
    webmasters.sites.list(),
    siteVerification.webResource.list(),
  ]);

  const config = getSearchConsoleConfig();
  const domain = config.site.replace(/^sc-domain:/, "");
  const sites = sitesResponse.data.siteEntry || [];
  const verifiedResources = verifiedResponse.data.items || [];

  printJson({
    authMode: mode,
    configuredSearchConsoleSite: config.site,
    configuredSitemapUrl: config.sitemapUrl,
    verification: {
      siteAccessible: sites.some((site) => site.siteUrl === config.site),
      domainVerified: verifiedResources.some((resource) =>
        [resource?.site?.identifier, resource?.id]
          .filter(Boolean)
          .some((value) => String(value).includes(domain)),
      ),
    },
    searchConsoleSites: sites,
    verifiedResources,
  });
}

async function runListSites() {
  const { client } = await getGoogleAuthClient([GOOGLE_SCOPES.searchConsole]);
  const { webmasters } = getClients(client);
  const response = await webmasters.sites.list();

  printJson(response.data.siteEntry || []);
}

async function runGenerateToken(domain) {
  const { client, mode } = await getGoogleAuthClient([GOOGLE_SCOPES.siteVerification]);
  const { siteVerification } = getClients(client);
  const targetDomain = domain || opsConfig.domain;
  const token = await getVerificationToken(siteVerification, targetDomain);

  printJson({
    authMode: mode,
    domain: targetDomain,
    verificationMethod: "DNS_TXT",
    token,
    dnsRecord: {
      type: "TXT",
      name: targetDomain,
      value: token,
    },
  });
}

async function runVerifyDomain(domain) {
  const { client, mode } = await getGoogleAuthClient([
    GOOGLE_SCOPES.siteVerification,
    GOOGLE_SCOPES.searchConsole,
  ]);
  const { siteVerification, webmasters } = getClients(client);
  const targetDomain = domain || opsConfig.domain;
  const site = buildVerificationSite(targetDomain);

  const verification = await siteVerification.webResource.insert({
    verificationMethod: "DNS_TXT",
    requestBody: { site },
  });

  const searchConsoleSite = `sc-domain:${targetDomain}`;
  await webmasters.sites.add({ siteUrl: searchConsoleSite });

  printJson({
    authMode: mode,
    verification: verification.data,
    searchConsoleSite,
  });
}

async function runSubmitSitemap(site, sitemapUrl) {
  const { client, mode } = await getGoogleAuthClient([GOOGLE_SCOPES.searchConsole]);
  const { webmasters } = getClients(client);
  const config = getSearchConsoleConfig();
  const targetSite = normalizeSearchConsoleSite(site || config.site);
  const targetSitemap = sitemapUrl || config.sitemapUrl;

  await webmasters.sitemaps.submit({
    siteUrl: targetSite,
    feedpath: targetSitemap,
  });

  printJson({
    authMode: mode,
    submitted: true,
    site: targetSite,
    sitemap: targetSitemap,
  });
}

async function runBootstrapDomain(domain, options) {
  const { client, mode } = await getGoogleAuthClient([
    GOOGLE_SCOPES.siteVerification,
    GOOGLE_SCOPES.searchConsole,
  ]);
  const { siteVerification, webmasters } = getClients(client);
  const targetDomain = domain || opsConfig.domain;
  const token = await getVerificationToken(siteVerification, targetDomain);
  const dnsAutomationReady = Boolean(
    process.env.CPANEL_HOST && process.env.CPANEL_API_TOKEN && process.env.SSH_USER,
  );
  const dnsResult = dnsAutomationReady
    ? await ensureTxtRecord({
        domain: targetDomain,
        name: targetDomain,
        value: token,
      })
    : { changed: false, manualStepRequired: true };

  const summary = {
    authMode: mode,
    domain: targetDomain,
    dnsAutomationReady,
    dnsRecordAdded: dnsResult.changed,
    token,
    verified: false,
    searchConsoleSite: `sc-domain:${targetDomain}`,
    sitemapSubmitted: false,
  };

  if (!options.verify) {
    printJson(summary);
    return;
  }

  const verification = await siteVerification.webResource.insert({
    verificationMethod: "DNS_TXT",
    requestBody: {
      site: buildVerificationSite(targetDomain),
    },
  });

  await webmasters.sites.add({
    siteUrl: summary.searchConsoleSite,
  });

  await webmasters.sitemaps.submit({
    siteUrl: summary.searchConsoleSite,
    feedpath: getSearchConsoleConfig().sitemapUrl,
  });

  printJson({
    ...summary,
    verified: true,
    sitemapSubmitted: true,
    verification,
  });
}

async function main() {
  const { positional, options } = parseCliArgs();
  const [command = "status", firstArg, secondArg] = positional;

  switch (command) {
    case "status":
      await runStatus();
      break;
    case "list-sites":
      await runListSites();
      break;
    case "generate-token":
      await runGenerateToken(firstArg);
      break;
    case "verify-domain":
      await runVerifyDomain(firstArg);
      break;
    case "submit-sitemap":
      await runSubmitSitemap(firstArg, secondArg);
      break;
    case "bootstrap-domain":
      await runBootstrapDomain(firstArg, options);
      break;
    case "help":
    case "--help":
    case "-h":
      console.log(usage);
      break;
    default:
      throw new Error(`Unknown Search Console command: ${command}\n\n${usage}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
