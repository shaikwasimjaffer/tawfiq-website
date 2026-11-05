import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const featuresList = [
  { text: "Qaza prayer tracking & recovery planning", inSukoon: false },
  { text: "Daily Salah tracking & habit consistency", inSukoon: true },
  { text: "Quran reading & verse audio with Tajweed guidance", inSukoon: false },
  { text: "Tawfiq AI assistant for contextual Islamic learning", inSukoon: false },
  { text: "Guided Islamic Academy (Hadith, Tafsir & 99 Names)", inSukoon: false },
  { text: "Qibla compass & local prayer calculation", inSukoon: true },
  { text: "Ad-free experience with zero commercial interruptions", inSukoon: true },
  { text: "Privacy-focused data handling — no selling of worship records", inSukoon: true },
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
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 px-2">
          <h2 className="font-['Newsreader',serif] font-light text-2xl sm:text-4xl lg:text-5xl text-green-950 tracking-tight leading-tight">
            <span className="inline-block">Different platforms, different prices.</span>{" "}
            <br />
            <span className="italic text-[#16A34A] inline-block">Tawfiq remains free.</span>
          </h2>
        </div>

        {/* Pricing Cards Grid: 2 Cards (Sukoon in White & Black, and Free Forever in Brand Green) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-10 max-w-4xl mx-auto items-stretch">
          {/* 1. SUKOON CARD (White & Black combination, ₹149 / month) */}
          <div className="relative w-full max-w-[440px] mx-auto flex flex-col">
            {/* Floating Decorative Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-900 text-white border border-neutral-700 shadow-sm text-[11px] font-['Geist',sans-serif] font-semibold tracking-[0.15em] uppercase whitespace-nowrap">
                <span className="text-[9px] text-white/70 leading-none" aria-hidden="true">✦</span>
                <span>SUKOON</span>
                <span className="text-[9px] text-white/70 leading-none" aria-hidden="true">✦</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white text-neutral-900 rounded-2xl sm:rounded-[1.75rem] p-7 sm:p-9 pt-9 sm:pt-11 pb-9 sm:pb-11 border border-neutral-200/90 shadow-xl shadow-neutral-950/5 flex flex-col text-left h-full"
            >
              {/* Prominent Price Row: ₹149 / month */}
              <div className="mt-1 mb-2.5">
                <div className="flex items-baseline gap-2">
                  <span className="font-['Geist',sans-serif] font-bold text-5xl sm:text-6xl text-neutral-950 tracking-tight leading-none">
                    ₹149
                  </span>
                  <span className="text-neutral-500 text-sm sm:text-base font-['Geist',sans-serif] font-normal">
                    / month
                  </span>
                </div>
              </div>

              {/* Subtitle / Description */}
              <p className="text-sm sm:text-[14.5px] font-['Geist',sans-serif] text-neutral-600 font-light leading-relaxed mt-1 mb-8">
                Build consistency in Salah, manage Qaza prayers, and deepen your Islamic learning with Tawfiq.
              </p>

              {/* Included Features Header */}
              <h4 className="text-xs font-['Geist',sans-serif] font-medium tracking-wider uppercase text-neutral-400 mb-4 sm:mb-5">
                What’s included
              </h4>

              {/* Feature Checklist */}
              <ul className="space-y-4 sm:space-y-4.5" role="list">
                {featuresList.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-3 sm:gap-3.5 text-sm sm:text-[14.5px] font-['Geist',sans-serif] font-light leading-relaxed ${
                      feature.inSukoon ? "text-neutral-800" : "text-neutral-400"
                    }`}
                  >
                    {feature.inSukoon ? (
                      <Check
                        className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5"
                        strokeWidth={2.2}
                        aria-hidden="true"
                      />
                    ) : (
                      <X
                        className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* 2. FREE FOREVER CARD (Original Brand Green, ₹0 / month) */}
          <div className="relative w-full max-w-[440px] mx-auto flex flex-col">
            {/* Floating Decorative Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#DCFCE7] text-[#064E3B] border border-emerald-300 shadow-sm text-[11px] font-['Geist',sans-serif] font-semibold tracking-[0.15em] uppercase whitespace-nowrap">
                <span className="text-[9px] text-[#064E3B]/80 leading-none" aria-hidden="true">✦</span>
                <span>TAWFIQ</span>
                <span className="text-[9px] text-[#064E3B]/80 leading-none" aria-hidden="true">✦</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-[#064E3B] text-white rounded-2xl sm:rounded-[1.75rem] p-7 sm:p-9 pt-9 sm:pt-11 pb-9 sm:pb-11 border border-emerald-400/20 shadow-lg shadow-green-950/10 flex flex-col text-left h-full"
            >
              {/* Prominent Price Row: ₹0 / month */}
              <div className="mt-1 mb-2.5">
                <div className="flex items-baseline gap-2">
                  <span className="font-['Geist',sans-serif] font-bold text-5xl sm:text-6xl text-white tracking-tight leading-none">
                    ₹0
                  </span>
                  <span className="text-emerald-200/80 text-sm sm:text-base font-['Geist',sans-serif] font-normal">
                    / month
                  </span>
                </div>
              </div>

              {/* Subtitle / Description */}
              <p className="text-sm sm:text-[14.5px] font-['Geist',sans-serif] text-emerald-100/85 font-light leading-relaxed mt-1 mb-8">
                Build consistency in Salah, manage Qaza prayers, and deepen your Islamic learning with Tawfiq.
              </p>

              {/* Included Features Header */}
              <h4 className="text-xs font-['Geist',sans-serif] font-medium tracking-wider uppercase text-emerald-300 mb-4 sm:mb-5">
                What’s included
              </h4>

              {/* Feature Checklist */}
              <ul className="space-y-4 sm:space-y-4.5" role="list">
                {featuresList.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 sm:gap-3.5 text-sm sm:text-[14.5px] text-white/90 font-['Geist',sans-serif] font-light leading-relaxed"
                  >
                    <Check
                      className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span>{feature.text}</span>
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
