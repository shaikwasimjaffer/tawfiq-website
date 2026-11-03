import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INDEXNOW_KEY = "b9662631ad3040458bcd277a108621e7";
const HOST = "www.tawfiq.in";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const SITEMAP_PATH = path.resolve(__dirname, "../public/sitemap.xml");

// Canonical base URLs of Tawfiq
const DEFAULT_CANONICAL_URLS = [
  "https://www.tawfiq.in/",
  "https://www.tawfiq.in/about",
  "https://www.tawfiq.in/mission",
  "https://www.tawfiq.in/privacy",
  "https://www.tawfiq.in/terms",
];

/**
 * Extract canonical URLs from public/sitemap.xml if available
 */
function getUrlsFromSitemap() {
  try {
    if (fs.existsSync(SITEMAP_PATH)) {
      const xml = fs.readFileSync(SITEMAP_PATH, "utf-8");
      const matches = xml.match(/<loc>(https:\/\/www\.tawfiq\.in\/[^<]*)<\/loc>/g);
      if (matches && matches.length > 0) {
        const urls = matches.map((m) => m.replace(/<\/?loc>/g, "").trim());
        const validUrls = urls.filter((u) => {
          try {
            const parsed = new URL(u);
            return (
              parsed.hostname === HOST &&
              parsed.protocol === "https:" &&
              !parsed.hash
            );
          } catch {
            return false;
          }
        });
        if (validUrls.length > 0) {
          return Array.from(new Set(validUrls));
        }
      }
    }
  } catch (err) {
    console.warn(`[IndexNow] Note: Could not parse sitemap.xml (${err.message}). Using fallback canonical list.`);
  }
  return DEFAULT_CANONICAL_URLS;
}

/**
 * Pre-flight verification: Ensure verification key file is live on production
 */
async function verifyKeyFileLive(retries = 3, delayMs = 4000) {
  console.log(`[IndexNow] Pre-flight check: Verifying key at ${KEY_LOCATION}...`);
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(KEY_LOCATION, {
        method: "GET",
        headers: { "User-Agent": "Tawfiq-IndexNow-Verifier/1.0" },
        signal: AbortSignal.timeout(8000),
      });

      if (res.ok) {
        const text = (await res.text()).trim();
        if (text === INDEXNOW_KEY) {
          console.log(`[IndexNow] Key file verified on ${HOST} (HTTP ${res.status}).`);
          return true;
        } else {
          console.error(`[IndexNow] Pre-flight warning: Key file returned content mismatch.`);
        }
      } else {
        console.warn(`[IndexNow] Pre-flight attempt ${attempt}/${retries}: Key file returned HTTP ${res.status}.`);
      }
    } catch (err) {
      console.warn(`[IndexNow] Pre-flight attempt ${attempt}/${retries} error: ${err.message}`);
    }

    if (attempt < retries) {
      console.log(`[IndexNow] Waiting ${delayMs / 1000}s for deployment propagation...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  return false;
}

/**
 * Submit URL list to IndexNow API
 */
async function submitToIndexNow(urls) {
  console.log("==================================================");
  console.log("TAWFIQ: INDEXNOW NOTIFICATION & SUBMISSION");
  console.log("==================================================");
  console.log(`Host:        ${HOST}`);
  console.log(`Key:         ${INDEXNOW_KEY.slice(0, 8)}...${INDEXNOW_KEY.slice(-4)}`);
  console.log(`KeyLocation: ${KEY_LOCATION}`);
  console.log(`Endpoint:    ${INDEXNOW_ENDPOINT}`);
  console.log(`URLs to submit (${urls.length}):`);
  urls.forEach((u) => console.log(`  - ${u}`));
  console.log("--------------------------------------------------");

  const isLive = await verifyKeyFileLive(12, 5000);
  if (!isLive) {
    console.error(
      `[IndexNow] Pre-flight check failed: Verification key file is not live or does not match.\n` +
      `Aborting API submission to avoid HTTP 403 Key Verification Failure.\n` +
      `Please ensure the website deployment has finished and ${KEY_LOCATION} is publicly accessible.`
    );
    process.exit(1);
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "Tawfiq-IndexNow-Client/1.0",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });

    const status = response.status;
    let responseText = "";
    try {
      responseText = await response.text();
    } catch {
      responseText = "";
    }

    console.log(`[IndexNow] API Response Status: HTTP ${status}`);
    if (responseText && responseText.trim()) {
      console.log(`[IndexNow] Response Body: ${responseText.trim()}`);
    }

    switch (status) {
      case 200:
        console.log(`[IndexNow] HTTP 200 OK: URLs successfully submitted to search engines.`);
        break;
      case 202:
        console.log(`[IndexNow] HTTP 202 Accepted: Key valid. URLs received and queued for processing.`);
        break;
      case 400:
        console.error(`[IndexNow] HTTP 400 Bad Request: Invalid format or missing parameters in JSON payload.`);
        process.exit(1);
      case 403:
        console.error(`[IndexNow] HTTP 403 Forbidden: Key verification failure. Key not valid or key file unreachable.`);
        process.exit(1);
      case 422:
        console.error(`[IndexNow] HTTP 422 Unprocessable Entity: URLs do not belong to host or key mismatch.`);
        process.exit(1);
      case 429:
        console.error(`[IndexNow] HTTP 429 Too Many Requests: Rate limit exceeded.`);
        process.exit(1);
      default:
        if (status >= 200 && status < 300) {
          console.log(`[IndexNow] HTTP ${status}: Submission accepted.`);
        } else {
          console.error(`[IndexNow] Unexpected HTTP ${status} error response from IndexNow.`);
          process.exit(1);
        }
    }
    console.log("==================================================");
  } catch (error) {
    console.error(`[IndexNow] Network or execution error: ${error.message}`);
    process.exit(1);
  }
}

// CLI argument support (e.g. node scripts/indexnow.js https://www.tawfiq.in/page)
const customUrls = process.argv.slice(2).filter((arg) => arg.startsWith("http"));
const targetUrls = customUrls.length > 0 ? customUrls : getUrlsFromSitemap();

submitToIndexNow(targetUrls);
