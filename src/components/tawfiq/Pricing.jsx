import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const includedFeatures = [
  "Qaza prayer tracking & recovery planning",
  "Daily Salah tracking & habit consistency",
  "Quran reading & verse audio with Tajweed guidance",
  "Tawfiq AI assistant for contextual Islamic learning",
  "Guided Islamic Academy (Hadith, Tafsir & 99 Names)",
  "Qibla compass & local prayer calculation",
  "Ad-free experience with zero commercial interruptions",
  "Privacy-focused data handling — no selling of worship records",
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-label="Pricing and Plan"
      className="w-full bg-[#F0FDF4] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-['Geist',sans-serif] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header: Minimal editorial headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 px-2">
          <h2 className="font-['Newsreader',serif] font-light text-2xl sm:text-4xl lg:text-5xl text-green-950 tracking-tight leading-tight">
            <span className="inline-block">Different platforms, different prices.</span>{" "}
            <br />
            <span className="italic text-[#16A34A] inline-block">Tawfiq remains free.</span>
          </h2>
        </div>

        {/* Pricing Card Container: Prepared for two/three cards, positioned to the right on desktop */}
        <div className="flex justify-center md:justify-end max-w-4xl mx-auto px-4">
          <div className="relative w-full max-w-[440px]">
          {/* 1. Floating Decorative Badge (Centered, 50% above card, 50% inside, single clean outline) */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#DCFCE7] text-[#064E3B] border border-emerald-300 shadow-sm text-[11px] font-['Geist',sans-serif] font-semibold tracking-[0.15em] uppercase whitespace-nowrap">
              <span className="text-[9px] text-[#064E3B]/80 leading-none" aria-hidden="true">✦</span>
              <span>FREE FOREVER</span>
              <span className="text-[9px] text-[#064E3B]/80 leading-none" aria-hidden="true">✦</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#064E3B] text-white rounded-2xl sm:rounded-[1.75rem] p-6 sm:p-8 pt-8 sm:pt-9 border border-emerald-400/20 shadow-lg shadow-green-950/10 flex flex-col text-left"
          >
            {/* 2. Prominent Price Row: ₹0 / month using Tawfiq's website font */}
            <div className="mt-1 mb-2">
              <div className="flex items-baseline gap-2">
                <span className="font-['Geist',sans-serif] font-bold text-5xl sm:text-6xl text-white tracking-tight leading-none">
                  ₹0
                </span>
                <span className="text-emerald-200/80 text-sm sm:text-base font-['Geist',sans-serif] font-normal">
                  / month
                </span>
              </div>
            </div>

            {/* 3. Description: Clean natural wrap across 2 lines, preventing any horizontal overflow */}
            <p className="text-sm font-['Geist',sans-serif] text-emerald-100/85 font-light leading-relaxed mt-1 mb-6">
              Build consistency in Salah, manage Qaza prayers, and deepen your Islamic learning with Tawfiq.
            </p>

            {/* 4. Primary CTA Button: Styled with gradient, highlight border, rounded-xl and elevated shadow */}
            <div className="mb-6">
              <a
                href="https://originaltawfiq.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Started with Tawfiq - Opens web application in a new tab"
                className="group font-['Geist',sans-serif] inline-flex items-center justify-center gap-2 w-full p-4 rounded-xl bg-gradient-to-t from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white text-base font-medium shadow-lg shadow-emerald-950/30 border border-emerald-400/40 transition-all duration-300 cursor-pointer active:scale-[0.99] outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <span>Get Started</span>
                <span
                  aria-hidden="true"
                  className="transform group-hover:translate-x-1 transition-transform duration-300 text-base leading-none"
                >
                  →
                </span>
              </a>
            </div>

            {/* 5. Included Features Header: Minimal, understated */}
            <h4 className="text-xs font-['Geist',sans-serif] font-medium tracking-wide text-emerald-300 mb-3.5">
              What’s included
            </h4>

            {/* 6. Feature Checklist */}
            <ul className="space-y-3" role="list">
              {includedFeatures.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-white/90 font-['Geist',sans-serif] font-light leading-snug"
                >
                  <Check
                    className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
}
