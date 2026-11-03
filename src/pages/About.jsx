import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const structuredData = {
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
      "@type": "Organization",
      "@id": "https://www.tawfiq.in/#organization",
      "name": "Tawfiq",
      "url": "https://www.tawfiq.in/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.tawfiq.in/#logo",
        "url": "https://www.tawfiq.in/tawfiq.png",
        "caption": "Tawfiq Islamic Prayer Companion"
      },
      "founder": {
        "@id": "https://www.tawfiq.in/#founder"
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.tawfiq.in/#founder",
      "name": "Shaik Wasim Jaffer",
      "jobTitle": "Founder of Tawfiq",
      "worksFor": {
        "@id": "https://www.tawfiq.in/#organization"
      },
      "sameAs": [
        "https://www.linkedin.com/in/shaik-wasim-jaffer-b8157140a/",
        "https://github.com/shaikwasimjaffer"
      ]
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
};

export default function About() {
  return (
    <SEO
      title="About Tawfiq - Islamic Prayer Tracker App"
      description="Learn about Tawfiq, the #1 Islamic prayer tracker app founded by Shaik Wasim Jaffer. Discover our story, mission, and how we help Muslims worldwide stay consistent in worship."
      canonical="https://www.tawfiq.in/about"
      structuredData={structuredData}
    >
    {/* THE FIX: Changed to a fixed overlay (fixed top-0 left-0 w-full h-[100dvh]).
        This forces the component to be exactly the size of the screen and scroll internally. */}
    <motion.div
      initial={{ x: "100%", boxShadow: "-30px 0 50px rgba(28, 25, 23, 0.15)" }}
      animate={{ x: 0, boxShadow: "0px 0 0px rgba(28, 25, 23, 0)" }}
      exit={{ x: "-30%", opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
          About Tawfiq
        </h1>

        <div className="space-y-5 md:space-y-6 font-sans text-stone-600 leading-relaxed text-[15px] md:text-base">
          <p>
            Tawfiq is a thoughtful companion designed to support your spiritual
            journey through intuitive technology. Born from a desire to blend
            timeless faith practices with modern convenience, our platform helps
            Muslims around the world stay consistent in their worship and
            reflection.
          </p>

          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            Our Story
          </h2>
          <p>
            Founded by a team of believers who understood the challenges of
            maintaining spiritual discipline in today's fast-paced world, Tawfiq
            began as a simple prayer tracker and has grown into a comprehensive
            worship companion. Every feature is crafted with care, informed by
            user feedback and Islamic principles. Learn more about our
            overarching purpose in{" "}
            <Link
              to="/mission"
              className="text-stone-900 underline underline-offset-2 hover:text-[#16A34A] transition-colors"
            >
              Our Mission
            </Link>
            .
          </p>

          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            What We Offer
          </h2>
          <p>
            From{" "}
            <Link
              to="/#qaza"
              className="text-stone-900 underline underline-offset-2 hover:text-[#16A34A] transition-colors"
            >
              prayer tracking and Qaza management
            </Link>{" "}
            to{" "}
            <Link
              to="/#quran"
              className="text-stone-900 underline underline-offset-2 hover:text-[#16A34A] transition-colors"
            >
              Quran reading progress
            </Link>{" "}
            and dhikr counters, Tawfiq provides tools that make it easier to
            focus on what matters most—your connection with Allah. Our AI
            Companion offers guidance rooted in established scholarship, while
            our breathing verses section promotes mindfulness and tranquility.
          </p>

          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            The Story Behind Tawfiq
          </h2>
          <p>
            Tawfiq was created by Shaik Wasim Jaffer with a simple intention: to
            make useful Islamic tools accessible to people for free. For many
            Muslims, managing daily worship often meant navigating fragmented
            apps—one for prayer times, another for finding the Qibla, a
            spreadsheet or notebook for missed prayers, and separate tools for
            reading the Quran. Shaik Wasim wanted to build a single, calm space
            where believers could care for their religious routines without
            friction, commercial interruptions, or subscription fees.
          </p>
          <p>
            The platform brings together essential daily utilities in one
            cohesive experience: an algorithmic{" "}
            <Link
              to="/#qaza"
              className="text-stone-900 underline underline-offset-2 hover:text-[#16A34A] transition-colors"
            >
              Qaza Prayer Calculator
            </Link>{" "}
            to help people calculate and gently clear their missed prayer debt
            without guilt, a Salah Tracker to build steady daily consistency, a
            reliable Qibla Finder, and direct access to{" "}
            <Link
              to="/#quran"
              className="text-stone-900 underline underline-offset-2 hover:text-[#16A34A] transition-colors"
            >
              The Quran
            </Link>{" "}
            as part of their everyday spiritual routine.
          </p>
          <p>
            Among these tools,{" "}
            <Link
              to="/#tawfiq-ai"
              className="text-stone-900 underline underline-offset-2 hover:text-[#16A34A] transition-colors font-medium"
            >
              Tawfiq AI
            </Link>{" "}
            holds a particularly meaningful place. Rather than functioning as a
            generic chatbot, its purpose is to make Islamic learning more
            accessible and approachable. It allows anyone—whether a lifelong
            practicing Muslim seeking scholarly context across different
            Madhhabs or someone returning to prayer after years away—to explore
            Islamic knowledge, ask sincere questions, and find authentic
            answers without having to pay for access to the feature.
          </p>
          <blockquote className="border-l-2 border-[#16A34A] pl-4 py-1 italic font-serif text-stone-700 text-[15px] md:text-base my-2">
            &ldquo;I wanted to build something that people could use for free,
            something that brings essential Islamic tools together and makes it
            easier for them to stay connected with their faith.&rdquo;
            <span className="block not-italic font-sans text-xs text-stone-500 mt-1.5">
              — Shaik Wasim Jaffer, Founder of Tawfiq
            </span>
          </blockquote>

          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            Commitment to Excellence
          </h2>
          <p>
            We continuously refine our app to ensure it meets the highest
            standards of usability, privacy, and spiritual integrity. Your trust
            is paramount, and we strive to honor it through transparent
            practices and relentless improvement.
          </p>

          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            Join Our Community
          </h2>
          <p>
            Tawfiq is more than an app—it's a growing community of individuals
            seeking barakah in their daily lives. We welcome you to share your
            experiences, provide feedback, and journey alongside fellow
            believers striving for tawfiq—divine success and facilitation.
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