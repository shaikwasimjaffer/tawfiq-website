import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

export default function About() {
  return (
    <SEO
      title="About Tawfiq - Islamic Prayer Tracker App"
      description="Learn about Tawfiq, the #1 Islamic prayer tracker app founded by Shaik Wasim Jaffer. Discover our story, mission, and how we help Muslims worldwide stay consistent in worship."
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
            user feedback and Islamic principles.
          </p>

          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            What We Offer
          </h2>
          <p>
            From prayer tracking and Qaza management to Quran reading progress
            and dhikr counters, Tawfiq provides tools that make it easier to
            focus on what matters most—your connection with Allah. Our AI
            Companion offers guidance rooted in established scholarship, while
            our breathing verses section promotes mindfulness and tranquility.
          </p>

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