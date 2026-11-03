import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");

const pages = [
  {
    path: "about",
    title: "About Tawfiq - Islamic Prayer Tracker App",
    description:
      "Learn about Tawfiq, the #1 Islamic prayer tracker app founded by Shaik Wasim Jaffer. Discover our story, mission, and how we help Muslims worldwide stay consistent in worship.",
    canonical: "https://tawfiq.in/about",
  },
  {
    path: "mission",
    title: "Tawfiq Mission - Islamic Prayer Tracker Purpose",
    description:
      "Discover the mission of Tawfiq: to facilitate a deeper connection with Allah through innovative Islamic technology founded by Shaik Wasim Jaffer.",
    canonical: "https://tawfiq.in/mission",
  },
  {
    path: "privacy",
    title: "Tawfiq Privacy Policy - Islamic Prayer Tracker",
    description:
      "Read Tawfiq's privacy policy detailing how we protect your spiritual data, prayer records, and personal information. Founded by Shaik Wasim Jaffer.",
    canonical: "https://tawfiq.in/privacy",
  },
  {
    path: "terms",
    title: "Tawfiq Terms of Service - Islamic Prayer Tracker",
    description:
      "Read the terms of service for Tawfiq, the Islamic prayer companion application.",
    canonical: "https://tawfiq.in/terms",
  },
];

function generateStaticRoutes() {
  const indexPath = path.join(distDir, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("❌ dist/index.html not found! Run build first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, "utf-8");

  // 1. Generate 404.html fallback for GitHub Pages
  const notFoundPath = path.join(distDir, "404.html");
  fs.writeFileSync(notFoundPath, baseHtml);
  console.log("✅ Generated dist/404.html (SPA Fallback)");

  // 2. Generate static HTML files for canonical routes
  for (const page of pages) {
    let customHtml = baseHtml;

    // Replace title
    customHtml = customHtml.replace(
      /<title>.*?<\/title>/s,
      `<title>${page.title}</title>`
    );

    // Replace meta description
    customHtml = customHtml.replace(
      /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/s,
      `<meta name="description" content="${page.description}" />`
    );

    // Replace canonical link
    customHtml = customHtml.replace(
      /<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/s,
      `<link rel="canonical" href="${page.canonical}" />`
    );

    // Replace Open Graph metadata
    customHtml = customHtml.replace(
      /<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/s,
      `<meta property="og:title" content="${page.title}" />`
    );
    customHtml = customHtml.replace(
      /<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/s,
      `<meta property="og:description" content="${page.description}" />`
    );
    customHtml = customHtml.replace(
      /<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/s,
      `<meta property="og:url" content="${page.canonical}" />`
    );

    // Replace Twitter metadata
    customHtml = customHtml.replace(
      /<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/s,
      `<meta name="twitter:title" content="${page.title}" />`
    );
    customHtml = customHtml.replace(
      /<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/s,
      `<meta name="twitter:description" content="${page.description}" />`
    );

    // Write directory index: dist/{path}/index.html
    const pageDir = path.join(distDir, page.path);
    fs.mkdirSync(pageDir, { recursive: true });
    fs.writeFileSync(path.join(pageDir, "index.html"), customHtml);

    // Also write dist/{path}.html for clean URL servers
    fs.writeFileSync(path.join(distDir, `${page.path}.html`), customHtml);

    console.log(`✅ Generated static entry for: /${page.path}`);
  }

  // 3. Ensure CNAME exists in dist
  const cnameDist = path.join(distDir, "CNAME");
  if (!fs.existsSync(cnameDist)) {
    fs.writeFileSync(cnameDist, "tawfiq.in\n");
    console.log("✅ Added dist/CNAME (tawfiq.in)");
  }

  // 4. Verify robots.txt and sitemap.xml in dist
  if (fs.existsSync(path.join(distDir, "robots.txt"))) {
    console.log("✅ Verified dist/robots.txt");
  } else {
    console.warn("⚠️ Warning: dist/robots.txt missing!");
  }

  if (fs.existsSync(path.join(distDir, "sitemap.xml"))) {
    console.log("✅ Verified dist/sitemap.xml");
  } else {
    console.warn("⚠️ Warning: dist/sitemap.xml missing!");
  }
}

generateStaticRoutes();
