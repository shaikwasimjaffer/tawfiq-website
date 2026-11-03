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
    canonical: "https://www.tawfiq.in/about",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "@id": "https://www.tawfiq.in/about#webpage",
          "url": "https://www.tawfiq.in/about",
          "name": "About Tawfiq - Islamic Prayer Tracker App",
          "description": "Learn about Tawfiq, the #1 Islamic prayer tracker app founded by Shaik Wasim Jaffer. Discover our story, mission, and how we help Muslims worldwide stay consistent in worship.",
          "isPartOf": {
            "@id": "https://www.tawfiq.in/#website"
          },
          "about": {
            "@id": "https://www.tawfiq.in/#organization"
          },
          "breadcrumb": {
            "@id": "https://www.tawfiq.in/about#breadcrumb"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.tawfiq.in/about#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.tawfiq.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "About",
              "item": "https://www.tawfiq.in/about"
            }
          ]
        }
      ]
    }
  },
  {
    path: "mission",
    title: "Tawfiq Mission - Islamic Prayer Tracker Purpose",
    description:
      "Discover the mission of Tawfiq: to facilitate a deeper connection with Allah through innovative Islamic technology founded by Shaik Wasim Jaffer.",
    canonical: "https://www.tawfiq.in/mission",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.tawfiq.in/mission#webpage",
          "url": "https://www.tawfiq.in/mission",
          "name": "Tawfiq Mission - Islamic Prayer Tracker Purpose",
          "description": "Discover the mission of Tawfiq: to facilitate a deeper connection with Allah through innovative Islamic technology founded by Shaik Wasim Jaffer.",
          "isPartOf": {
            "@id": "https://www.tawfiq.in/#website"
          },
          "breadcrumb": {
            "@id": "https://www.tawfiq.in/mission#breadcrumb"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.tawfiq.in/mission#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.tawfiq.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Our Mission",
              "item": "https://www.tawfiq.in/mission"
            }
          ]
        }
      ]
    }
  },
  {
    path: "privacy",
    title: "Tawfiq Privacy Policy - Islamic Prayer Tracker",
    description:
      "Read Tawfiq's privacy policy detailing how we protect your spiritual data, prayer records, and personal information. Founded by Shaik Wasim Jaffer.",
    canonical: "https://www.tawfiq.in/privacy",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.tawfiq.in/privacy#webpage",
          "url": "https://www.tawfiq.in/privacy",
          "name": "Tawfiq Privacy Policy - Islamic Prayer Tracker",
          "description": "Read Tawfiq's privacy policy detailing how we protect your spiritual data, prayer records, and personal information. Founded by Shaik Wasim Jaffer.",
          "isPartOf": {
            "@id": "https://www.tawfiq.in/#website"
          },
          "breadcrumb": {
            "@id": "https://www.tawfiq.in/privacy#breadcrumb"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.tawfiq.in/privacy#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.tawfiq.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Privacy Policy",
              "item": "https://www.tawfiq.in/privacy"
            }
          ]
        }
      ]
    }
  },
  {
    path: "terms",
    title: "Tawfiq Terms of Service - Islamic Prayer Tracker",
    description:
      "Read the terms of service for Tawfiq, the Islamic prayer companion application.",
    canonical: "https://www.tawfiq.in/terms",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.tawfiq.in/terms#webpage",
          "url": "https://www.tawfiq.in/terms",
          "name": "Tawfiq Terms of Service - Islamic Prayer Tracker",
          "description": "Read the terms of service for Tawfiq, the Islamic prayer companion application.",
          "isPartOf": {
            "@id": "https://www.tawfiq.in/#website"
          },
          "breadcrumb": {
            "@id": "https://www.tawfiq.in/terms#breadcrumb"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.tawfiq.in/terms#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.tawfiq.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Terms of Service",
              "item": "https://www.tawfiq.in/terms"
            }
          ]
        }
      ]
    }
  },
];

const redirects = [
  {
    path: "download",
    title: "Download Tawfiq - Islamic Prayer Tracker",
    destination: "https://www.tawfiq.in/",
  },
  {
    path: "quran",
    title: "Tawfiq Qur'an - Interactive Reader & Audio",
    destination: "https://www.tawfiq.in/#quran",
  },
  {
    path: "tafsir",
    title: "Tawfiq Tafsir - In-Depth Verse Explanations",
    destination: "https://www.tawfiq.in/#quran",
  },
  {
    path: "prayer-tracker",
    title: "Tawfiq Prayer Tracker & Qaza Manager",
    destination: "https://www.tawfiq.in/#qaza",
  },
];

function generateStaticRoutes() {
  const indexPath = path.join(distDir, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("❌ dist/index.html not found! Run build first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, "utf-8");

  // 1. Generate 404.html fallback for GitHub Pages SPA routing (with noindex)
  const notFoundPath = path.join(distDir, "404.html");
  let notFoundHtml = baseHtml.replace(
    /<meta\s+name=["']robots["']\s+content=["'].*?["']\s*\/?>/s,
    '<meta name="robots" content="noindex, follow" />'
  );
  notFoundHtml = notFoundHtml.replace(
    /<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/s,
    ""
  );
  // Remove structured data from 404 page
  notFoundHtml = notFoundHtml.replace(
    /<script\s+type=["']application\/ld\+json["']\s*>[\s\S]*?<\/script>/gi,
    ""
  );
  fs.writeFileSync(notFoundPath, notFoundHtml);
  console.log("✅ Generated dist/404.html (SPA Fallback with noindex)");

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

    // Replace JSON-LD structured data with route-specific schema
    if (page.structuredData) {
      customHtml = customHtml.replace(
        /<script\s+type=["']application\/ld\+json["']>.*?<\/script>/s,
        `<script type="application/ld+json">\n${JSON.stringify(page.structuredData, null, 2)}\n    </script>`
      );
    }

    // Write directory index: dist/{path}/index.html
    const pageDir = path.join(distDir, page.path);
    fs.mkdirSync(pageDir, { recursive: true });
    fs.writeFileSync(path.join(pageDir, "index.html"), customHtml);

    // Also write dist/{path}.html for clean URL servers
    fs.writeFileSync(path.join(distDir, `${page.path}.html`), customHtml);

    console.log(`✅ Generated static entry for: /${page.path}`);
  }

  // 3. Generate static redirect pages for legacy/moved routes
  for (const redir of redirects) {
    const redirectHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=${redir.destination}" />
    <link rel="canonical" href="${redir.destination}" />
    <title>${redir.title}</title>
    <script>
      window.location.replace("${redir.destination}");
    </script>
  </head>
  <body>
    <p>Redirecting to <a href="${redir.destination}">${redir.destination}</a>...</p>
  </body>
</html>
`;
    const redirDir = path.join(distDir, redir.path);
    fs.mkdirSync(redirDir, { recursive: true });
    fs.writeFileSync(path.join(redirDir, "index.html"), redirectHtml);
    fs.writeFileSync(path.join(distDir, `${redir.path}.html`), redirectHtml);

    console.log(`✅ Generated static redirect for: /${redir.path} -> ${redir.destination}`);
  }

  // 4. Ensure CNAME exists in dist with www.tawfiq.in
  const cnameDist = path.join(distDir, "CNAME");
  fs.writeFileSync(cnameDist, "www.tawfiq.in\n");
  console.log("✅ Set dist/CNAME (www.tawfiq.in)");

  // 5. Verify robots.txt and sitemap.xml in dist
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

  // 6. Verify IndexNow key verification file in dist
  const indexNowKey = "b9662631ad3040458bcd277a108621e7";
  const indexNowKeyFile = `${indexNowKey}.txt`;
  const distKeyPath = path.join(distDir, indexNowKeyFile);
  const publicKeyPath = path.resolve(__dirname, "../public", indexNowKeyFile);

  if (!fs.existsSync(distKeyPath) && fs.existsSync(publicKeyPath)) {
    fs.copyFileSync(publicKeyPath, distKeyPath);
  } else if (!fs.existsSync(distKeyPath)) {
    fs.writeFileSync(distKeyPath, indexNowKey);
  }

  if (fs.existsSync(distKeyPath)) {
    console.log(`✅ Verified dist/${indexNowKeyFile}`);
  } else {
    console.warn(`⚠️ Warning: dist/${indexNowKeyFile} missing!`);
  }
}

generateStaticRoutes();
