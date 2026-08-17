import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

export default function Mission() {
  return (
    <SEO
      title="Tawfiq Mission - Islamic Prayer Tracker Purpose"
      description="Discover the mission of Tawfiq: to facilitate a deeper connection with Allah through innovative Islamic technology founded by Shaik Wasim Jaffer."
    >
    <motion.div
      initial={{ x: "100%", boxShadow: "-30px 0 50px rgba(28, 25, 23, 0.15)" }}
      animate={{ x: 0, boxShadow: "0px 0 0px rgba(28, 25, 23, 0)" }}
      exit={{ x: "-30%", opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      // THE FIX: Changed to a fixed overlay (fixed top-0 left-0 w-full h-[100dvh]).
      // This forces the component to be exactly the size of the screen and scroll internally.
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
          Our Mission
        </h1>

        <div className="space-y-5 md:space-y-6 font-sans text-stone-600 leading-relaxed text-[15px] md:text-base">
          <p>
            At Tawfiq, our mission is to facilitate a deeper connection with
            faith through thoughtful technology. We believe that spiritual
            growth should be accessible, personalized, and harmoniously
            integrated into daily life.
          </p>

          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            Our Core Values
          </h2>
          <p>
            We are guided by principles of mindfulness, consistency, and
            compassionate self-reflection. Every feature we develop aims to
            remove barriers to worship while honoring the sincerity of the
            spiritual journey.
          </p>

          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            Spiritual Wellbeing in the Digital Age
          </h2>
          <p>
            We recognize the unique challenges of maintaining spiritual
            practices in a fast-paced, distraction-filled world. Tawfiq provides
            tools that are designed to enhance, not replace, the intrinsic
            beauty of personal worship and reflection.
          </p>

          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            Privacy and Trust
          </h2>
          <p>
            Your spiritual data is deeply personal. We employ robust privacy
            measures to ensure that your prayer records, Quran progress, and
            personal reflections remain confidential and secure. We never sell
            or monetize your spiritual information.
          </p>

          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            Continuous Improvement
          </h2>
          <p>
            We listen closely to our community's feedback and evolve our
            platform to better serve diverse spiritual needs. Tawfiq is committed
            to being a compassionate companion on your lifelong journey of
            faith and self-discovery.
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