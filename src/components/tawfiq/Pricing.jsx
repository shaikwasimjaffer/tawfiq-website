import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Heart } from "lucide-react";

const includedFeatures = [
  {
    title: "Algorithmic Qaza Recovery",
    description: "Precision estimation of missed Salah with dynamic pace projection and milestones.",
  },
  {
    title: "Daily 5 Salah Habit Tracking",
    description: "Consistency streaks, prayer timestamps, and daily spiritual accountability.",
  },
  {
    title: "Interactive Quran Reader",
    description: "Color-coded Tajweed, audio recitation, Ayah-by-Ayah translations, and verse insights.",
  },
  {
    title: "Tawfiq AI Scholarly Guidance",
    description: "Scholarly answers across Hanafi, Shafi'i, Maliki, and Hanbali without paywalls.",
  },
  {
    title: "Guided Islamic Academy",
    description: "Structured learning on Hadith, Sunnah, Tafsir, Dhikr, and the 99 Names of Allah.",
  },
  {
    title: "Accurate Qibla & Prayer Times",
    description: "GPS-precise local prayer timings and smooth digital Qibla compass anywhere on Earth.",
  },
  {
    title: "100% Ad-Free Worship",
    description: "Zero popups, zero banner advertisements, and zero commercial interruptions during worship.",
  },
  {
    title: "Strict Privacy First",
    description: "No user tracking, no location telemetry retention, and zero selling of spiritual data.",
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="w-full bg-[#F0FDF4] py-20 px-4 sm:px-6 lg:px-8 font-['Geist',sans-serif] relative overflow-hidden"
    >
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(circle_at_center,#16A34A_1px,transparent_1px)] bg-[length:24px_24px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Pricing & Accessibility</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Newsreader',serif] font-light text-4xl sm:text-5xl lg:text-6xl text-green-950 tracking-tight leading-[1.12]"
          >
            Zero subscriptions. <br />
            <span className="italic text-[#16A34A]">Pure devotion.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-green-800 text-base sm:text-lg font-light leading-relaxed"
          >
            Built as a sincere initiative for the Ummah. Every feature, prayer tracker,
            Qaza recovery calculator, and AI answer is completely free for life.
          </motion.p>
        </div>

        {/* Single-Column Pricing Card */}
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative group"
          >
            {/* Outer Radiant Ambient Bloom */}
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-emerald-500/25 via-emerald-400/20 to-teal-400/25 blur-xl pointer-events-none opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Main Card Container */}
            <div className="relative z-10 bg-[#064E3B] text-white rounded-[2rem] sm:rounded-[2.5rem] p-7 sm:p-12 border border-emerald-500/30 shadow-[0_20px_60px_-15px_rgba(6,78,59,0.35)] overflow-hidden">
              {/* Subtle Top Divine Radiance */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-36 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />

              {/* Corner Accents (Tawfiq Signature Aesthetics) */}
              <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-emerald-400/40 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-emerald-400/40 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-emerald-400/40 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-emerald-400/40 rounded-br-sm pointer-events-none" />

              {/* Card Header: Tier Title & Pill Badge */}
              <div className="flex items-center justify-between gap-4 flex-wrap relative z-10">
                <span className="font-['Geist',sans-serif] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase text-emerald-300">
                  LIFETIME ACCESS
                </span>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-semibold tracking-wider uppercase shadow-sm">
                  <span className="text-amber-400">🔥</span>
                  <span>100% FREE FOREVER</span>
                </div>
              </div>

              {/* Pricing Display */}
              <div className="mt-7 relative z-10">
                {/* Strikethrough Comparison */}
                <div className="flex items-center gap-2">
                  <span className="text-emerald-300/45 line-through text-lg sm:text-xl font-light font-['Newsreader',serif]">
                    ₹3,999
                  </span>
                  <span className="text-emerald-300/40 text-[11px] sm:text-xs font-['Geist',sans-serif] tracking-wider uppercase">
                    / Standard Islamic Apps
                  </span>
                </div>

                {/* Primary Price Tag: Rupees Zero */}
                <div className="mt-2 flex items-baseline gap-3 flex-wrap">
                  <span className="font-['Newsreader',serif] font-normal text-6xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-none">
                    ₹0
                  </span>
                  <div className="flex flex-col">
                    <span className="text-emerald-300 text-sm sm:text-base font-medium tracking-wide">
                      Free Forever
                    </span>
                    <span className="text-emerald-400/70 text-xs font-light">
                      + Zero Hidden Fees · Zero Ads
                    </span>
                  </div>
                </div>

                {/* Target Audience / Narrative Description */}
                <p className="mt-4 text-emerald-100/85 text-sm sm:text-base leading-relaxed font-light">
                  For believers seeking lifelong consistency in Salah, effortless Qaza
                  recovery, and authentic Islamic knowledge — without paywalls, subscriptions,
                  or intrusive advertisements.
                </p>
              </div>

              {/* Prominent Call To Action Button */}
              <div className="mt-8 relative z-10">
                <a
                  href="https://originaltawfiq.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 sm:py-5 px-6 rounded-xl sm:rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.99] text-white font-['Geist',sans-serif] font-semibold text-base sm:text-lg tracking-tight transition-all duration-300 shadow-[0_10px_30px_rgba(22,163,74,0.35)] hover:shadow-[0_12px_35px_rgba(22,163,74,0.5)] flex items-center justify-center gap-3 group/btn cursor-pointer"
                >
                  <span>Start Your Journey Free</span>
                  <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                </a>
                <p className="mt-3 text-center text-xs text-emerald-300/60 font-light">
                  Instant browser access · No account required to explore · No credit card
                </p>
              </div>

              {/* Elegant Divider */}
              <div className="my-9 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

              {/* What's Included Section */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-300">
                    WHAT'S INCLUDED:
                  </span>
                  <div className="flex-1 h-px bg-emerald-500/20" />
                </div>

                {/* Features List with Plus (+) Marks */}
                <ul className="space-y-4">
                  {includedFeatures.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 sm:gap-3.5 group/item"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-md bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center text-sm font-bold mt-0.5 group-hover/item:bg-[#16A34A] group-hover/item:text-white transition-colors duration-300">
                        +
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-medium text-white/95">
                          {feature.title}
                        </span>
                        <span className="text-xs sm:text-sm text-emerald-200/70 font-light mt-0.5 leading-relaxed">
                          {feature.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Bottom / Sadaqah Jariyah Pledge */}
              <div className="mt-10 pt-6 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-300/75 relative z-10">
                <div className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/30" />
                  <span>Sadaqah Jariyah for the Ummah</span>
                </div>
                <span className="italic font-['Newsreader',serif] text-sm text-emerald-200/90 text-center sm:text-right">
                  Free today. Free tomorrow. Free forever, Insha'Allah.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
