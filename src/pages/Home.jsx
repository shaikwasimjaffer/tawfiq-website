import React, { useState } from "react";
import Navbar from "@/components/tawfiq/Navbar";
import Hero from "@/components/tawfiq/Hero";
import Qaza from "@/components/tawfiq/Qaza";
import Quran from "@/components/tawfiq/Quran";
import Academy from "@/components/tawfiq/Academy";

// 1. Updated the import to match your file name exactly
import TawfiqAI from "@/components/tawfiq/TawfiqAI";

import SurahTaha from "@/components/tawfiq/SurahTaha";
import Footer from "@/components/tawfiq/Footer";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

// EmailJS Configuration Keys
const EMAILJS_SERVICE_ID = "service_8msblsf";
const EMAILJS_TEMPLATE_ID = "template_9gd6lm2";
const EMAILJS_PUBLIC_KEY = "5iuNuXg40cmMgueNJ";

const categoryConfig = {
  Bug: {
    label: "Bug",
    placeholder:
      "Describe the bug you encountered, steps to reproduce, or unexpected behavior...",
  },
  "Feature Request": {
    label: "Feature Request",
    placeholder: "Share your idea or feature suggestion to improve Tawfiq...",
  },
  "General Question": {
    label: "General Question",
    placeholder: "Ask us anything about Tawfiq or how things work...",
  },
  Feedback: {
    label: "Feedback",
    placeholder:
      "Tell us what you love or how we can refine your experience...",
  },
  Partnership: {
    label: "Partnership",
    placeholder:
      "Tell us about your organization, collaboration ideas, or proposal...",
  },
};

const categories = Object.keys(categoryConfig);

export default function Home() {
  // Contact Form State
  const [showContact, setShowContact] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Question",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle");
  const [shaking, setShaking] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setShaking(true);
      setFormStatus("error");
      setTimeout(() => {
        setShaking(false);
        setFormStatus("idle");
      }, 1000);
      return;
    }

    setFormStatus("loading");

    try {
      const templateParams = {
        to_email: "tawfiq.base44@gmail.com",
        from_name: formData.name,
        reply_to: formData.email,
        category: formData.category,
        message: formData.message,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      setFormStatus("success");
      setTimeout(() => {
        setFormStatus("idle");
        setFormData({
          name: "",
          email: "",
          category: "General Question",
          message: "",
        });
        setShowContact(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setFormStatus("error");
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setFormStatus("idle");
      }, 1500);
    }
  };

  return (
    <motion.main
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      className="bg-[#F7F5F1]"
    >
      <Navbar
        showContact={showContact}
        setShowContact={setShowContact}
        formData={formData}
        setFormData={setFormData}
        formStatus={formStatus}
        setFormStatus={setFormStatus}
        shaking={shaking}
        setShaking={setShaking}
        handleContactSubmit={handleContactSubmit}
      />
      <Hero />
      <Qaza />
      <Quran />
      <Academy />

      {/* 2. Place the component here */}
      <TawfiqAI />

      <SurahTaha />
      <Footer
        showContact={showContact}
        setShowContact={setShowContact}
      />

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 z-[110] bg-[#F0FDF4] overflow-y-auto overflow-x-hidden flex flex-col pt-24 pb-24 px-6 font-['Geist',sans-serif]">
          {/* Back Button */}
          <button
            onClick={() => setShowContact(false)}
            className="absolute top-8 left-6 sm:top-12 sm:left-12 text-green-600 hover:text-green-950 tracking-[0.2em] uppercase text-[10px] sm:text-xs font-semibold py-2 transition-colors cursor-pointer group flex items-center gap-2"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            Back to Site
          </button>

          {/* Container */}
          <div className="w-full max-w-3xl mx-auto flex flex-col mt-4 sm:mt-8">
            {/* Header */}
            <div className="mb-12">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#16A34A] font-semibold block mb-3">
                Support
              </span>
              <h2 className="font-['Newsreader',serif] font-light text-3xl sm:text-5xl text-green-950 tracking-tight leading-snug">
                Have a question, found a bug, <br />
                <span className="italic text-green-700">
                  or have an idea to improve Tawfiq?
                </span>
              </h2>
              <p className="mt-4 text-green-700 text-sm sm:text-base font-light">
                We'd love to hear from you.
              </p>
            </div>

            {/* Conversation Form */}
            <form
              onSubmit={handleContactSubmit}
              className={`flex flex-col gap-10 ${shaking ? "animate-bounce" : ""}`}
            >
              <div className="space-y-12 text-lg sm:text-2xl font-['Newsreader',serif] text-green-900">
                {/* Line 1: Name */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
                  <span className="text-green-700 font-light">
                    Let's get in touch. My name is
                  </span>
                  <input
                    type="text"
                    placeholder="enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`font-['Geist',sans-serif] text-base sm:text-lg bg-transparent border-b ${
                      formStatus === "error" && !formData.name
                        ? "border-red-400"
                        : "border-green-300 focus:border-[#16A34A]"
                    } pb-1 outline-none transition-all duration-300 text-green-950 placeholder:text-green-400 flex-1 min-w-[220px]`}
                  />
                </div>

                {/* Line 2: Email */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
                  <span className="text-green-700 font-light">
                    You can reply to me at
                  </span>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`font-['Geist',sans-serif] text-base sm:text-lg bg-transparent border-b ${
                      formStatus === "error" && !formData.email
                        ? "border-red-400"
                        : "border-green-300 focus:border-[#16A34A]"
                    } pb-1 outline-none transition-all duration-300 text-green-950 placeholder:text-green-400 flex-1 min-w-[220px]`}
                  />
                </div>

                {/* Line 3: Category Selectors */}
                <div className="flex flex-col gap-4 pt-2">
                  <span className="text-green-700 font-light text-base sm:text-xl">
                    I'm writing because:
                  </span>
                  <div className="flex flex-wrap gap-3 font-['Geist',sans-serif]">
                    {categories.map((cat) => {
                      const isSelected = formData.category === cat;
                      return (
                        <button
                          type="button"
                          key={cat}
                          onClick={() =>
                            setFormData({ ...formData, category: cat })
                          }
                          className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm tracking-tight transition-all duration-300 cursor-pointer border ${
                            isSelected
                              ? "bg-green-950 text-white border-green-950 shadow-sm"
                              : "bg-white/50 text-green-800 border-green-200 hover:border-green-300"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full transition-colors ${
                              isSelected ? "bg-[#16A34A]" : "bg-green-300"
                            }`}
                          />
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Line 4: Dynamic Message Input */}
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-light text-base sm:text-xl">
                      Tell us more about this{" "}
                      <span className="text-[#16A34A] font-normal italic">
                        ({formData.category})
                      </span>
                      :
                    </span>
                  </div>
                  <textarea
                    rows="4"
                    placeholder={
                      categoryConfig[formData.category]?.placeholder ||
                      "Share your thoughts..."
                    }
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`font-['Geist',sans-serif] text-base sm:text-base bg-white/60 p-4 rounded-xl border ${
                      formStatus === "error" && !formData.message
                        ? "border-red-400"
                        : "border-green-200 focus:border-[#16A34A]"
                    } outline-none transition-all duration-300 text-green-950 placeholder:text-green-400/60 resize-none`}
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <button
                  type="submit"
                  className={`relative px-8 py-4 rounded-full font-['Geist',sans-serif] text-sm font-medium tracking-tight cursor-pointer transition-all duration-500 flex items-center justify-center min-w-[200px] ${
                    formStatus === "success"
                      ? "bg-[#16A34A] text-white shadow-[0_0_20px_rgba(22,163,74,0.4)]"
                      : "bg-green-950 text-white hover:bg-green-900"
                  }`}
                >
                  {formStatus === "idle" && "Send with Salaam →"}
                  {formStatus === "loading" && (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  {formStatus === "success" && "��✓ Message sent successfully."}
                  {formStatus === "error" &&
                    "Failed. Please fill all fields."}
                </button>
              </div>
            </form>

            {/* Support Footer */}
            <div className="mt-24 pt-12 border-t border-green-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-green-700 font-['Geist',sans-serif]">
              <div>
                <p className="text-green-600 uppercase tracking-widest mb-1 text-[10px]">
                  Need a quicker answer?
                </p>
                <a
                  href="mailto:tawfiq.base44@gmail.com"
                  className="text-green-950 font-medium hover:text-[#16A34A] transition-colors"
                >
                  tawfiq.base44@gmail.com
                </a>
                <span className="block text-green-600 mt-0.5">
                  Average reply &lt; 24 hours
                </span>
              </div>

              <div className="flex items-center gap-6">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-green-950 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-green-950 transition-colors"
                >
                  Discord
                </a>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Status: All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.main>
  );
}
