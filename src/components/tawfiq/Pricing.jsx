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
      className="w-full bg-[#F0FDF4] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-['Geist',sans-serif]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 px-2">
          <h2 className="font-['Newsreader',serif] font-light text-2xl sm:text-4xl lg:text-5xl text-green-950 tracking-tight leading-tight">
            <span className="inline-block">Different platforms, different prices.</span>{" "}
            <br />
            <span className="italic text-[#16A34A] inline-block">Tawfiq remains free.</span>
          </h2>
        </div>

        {/* Pricing Card: Ordered according to the reference data format */}
        <div className="w-full max-w-[460px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#064E3B] text-white rounded-[2rem] p-7 sm:p-10 border border-emerald-400/25 shadow-xl shadow-green-950/10 flex flex-col text-left"
          >
            {/* 1. Tier Name: Styled with Tawfiq's signature Newsreader serif */}
            <h3 className="font-['Newsreader',serif] font-light text-3xl sm:text-4xl text-white tracking-tight">
              Free Forever
            </h3>

            {/* 2. Subtitle / Description directly below Tier Name */}
            <p className="text-sm font-['Geist',sans-serif] text-emerald-100/90 leading-relaxed font-light mt-2 mb-6">
              Build consistency in Salah, manage Qaza prayers, and deepen your Islamic learning with Tawfiq.
            </p>

            {/* 3. Price Display formatted with inline unit */}
            <div className="mb-2">
              <div className="flex items-baseline gap-2">
                <span className="font-['Newsreader',serif] font-light text-5xl sm:text-6xl text-white tracking-tight leading-none">
                  ₹0
                </span>
                <span className="text-emerald-200/80 text-sm font-['Geist',sans-serif] font-normal">
                  / forever
                </span>
              </div>
              <p className="mt-1.5 text-xs text-emerald-300/80 font-['Geist',sans-serif] font-light">
                No subscription. No payment required.
              </p>
            </div>

            {/* 4. Primary CTA Button placed directly under price */}
            <div className="mt-5 mb-8">
              <a
                href="https://originaltawfiq.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Started with Tawfiq - Opens web application in a new tab"
                className="group font-['Geist',sans-serif] inline-flex items-center justify-center gap-2.5 w-full bg-white hover:bg-[#F0FDF4] text-green-950 px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer active:scale-[0.99] outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <span>Get Started with Tawfiq</span>
                <span
                  aria-hidden="true"
                  className="transform group-hover:translate-x-1 transition-transform duration-300 text-sm leading-none"
                >
                  →
                </span>
              </a>
            </div>

            {/* 5. Included Features Header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-emerald-400 text-xs select-none" aria-hidden="true">✦</span>
              <h4 className="text-xs font-['Geist',sans-serif] font-semibold tracking-[0.2em] uppercase text-emerald-300">
                What's included:
              </h4>
            </div>

            {/* 6. Feature Checklist */}
            <ul className="space-y-3.5" role="list">
              {includedFeatures.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-white/95 font-['Geist',sans-serif] font-light leading-snug"
                >
                  <Check
                    className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
