import React, { useEffect } from "react";

const SEO = ({
  title,
  description,
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

    // Set meta keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute("content", keywords.join(", "));
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content = keywords.join(", ");
      document.head.appendChild(meta);
    }

    // Add JSON-LD structured data if provided
    if (structuredData) {
      // Remove any existing JSON-LD from this component to avoid duplicates
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

    // Cleanup on unmount
    return () => {
      // We could restore original tags, but for simplicity we leave them.
      // In a more complex app, we'd store originals and restore.
    };
  }, [title, description, keywords, structuredData]);

  // Render children so the page content is displayed
  return children ? (
    <>
      {children}
    </>
  ) : null;
};

export default SEO;