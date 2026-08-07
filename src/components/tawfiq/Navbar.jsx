import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";

// Note: Ensure this path correctly points to your QR image
import qrImage from "../../assets/qr code.png";

// EmailJS Configuration Keys (Replace with your actual EmailJS IDs)
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
      className="relative px-4 py-1.5 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-[15px] tracking-[-0.01em] font-medium transition-all duration-200 z-10 cursor-pointer"
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

  // Unified morphing animation state applied to ALL actions
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

  // Determine what text to show in the mobile navbar depending on scroll position
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
          {/* Main Content Wrapper - Fades out gracefully during ANY action animation */}
          <motion.div
            className="w-full flex items-center justify-between"
            animate={{ opacity: animatingAction ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* MOBILE LEFT: Editorial Menu Icon */}
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
                
                {/* DESKTOP TEXT: Static Logo text */}
                <span className="hidden md:block font-['Cormorant_Garamond',serif] font-[600] text-xl text-green-950 tracking-[-0.01em]">
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
                      className="block font-['Cormorant_Garamond',serif] font-[600] text-xl text-green-950 tracking-[-0.01em]"
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
                className="relative px-4 py-1.5 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-[15px] tracking-[-0.01em] font-medium text-[#166534] transition-all duration-200 z-10 cursor-pointer"
              >
                Contact
              </motion.button>
            </div>

            {/* DESKTOP RIGHT: Spacer for floating CTA button to maintain flex centering */}
            <div className="hidden md:block w-[190px]" />
            <div className="block md:hidden w-8" />
          </motion.div>

          {/* DESKTOP RIGHT: The Magic Expanding Pill (Applied to all Navbar Actions) */}
          <motion.div
            className="hidden md:flex absolute inset-y-0 items-center justify-end z-[60] pointer-events-none"
            animate={{
              left: animatingAction ? 0 : "auto",
              right: animatingAction ? 0 : 32, // corresponds to md:px-8 padding
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              onClick={handleBismillahClick}
              className="group bg-[#15803D] hover:bg-[#146c33] text-white flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden pointer-events-auto cursor-pointer shadow-sm"
              animate={{
                width: animatingAction ? "100%" : "190px",
                height: animatingAction ? "100%" : "40px",
                borderRadius: animatingAction ? "9999px" : "9999px",
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
                    className="font-serif italic text-2xl text-white tracking-wide"
                  >
                    {animatingAction.label}
                  </motion.span>
                ) : (
                  <motion.div
                    key="begin"
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2.5 text-[13px] font-medium tracking-tight"
                  >
                    <span>Begin with Bismillah</span>
                    <span className="transform group-hover:translate-x-0.5 transition-transform duration-300">
                      →
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </nav>
      </motion.header>

      {/* =========================================
          PREMIUM CONTACT EXPERIENCE OVERLAY
          ========================================= */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] bg-[#F0FDF4] overflow-y-auto overflow-x-hidden flex flex-col pt-24 pb-24 px-6 font-['Plus_Jakarta_Sans',sans-serif]"
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
                <h2 className="font-['Cormorant_Garamond',serif] font-normal text-3xl sm:text-5xl text-green-950 tracking-tight leading-snug">
                  Have a question, found a bug, <br />
                  <span className="italic text-green-700 font-light">
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
                <div className="space-y-12 text-lg sm:text-2xl font-['Cormorant_Garamond',serif] text-green-900">
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
                      className={`font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg bg-transparent border-b ${
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
                      className={`font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg bg-transparent border-b ${
                        formStatus === "error