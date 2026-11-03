import React, { useEffect } from "react";

const SEO = ({
  title,
  description,
  canonical,
  keywords = [],
  structuredData = null,
  children
}) => {
  useEffect(() => {
    // Set title
    document.title = title || "Tawfiq - Islamic Prayer Tracker";

    // Set meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", description || "Tawfiq is the #1 Islamic prayer tracker app.");
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description || "Tawfiq is the #1 Islamic prayer tracker app.";
      document.head.appendChild(meta);
    }

    // Set canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute("href", canonical);
      } else {
        const link = document.createElement("link");
        link.rel = "canonical";
        link.href = canonical;
        document.head.appendChild(link);
      }
    }

    // Set meta keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute("content", keywords.join(", "));
    } else if (keywords.length > 0) {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content = keywords.join(", ");
      document.head.appendChild(meta);
    }

    // Add JSON-LD structured data if provided
    if (structuredData) {
      const existing = document.getElementById("seo-jsonld");
      if (existing) {
        existing.remove();
      }

      const script = document.createElement("script");
      script.id = "seo-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, keywords, structuredData]);

  return children ? <>{children}</> : null;
};

export default SEO;
