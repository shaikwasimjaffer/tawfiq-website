import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";

// Note: Ensure this path correctly points to your QR image
import qrImage from "../../assets/qr code.png";

// EmailJS Configuration Keys
const EMAILJS_SERVICE_ID = "service_8msblsf";
const EMAILJS_TEMPLATE_ID = "template_9gd6lm2";
const EMAILJS_PUBLIC_KEY = "5iuNuXg40cmMgueNJ";

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
      onClick={(e) => onClick(e, item)}
      className="relative px-4 py-1.5 rounded-full font-['Geist',sans-serif] text-[15px] tracking-[-0.01em] font-medium transition-all duration-200 z-10 cursor-pointer"
      style={{
        color: isActive ? "#052E16" : "#166534",
      }}
      whileHover={{
        backgroundColor: "rgba(22, 163, 74, 0.08)",
        color: "#052E16",
      }}
    >
      <span className="relative z-10">{item.label}</span>

      {/* Subtle Active Indicator Dot */}
      {isActive && (
        <motion.div
          layoutId="navActiveDot"
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#16A34A]"
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

  // Unified morphing animation state applied to ALL desktop actions
  const [animatingAction, setAnimatingAction] = useState(null);

  const location = useLocation();

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Question",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle");
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
      if (animatingAction) return;
      setAnimatingAction({ type: "logo", label: "Tawfiq" });

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setIsMenuOpen(false);
        setShowScanner(false);
        setShowContact(false);

        setTimeout(() => setAnimatingAction(null), 400);
      }, 450);
    }
  };

  const handleNavClick = (e, item) => {
    if (location.pathname === "/") {
      e.preventDefault();
      if (animatingAction) return;

      setAnimatingAction({ type: "nav", label: item.label });

      setTimeout(() => {
        const element = document.getElementById(item.id);
        if (element) {
          const yOffset = -80;
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }

        setTimeout(() => setAnimatingAction(null), 400);
      }, 450);
    }
  };

  const handleContactClick = () => {
    if (animatingAction) return;
    setAnimatingAction({ type: "contact", label: "Contact" });

    setTimeout(() => {
      setShowContact(true);
      setTimeout(() => setAnimatingAction(null), 400);
    }, 450);
  };

  const handleBismillahClick = () => {
    if (animatingAction) return;
    setAnimatingAction({ type: "bismillah", label: "Bismillah" });

    setTimeout(() => {
      setShowScanner(true);
      setTimeout(() => setAnimatingAction(null), 400);
    }, 450);
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

  // Mobile navigation header text switcher based on scroll position
  const mobileNavText = !scrolled
    ? "Tawfiq"
    : navItems.find((item) => item.id === activeItem)?.label || "Tawfiq";

  return (
    <>
      {/* FLOATING GLASS PILL NAVBAR CONTAINER */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className={`fixed inset-x-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ${
          scrolled ? "top-2 md:top-3" : "top-4 md:top-5"
        }`}
      >
        <nav
          className={`pointer-events-auto relative overflow-hidden w-[92%] px-6 md:px-8 rounded-full flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-[56px] max-w-[1100px]" : "h-[68px] max-w-[1250px]"
          } ${
            scrolled || isMenuOpen
              ? "bg-white/40 backdrop-blur-2xl border border-white/50 shadow-[0_24px_48px_-12px_rgba(5,46,22,0.08),inset_0_1px_2px_rgba(255,255,255,0.8)]"
              : "bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_12px_32px_-8px_rgba(5,46,22,0.04),inset_0_1px_1px_rgba(255,255,255,0.5)]"
          }`}
        >
          {/* Main Content Wrapper */}
          <motion.div
            className="w-full flex items-center justify-between"
            animate={{ opacity: animatingAction ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* MOBILE LEFT: Menu Icon */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-50 p-2 -ml-2 text-green-950 focus:outline-none cursor-pointer group"
              aria-label="Toggle Menu"
            >
              <div className="w-[22px] flex flex-col gap-[6px]">
                <span
                  className={`block h-[1.25px] w-full rounded-full bg-green-950 transition-all duration-300 ease-out origin-center ${
                    isMenuOpen ? "rotate-45 translate-y-[7.25px]" : ""
                  }`}
                />
                <span
                  className={`block h-[1.25px] rounded-full bg-green-950 transition-all duration-300 ease-out ${
                    isMenuOpen ? "w-0 opacity-0" : "w-full"
                  }`}
                />
                <span
                  className={`block h-[1.25px] w-full rounded-full bg-green-950 transition-all duration-300 ease-out origin-center ${
                    isMenuOpen ? "-rotate-45 -translate-y-[7.25px]" : ""
                  }`}
                />
              </div>
            </button>

            {/* LOGO & DYNAMIC MOBILE TITLE */}
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
                  className="text-green-950"
                  whileHover={{ rotate: 5, x: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <path
                    d="M11 2C11 2 5 6 5 12C5 16 8 19 11 19C14 19 17 16 17 12C17 6 11 2 11 2Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 5V19M8 11L11 8L14 11"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
                <span className="hidden md:block font-['Newsreader',serif] font-medium text-xl text-green-950 tracking-[-0.01em]">
                  Tawfiq
                </span>

                {/* MOBILE TEXT: Dynamic Section Tracker */}
                <div className="block md:hidden overflow-hidden h-6 flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={mobileNavText}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="block font-['Newsreader',serif] font-medium text-xl text-green-950 tracking-[-0.01em]"
                    >
                      {mobileNavText}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </Link>
            </div>

            {/* DESKTOP CENTER: Navigation Items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  item={item}
                  isActive={activeItem === item.id}
                  onClick={handleNavClick}
                />
              ))}
              <motion.button
                onClick={handleContactClick}
                whileHover={{
                  backgroundColor: "rgba(22, 163, 74, 0.08)",
                  color: "#052E16",
                }}
                className="relative px-4 py-1.5 rounded-full font-['Geist',sans-serif] text-[15px] tracking-[-0.01em] font-medium text-[#166534] transition-all duration-200 z-10 cursor-pointer"
              >
                Contact
              </motion.button>
            </div>

            {/* DESKTOP RIGHT Spacer */}
            <div className="hidden md:block w-[190px]" />
            <div className="block md:hidden w-8" />
          </motion.div>

          {/* DESKTOP RIGHT: The Magic Expanding Pill CTA */}
          <motion.div
            className="hidden md:flex absolute inset-y-0 items-center justify-end z-[60] pointer-events-none"
            animate={{
              left: animatingAction ? 0 : "auto",
              right: animatingAction ? 0 : 32,
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              onClick={handleBismillahClick}
              whileHover={{ y: -1 }} // very small hover movement
              className={`group bg-[#15803D] hover:bg-[#146c33] text-white flex items-center justify-center font-['Geist',sans-serif] overflow-hidden pointer-events-auto cursor-pointer shadow-sm border border-white/20 transition-all ${
                animatingAction ? "" : "px-5 py-3 md:px-6 md:py-3.5"
              }`}
              animate={{
                width: animatingAction ? "100%" : "auto",
                height: animatingAction ? "100%" : "auto",
                borderRadius: "9999px",
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatePresence mode="wait">
                {animatingAction ? (
                  <motion.span
                    key="animating-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                    className="font-['Newsreader',serif] font-light italic text-2xl text-white tracking-wide"
                  >
                    {animatingAction.label}
                  </motion.span>
                ) : (
                  <motion.div
                    key="begin"
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 text-[14px] md:text-[15px] font-medium tracking-tight whitespace-nowrap"
                  >
                    <span className="font-serif text-[16px] md:text-[18px] opacity-90 leading-none pt-0.5" dir="rtl">
                      بسم الله
                    </span>
                    <span>Bismillah</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </nav>
      </motion.header>

      {/* =========================================
          CONTACT EXPERIENCE OVERLAY
          ========================================= */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] bg-[#F0FDF4] overflow-y-auto overflow-x-hidden flex flex-col pt-24 pb-24 px-6 font-['Geist',sans-serif]"
          >
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={() => setShowContact(false)}
              className="absolute top-8 left-6 sm:top-12 sm:left-12 text-green-600 hover:text-green-950 tracking-[0.2em] uppercase text-[10px] sm:text-xs font-semibold py-2 transition-colors cursor-pointer group flex items-center gap-2"
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
                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
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
                    {formStatus === "success" && "✓ Message sent successfully."}
                    {formStatus === "error" &&
                      "Failed. Please fill all fields."}
                  </motion.button>
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
            className="fixed inset-0 z-[100] bg-[#F0FDF4] overflow-y-auto overflow-x-hidden flex flex-col items-center pt-24 pb-16 px-6 font-['Geist',sans-serif]"
          >
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={() => setShowScanner(false)}
              className="absolute top-8 left-6 sm:top-12 sm:left-12 text-green-600 hover:text-green-950 tracking-[0.2em] uppercase text-[10px] sm:text-xs font-semibold py-2 transition-colors cursor-pointer group flex items-center gap-2"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
                ←
              </span>
              Back to Site
            </motion.button>

            {/* Cinematic Typography Header Container */}
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-8 sm:mt-12 mb-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                className="font-['Newsreader',serif] font-light text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.05] text-[#052E16] tracking-[-0.01em]"
              >
                Download <span className="italic text-[#16A34A]">Tawfiq</span>
                <br />
                <span className="italic text-[#16A34A]">to begin today.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6 font-['Geist',sans-serif] text-[#16A34A] text-[15px] sm:text-[18px] max-w-2xl mx-auto leading-relaxed"
              >
                Begin with one prayer. Leave with a lifetime of consistency.
                Scan the QR code below to download the app for iOS and Android.
              </motion.p>
            </div>

            {/* Centered QR Code */}
            <div className="w-full max-w-xl mx-auto mt-10 sm:mt-16 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-green-200/50 mb-8 flex flex-col items-center"
              >
                <img
                  src={qrImage}
                  alt="Scan to download"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain mix-blend-multiply"
                />
              </motion.div>
            </div>

            {/* Features & Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="w-full mt-10 sm:mt-16 flex flex-col items-center"
            >
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-green-800 font-['Geist',sans-serif] font-medium text-base sm:text-lg px-4 text-center tracking-tight">
                <span>Prayer Tracking</span>
                <span className="text-[#16A34A] opacity-50 hidden sm:block">
                  •
                </span>
                <span>Qaza Recovery</span>
                <span className="text-[#16A34A] opacity-50 hidden sm:block">
                  •
                </span>
                <span>Quran</span>
                <span className="text-[#16A34A] opacity-50 hidden sm:block">
                  •
                </span>
                <span>Dhikr</span>
                <span className="text-[#16A34A] opacity-50 hidden sm:block">
                  •
                </span>
                <span>Islamic Academy</span>
              </div>

              <div className="mt-12 flex flex-col items-center gap-4">
                <p className="font-['Geist',sans-serif] text-[10px] sm:text-xs tracking-[0.2em] uppercase text-green-600 font-semibold text-center">
                  Built with sincerity for every Muslim.
                </p>
                <div className="flex items-center gap-4 text-[10px] sm:text-xs tracking-widest uppercase text-green-600/70 font-medium">
                  <span>Free Forever</span>
                  <span className="w-1 h-1 rounded-full bg-green-300" />
                  <span>No Ads</span>
                  <span className="w-1 h-1 rounded-full bg-green-300" />
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
            className="fixed inset-0 z-40 bg-[#F0FDF4] flex flex-col items-center justify-center md:hidden font-['Geist',sans-serif]"
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
                  className="font-['Newsreader',serif] font-light text-4xl text-green-950 tracking-tight"
                >
                  {item.label}
                </motion.a>
              ))}

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
                className="font-['Newsreader',serif] font-light text-4xl text-green-950 tracking-tight cursor-pointer"
              >
                Contact
              </motion.button>

              {/* Elevated Mobile Bismillah CTA */}
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
                whileHover={{ y: -1 }}
                className="mt-4 flex items-center justify-center gap-3 px-6 py-3.5 bg-[#15803D] hover:bg-[#146c33] text-white rounded-full font-['Geist',sans-serif] font-medium tracking-tight cursor-pointer border border-white/20 shadow-sm transition-all"
              >
                <span className="font-serif text-[18px] opacity-90 leading-none pt-0.5" dir="rtl">بسم الله</span>
                <span className="text-[16px]">Bismillah</span>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-12 h-px bg-green-200 mt-12"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}