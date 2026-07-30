import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";

// Note: Ensure this path correctly points to your QR image
import qrImage from "../../assets/qr-placeholder.png";

// EmailJS Configuration Keys (Replace with your actual EmailJS IDs)
const EMAILJS_SERVICE_ID = "service_8msblsf";
const EMAILJS_TEMPLATE_ID = "template_9gd6lm2";
const EMAILJS_PUBLIC_KEY = "5iuNuXg40cmMgueNJ";

// --- Added Tawfiq AI to the navItems array ---
const navItems = [
  { id: "qaza", label: "Qaza", href: "#qaza" },
  { id: "quran", label: "Quran", href: "#quran" },
  { id: "academy", label: "Academy", href: "#academy" },
  { id: "tawfiq-ai", label: "Tawfiq AI", href: "#tawfiq-ai" }, 
];

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

function NavLink({ item, isActive, onClick }) {
  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      className="relative px-5 py-2 font-['Plus_Jakarta_Sans',sans-serif] text-[13px] tracking-[-0.01em] font-medium transition-colors duration-300 z-10 cursor-pointer"
      style={{ color: isActive ? "#1c1917" : "#78716c" }}
      whileHover={{ color: "#1c1917" }}
    >
      <span className="relative z-10">{item.label}</span>

      {/* Active Navigation Dot */}
      {isActive && (
        <motion.div
          layoutId="navActiveDot"
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C6A26B]"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("qaza");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const location = useLocation();

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Question",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [shaking, setShaking] = useState(false);

  // Handle scroll blur effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu, scanner, or contact modal is open
  useEffect(() => {
    if (isMenuOpen || showScanner || showContact) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen, showScanner, showContact]);

  // Section Observer for Active Dots
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveItem(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
      setShowScanner(false);
      setShowContact(false);
    }
  };

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
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          scrolled || isMenuOpen
            ? "bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="relative max-w-[1400px] mx-auto px-6 lg:px-10 h-14 md:h-20 flex items-center justify-between">
          {/* MOBILE LEFT: Premium Editorial Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 p-2 -ml-2 text-stone-900 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-[1px] w-full bg-stone-900 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-[1px] bg-stone-900 transition-all duration-300 ${
                  isMenuOpen ? "w-0 opacity-0" : "w-full"
                }`}
              />
              <span
                className={`block h-[1px] w-full bg-stone-900 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""
                }`}
              />
            </div>
          </button>

          {/* LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-50">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="group flex items-center gap-2.5 cursor-pointer"
            >
              <motion.svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                className="text-stone-900"
                whileHover={{ rotate: 5, x: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <path
                  d="M11 2C11 2 5 6 5 12C5 16 8 19 11 19C14 19 17 16 17 12C17 6 11 2 11 2Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 5V19M8 11L11 8L14 11"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
              <span className="font-['Cormorant_Garamond',serif] font-[600] text-xl text-stone-900 tracking-[-0.01em]">
                Tawfiq
              </span>
            </Link>
          </div>

          {/* DESKTOP CENTER: Navigation Items */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
            {navItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <NavLink
                  item={item}
                  isActive={activeItem === item.id}
                  onClick={() => setActiveItem(item.id)}
                />
                {index < navItems.length - 1 && (
                  <span className="text-stone-400/30 text-[10px] mx-1">•</span>
                )}
              </React.Fragment>
            ))}
            {/* Added Contact Link to Desktop Nav */}
            <span className="text-stone-400/30 text-[10px] mx-1">•</span>
            <button
              onClick={() => setShowContact(true)}
              className="relative px-5 py-2 font-['Plus_Jakarta_Sans',sans-serif] text-[13px] tracking-[-0.01em] font-medium text-stone-500 hover:text-stone-900 transition-colors duration-300 z-10 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* DESKTOP RIGHT: CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setShowScanner(true)}
              className="group inline-flex items-center gap-2.5 text-[13px] text-stone-900 transition-all duration-300 cursor-pointer focus:outline-none"
            >
              <span className="w-0 group-hover:w-4 h-[1px] bg-[#C6A26B] transition-all duration-500" />
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                className="text-stone-900 transition-colors duration-500 group-hover:text-[#C6A26B]"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M12 5 L14.5 12 L12 14.5 L9.5 12 Z"
                  fill="currentColor"
                />
                <path
                  d="M12 19 L14.5 12 L12 14.5 L9.5 12 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="0.7" fill="currentColor" />
              </svg>
              <span className="relative font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[13px] tracking-tight group-hover:text-[#6B4F37] transition-colors duration-500">
                Begin with Bismillah
                <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#C6A26B] transition-all duration-500 group-hover:w-full" />
              </span>
              <span className="w-0 group-hover:w-4 h-[1px] bg-[#C6A26B] transition-all duration-500" />
            </button>
          </div>

          <div className="block md:hidden w-8" />
        </nav>
      </motion.header>

      {/* =========================================
          PREMIUM CONTACT EXPERIENCE OVERLAY (OPTION 3)
          ========================================= */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] bg-[#F8F6F2] overflow-y-auto overflow-x-hidden flex flex-col pt-24 pb-24 px-6 font-['Plus_Jakarta_Sans',sans-serif]"
          >
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={() => setShowContact(false)}
              className="absolute top-8 left-6 sm:top-12 sm:left-12 text-stone-400 hover:text-stone-800 tracking-[0.2em] uppercase text-[10px] sm:text-xs font-semibold py-2 transition-colors cursor-pointer group flex items-center gap-2"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
                ←
              </span>
              Back to Site
            </motion.button>

            {/* Container */}
            <div className="w-full max-w-3xl mx-auto flex flex-col mt-4 sm:mt-8">
              {/* Header */}
              <div className="mb-12">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C6A26B] font-semibold block mb-3">
                  Support
                </span>
                <h2 className="font-['Cormorant_Garamond',serif] font-normal text-3xl sm:text-5xl text-stone-900 tracking-tight leading-snug">
                  Have a question, found a bug, <br />
                  <span className="italic text-stone-500 font-light">
                    or have an idea to improve Tawfiq?
                  </span>
                </h2>
                <p className="mt-4 text-stone-600 text-sm sm:text-base font-light">
                  We'd love to hear from you.
                </p>
              </div>

              {/* Conversation Form */}
              <form
                onSubmit={handleContactSubmit}
                className={`flex flex-col gap-10 ${shaking ? "animate-bounce" : ""}`}
              >
                <div className="space-y-12 text-lg sm:text-2xl font-['Cormorant_Garamond',serif] text-stone-800">
                  {/* Line 1: Name */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
                    <span className="text-stone-500 font-light">
                      Let's get in touch. My name is
                    </span>
                    <input
                      type="text"
                      placeholder="enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg bg-transparent border-b ${
                        formStatus === "error" && !formData.name
                          ? "border-red-400"
                          : "border-stone-300 focus:border-[#C6A26B]"
                      } pb-1 outline-none transition-all duration-300 text-stone-900 placeholder:text-stone-300 flex-1 min-w-[220px]`}
                    />
                  </div>

                  {/* Line 2: Email */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
                    <span className="text-stone-500 font-light">
                      You can reply to me at
                    </span>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg bg-transparent border-b ${
                        formStatus === "error" && !formData.email
                          ? "border-red-400"
                          : "border-stone-300 focus:border-[#C6A26B]"
                      } pb-1 outline-none transition-all duration-300 text-stone-900 placeholder:text-stone-300 flex-1 min-w-[220px]`}
                    />
                  </div>

                  {/* Line 3: Category Selectors (Visual Radio Buttons) */}
                  <div className="flex flex-col gap-4 pt-2">
                    <span className="text-stone-500 font-light text-base sm:text-xl">
                      I'm writing because:
                    </span>
                    <div className="flex flex-wrap gap-3 font-['Plus_Jakarta_Sans',sans-serif]">
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
                                ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                                : "bg-white/50 text-stone-600 border-stone-200 hover:border-stone-300"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full transition-colors ${
                                isSelected ? "bg-[#C6A26B]" : "bg-stone-300"
                              }`}
                            />
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Line 4: Dynamic Message Input matching selected category */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 font-light text-base sm:text-xl">
                        Tell us more about this{" "}
                        <span className="text-[#C6A26B] font-normal italic">
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
                      className={`font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-base bg-white/40 p-4 rounded-xl border ${
                        formStatus === "error" && !formData.message
                          ? "border-red-400"
                          : "border-stone-200 focus:border-[#C6A26B]"
                      } outline-none transition-all duration-300 text-stone-900 placeholder:text-stone-300 resize-none`}
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative px-8 py-4 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-sm font-medium tracking-tight cursor-pointer transition-all duration-500 flex items-center justify-center min-w-[200px] ${
                      formStatus === "success"
                        ? "bg-[#C6A26B] text-white shadow-[0_0_20px_rgba(198,162,107,0.4)]"
                        : "bg-stone-900 text-white hover:bg-stone-800"
                    }`}
                  >
                    {formStatus === "idle" && "Send with Salaam →"}
                    {formStatus === "loading" && (
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    {formStatus === "success" && "✓ Message sent successfully."}
                    {formStatus === "error" &&
                      "Failed. Please fill all fields."}
                  </motion.button>
                </div>
              </form>

              {/* Bottom Support Footer Info */}
              <div className="mt-24 pt-12 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-stone-500 font-['Plus_Jakarta_Sans',sans-serif]">
                <div>
                  <p className="text-stone-400 uppercase tracking-widest mb-1 text-[10px]">
                    Need a quicker answer?
                  </p>
                  <a
                    href="mailto:tawfiq.base44@gmail.com"
                    className="text-stone-900 font-medium hover:text-[#C6A26B] transition-colors"
                  >
                    tawfiq.base44@gmail.com
                  </a>
                  <span className="block text-stone-400 mt-0.5">
                    Average reply &lt; 24 hours
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-stone-900 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-stone-900 transition-colors"
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          PREMIUM DOWNLOAD EXPERIENCE OVERLAY
          ========================================= */}
      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#f4f5f4] overflow-y-auto overflow-x-hidden flex flex-col items-center pt-24 pb-16 px-6 font-['Plus_Jakarta_Sans',sans-serif]"
          >
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={() => setShowScanner(false)}
              className="absolute top-8 left-6 sm:top-12 sm:left-12 text-stone-400 hover:text-stone-800 tracking-[0.2em] uppercase text-[10px] sm:text-xs font-semibold py-2 transition-colors cursor-pointer group flex items-center gap-2"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
                ←
              </span>
              Back to Site
            </motion.button>

            {/* Cinematic Header Container */}
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-4 sm:mt-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                className="font-['Cormorant_Garamond',serif] font-bold text-5xl sm:text-7xl text-stone-900 tracking-[-0.02em] mb-6"
              >
                Download{" "}
                <span className="italic font-normal text-[#C6A26B]">
                  Tawfiq
                </span>
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                className="w-16 sm:w-24 h-[1px] bg-[#C6A26B] mb-8"
              />

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="font-['Cormorant_Garamond',serif] text-2xl sm:text-4xl text-stone-800 font-normal leading-relaxed max-w-2xl tracking-tight"
              >
                Begin with one prayer. <br className="hidden sm:block" />
                <span className="text-stone-500 text-xl sm:text-3xl mt-2 block font-light italic">
                  Leave with a lifetime of consistency.
                </span>
              </motion.h3>
            </div>

            {/* Centered QR Code */}
            <div className="w-full max-w-xl mx-auto mt-16 sm:mt-24 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200/50 mb-8 flex flex-col items-center"
              >
                <img
                  src={qrImage}
                  alt="Scan to download"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain mix-blend-multiply"
                />
              </motion.div>
            </div>

            {/* Features & Trust Signals Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="w-full mt-16 sm:mt-24 flex flex-col items-center"
            >
              {/* Feature List */}
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-stone-500 font-['Plus_Jakarta_Sans',sans-serif] font-medium text-base sm:text-lg px-4 text-center tracking-tight">
                <span>Prayer Tracking</span>
                <span className="text-[#C6A26B] opacity-50 hidden sm:block">
                  •
                </span>
                <span>Qaza Recovery</span>
                <span className="text-[#C6A26B] opacity-50 hidden sm:block">
                  •
                </span>
                <span>Quran</span>
                <span className="text-[#C6A26B] opacity-50 hidden sm:block">
                  •
                </span>
                <span>Dhikr</span>
                <span className="text-[#C6A26B] opacity-50 hidden sm:block">
                  •
                </span>
                <span>Islamic Academy</span>
              </div>

              {/* Trust Signals */}
              <div className="mt-12 flex flex-col items-center gap-4">
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] sm:text-xs tracking-[0.2em] uppercase text-stone-400 font-semibold text-center">
                  Built with sincerity for every Muslim.
                </p>
                <div className="flex items-center gap-4 text-[10px] sm:text-xs tracking-widest uppercase text-stone-400/70 font-medium">
                  <span>Free Forever</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300" />
                  <span>No Ads</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300" />
                  <span>Privacy First</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          MOBILE MENU FULLSCREEN OVERLAY
          ========================================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#F7F5F1] flex flex-col items-center justify-center md:hidden font-['Plus_Jakarta_Sans',sans-serif]"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-['Cormorant_Garamond',serif] font-medium text-4xl text-stone-900 tracking-tight"
                >
                  {item.label}
                </motion.a>
              ))}

              {/* Added Contact Link to Mobile Menu */}
              <motion.button
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowContact(true);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-['Cormorant_Garamond',serif] font-medium text-4xl text-stone-900 tracking-tight cursor-pointer"
              >
                Contact
              </motion.button>

              <motion.button
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowScanner(true);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-2 font-['Plus_Jakarta_Sans',sans-serif] font-medium text-lg text-[#C6A26B] tracking-tight cursor-pointer"
              >
                Begin with Bismillah
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-12 h-px bg-stone-300 mt-12"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}