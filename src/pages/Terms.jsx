import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const structuredData = {
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
};

export default function Terms() {
  return (
    <SEO
      title="Tawfiq Terms of Service - Islamic Prayer Tracker"
      description="Read the terms of service for Tawfiq, the Islamic prayer companion application."
      canonical="https://www.tawfiq.in/terms"
      structuredData={structuredData}
    >
      <motion.div
        initial={{ x: "100%", boxShadow: "-30px 0 50px rgba(28, 25, 23, 0.15)" }}
        animate={{ x: 0, boxShadow: "0px 0 0px rgba(28, 25, 23, 0)" }}
        exit={{ x: "-30%", opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        // Fixed overlay exactly like the Privacy page to prevent mobile scrolling bugs
        className="fixed top-0 left-0 w-full h-[100dvh] overflow-y-auto bg-[#F9F8F6] z-[100]"
      >
        <div className="max-w-2xl mx-auto px-6 pt-12 pb-24 md:py-24 lg:px-12 min-h-full">
          <Link
            to="/"
            className="font-serif text-xl text-stone-900 tracking-tight mb-8 md:mb-12 inline-block transition-opacity hover:opacity-70"
          >
            Tawfiq
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6 md:mb-8">
            Terms of Service
          </h1>

          <div className="space-y-5 md:space-y-6 font-sans text-stone-600 leading-relaxed text-[15px] md:text-base">
            <p>
              Tawfiq is a spiritual companion application designed to support
              Muslims in maintaining prayer consistency and spiritual growth. By
              using Tawfiq, you agree to the following terms.
            </p>

            <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
              Spiritual Guidance
            </h2>
            <p>
              The AI Companion provides responses grounded in established Islamic
              scholarship, but it is not a substitute for qualified religious
              scholars. For definitive rulings on matters of fiqh, please consult
              a trusted local scholar.
            </p>

            <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
              User Accounts & Data
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials. Tawfiq does not sell your personal data or
              prayer history to third parties.
            </p>

            <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
              Service Availability
            </h2>
            <p>
              We strive to keep Tawfiq accessible at all times, but we do not
              guarantee uninterrupted service. We may update features or perform
              maintenance periodically.
            </p>

            <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
              Changes to Terms
            </h2>
            <p>
              We may revise these terms as Tawfiq evolves. Continued use of the
              service constitutes acceptance of the updated terms.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex mt-12 md:mt-16 text-[13px] md:text-sm font-sans tracking-wide text-stone-500 hover:text-stone-900 transition-colors"
          >
            &larr; Return to Tawfiq
          </Link>
        </div>
      </motion.div>
    </SEO>
  );
}
