import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useSpring,
  useTransform,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion";

const topics = [
  {
    title: "Salah",
    arabic: "الصلاة",
    sentence: "The five moments that shape a day into a life of remembrance.",
    subtitle: "Master your Salah with confidence.",
    intro:
      "Learn every prayer step by step, understand every recitation, and build consistency through guided practice.",
    features: [
      "Interactive prayer guide",
      "Step-by-step movements",
      "Meaning of every recitation",
      "Prayer tracking & reminders",
    ],
    statistic: "Learn 100+ recitations and prayer essentials.",
  },
  {
    title: "Wudu",
    arabic: "الوضوء",
    sentence: "Purification of the body, a quiet preparation of the heart.",
    subtitle: "Perfect your purification.",
    intro:
      "Master Wudu with visual guidance and understand the Sunnah behind every step.",
    features: [
      "Interactive Wudu guide",
      "Common mistakes",
      "Sunnah practices",
      "Step verification",
    ],
    statistic: "Complete guide covering obligatory and Sunnah acts.",
  },
  {
    title: "Adhan",
    arabic: "الأذان",
    sentence:
      "The call that has gathered hearts to prayer for fourteen centuries.",
    subtitle: "Understand the call that shapes your day.",
    intro:
      "Learn every phrase of the Adhan and respond correctly with authentic supplications.",
    features: [
      "Phrase-by-phrase meaning",
      "Audio recitation",
      "Response after Adhan",
      "Prayer timing integration",
    ],
    statistic: "Learn every phrase with pronunciation and translation.",
  },
  {
    title: "Hadith",
    arabic: "الحديث",
    sentence:
      "The preserved words of the Prophet ﷺ, a living guide after the Book.",
    subtitle: "Discover authentic wisdom.",
    intro:
      "Explore carefully selected Hadith organized around worship, character, and daily life.",
    features: [
      "Daily Hadith",
      "Authentic sources",
      "Categories",
      "Save favourites",
    ],
    statistic: "Hundreds of authentic Hadith organized by topic.",
  },
  {
    title: "Ramadan",
    arabic: "رمضان",
    sentence: "The month of restraint, revelation, and return.",
    subtitle: "Prepare before Ramadan arrives.",
    intro:
      "Track your goals, worship, Quran reading, and daily habits throughout the blessed month.",
    features: [
      "Ramadan planner",
      "Daily goals",
      "Worship tracker",
      "Progress dashboard",
    ],
    statistic: "Stay consistent throughout the entire month.",
  },
  {
    title: "Zakat",
    arabic: "الزكاة",
    sentence: "A portion given, a wealth purified, a community held.",
    subtitle: "Calculate with confidence.",
    intro: "Understand your obligation and calculate Zakat accurately.",
    features: [
      "Simple calculator",
      "Nisab guidance",
      "Gold & cash support",
      "Clear explanations",
    ],
    statistic: "Accurate calculations in under a minute.",
  },
  {
    title: "Zakat Calculator",
    arabic: "حاسبة الزكاة",
    sentence: "Know what is due, with clarity and ease.",
    subtitle: "Know exactly what you owe.",
    intro:
      "Instantly calculate your Zakat using your assets and current Nisab values.",
    features: [
      "Gold & silver support",
      "Cash & investments",
      "Breakdown report",
      "Save calculations",
    ],
    statistic: "Complete calculation with detailed breakdown.",
  },
  {
    title: "Names of Allah",
    arabic: "أسماء الله الحسنى",
    sentence:
      "Tawfiq gives all the 99 names of Allah, explains their purpose, and where they can be implemented in real life.",
    subtitle: "All 99 Names of Allah",
    intro:
      "First of all, it gives all the 99 names of Allah, and then it explains their purpose and where it can be implemented in real life.",
    features: [
      "All 99 Names",
      "Core Purposes",
      "Real-life Implementation",
      "Practical Guidance",
    ],
    statistic: "Master the 99 Names and their real-life implementation.",
  },
  {
    title: "Islamic History",
    arabic: "التاريخ الإسلامي",
    sentence: "The story of a faith that shaped civilizations.",
    subtitle: "Travel through Islamic civilization.",
    intro:
      "Explore the major events, personalities, and milestones that shaped the Ummah.",
    features: [
      "Interactive timeline",
      "Maps",
      "Historical stories",
      "Important dates",
    ],
    statistic: "Explore 1400+ years of Islamic history.",
  },
  {
    title: "Learn Arabic",
    arabic: "تعلم العربية",
    sentence: "The language of revelation, learned one word at a time.",
    subtitle: "Understand the words you recite every day.",
    intro: "Build your Quranic vocabulary through Salah and daily remembrance.",
    features: [
      "Learn through Salah",
      "Essential Quran words",
      "AI explanations",
      "Track your vocabulary",
    ],
    statistic: "Learn 500+ essential Quranic words.",
  },
];

const springTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

// --- Custom Generative Animations for Each Topic ---
function PreviewVisuals({ title }) {
  switch (title) {
    case "Salah":
      return (
        <div className="flex gap-4 items-end h-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-4 rounded-t-full bg-green-200 origin-bottom"
              animate={{
                height: ["20%", "100%", "20%"],
                backgroundColor: ["#bbf7d0", "#16A34A", "#bbf7d0"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      );
    case "Wudu":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 rounded-full border-[1.5px] border-[#16A34A]"
              animate={{ scale: [1, 6], opacity: [0.8, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut",
              }}
            />
          ))}
          <div className="w-3 h-3 bg-[#16A34A] rounded-full shadow-[0_0_12px_rgba(22,163,74,0.8)]" />
        </div>
      );
    case "Adhan":
      return (
        <div className="flex items-center justify-center gap-2 h-24">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.div
              key={i}
              className="w-2 bg-[#16A34A] rounded-full"
              animate={{ height: ["10%", i % 2 === 0 ? "80%" : "100%", "10%"] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: Math.abs(i - 4) * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      );
    case "Hadith":
      return (
        <div className="relative w-28 h-36 perspective-[800px] flex">
          <div className="w-1/2 h-full bg-green-200 rounded-l-md border-r border-green-300 shadow-inner" />
          <div className="w-1/2 h-full bg-green-100 rounded-r-md shadow-md" />
          <motion.div
            className="absolute right-0 w-1/2 h-full bg-white rounded-l-md origin-left shadow-lg border-l border-green-100"
            animate={{ rotateY: [0, -180, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      );
    case "Ramadan":
      return (
        <div className="relative w-40 h-40 rounded-full bg-green-950 overflow-hidden flex items-center justify-center shadow-2xl">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
              animate={{ opacity: [0.1, 1, 0.1] }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random(),
              }}
            />
          ))}
          <motion.div
            className="w-14 h-14 rounded-full bg-transparent shadow-[inset_-12px_-5px_0_2px_#16A34A]"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      );
    case "Zakat":
      return (
        <div className="relative w-32 h-40 flex flex-col items-center justify-end pb-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-[#16A34A] rounded-full shadow-md"
              initial={{ y: -60, opacity: 0, scale: 0.5 }}
              animate={{ y: 20, opacity: [0, 1, 0], scale: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeIn",
              }}
            />
          ))}
          <div className="w-20 h-10 border-b-4 border-l-4 border-r-4 border-green-400 rounded-b-full opacity-60" />
        </div>
      );
    case "Zakat Calculator":
      return (
        <div className="flex items-center text-5xl font-['Newsreader',serif] font-light text-[#16A34A] overflow-hidden h-16">
          <span>$</span>
          <motion.div
            animate={{ y: ["0%", "-80%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "circOut" }}
            className="flex flex-col ml-1"
          >
            {["0", "150", "430", "890", "1,250"].map((num, i) => (
              <span key={i} className="h-16 flex items-center">
                {num}
              </span>
            ))}
          </motion.div>
        </div>
      );
    case "Names of Allah":
      return (
        <motion.div
          animate={{
            opacity: [0.2, 1, 0.2],
            filter: ["blur(4px)", "blur(0px)", "blur(4px)"],
            scale: [0.95, 1, 0.95],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <span className="text-7xl text-[#16A34A] font-arabic drop-shadow-lg">
            الرَّحْمَٰن
          </span>
        </motion.div>
      );
    case "Islamic History":
      return (
        <div className="relative w-64 h-1 bg-green-200 rounded-full flex items-center">
          <motion.div
            className="absolute left-0 h-full bg-[#16A34A] rounded-full"
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {[20, 50, 80].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white border-2 border-[#16A34A] rounded-full"
              style={{ left: `${pos}%` }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 4.5,
                delay: i * 1.5,
              }}
            />
          ))}
        </div>
      );
    case "Learn Arabic":
      return (
        <div className="relative flex items-center justify-center w-full h-24 text-4xl font-['Newsreader',serif] font-light text-[#16A34A]">
          <motion.span
            className="absolute font-arabic"
            animate={{
              opacity: [1, 0, 1],
              filter: ["blur(0px)", "blur(4px)", "blur(0px)"],
              scale: [1, 0.8, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            سلام
          </motion.span>
          <motion.span
            className="absolute"
            animate={{
              opacity: [0, 1, 0],
              filter: ["blur(4px)", "blur(0px)", "blur(4px)"],
              scale: [0.8, 1, 0.8],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Peace
          </motion.span>
        </div>
      );
    default:
      return null;
  }
}

// --- Icons ---
const ChevronDown = ({ className = "" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#16A34A"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// --- Wheel Node Component (Desktop) ---
function WheelNode({
  topic,
  index,
  angle,
  wheelRotation,
  isActive,
  isFaded,
  isOpened,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const counterRotation = useTransform(wheelRotation, (r) => -(r + angle));

  return (
    <div
      className="absolute inset-0 pointer-events-none flex justify-center hidden sm:flex"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div className="absolute top-0 -translate-y-1/2 pointer-events-auto origin-center">
        <motion.button
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          style={{ rotate: counterRotation }}
          animate={{ opacity: isFaded ? 0.2 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="group relative flex flex-col items-center justify-center p-4 cursor-pointer focus:outline-none touch-manipulation"
        >
          <div
            className={`w-2.5 h-2.5 rounded-full mb-3 transition-all duration-700 ${
              isActive && isOpened
                ? "bg-[#16A34A] scale-150 shadow-[0_0_24px_rgba(22,163,74,0.8)]"
                : isActive
                  ? "bg-[#16A34A] scale-125 shadow-[0_0_12px_rgba(22,163,74,0.6)]"
                  : "bg-green-300 group-hover:bg-green-400 group-hover:scale-110"
            }`}
          />
          <span
            className={`font-['Newsreader',serif] font-light tracking-wide transition-all duration-700 whitespace-nowrap ${
              isActive
                ? "text-xl text-[#16A34A] font-normal"
                : "text-base text-green-500 group-hover:text-green-700"
            }`}
          >
            {topic.title}
          </span>
        </motion.button>
      </div>
    </div>
  );
}

// --- Main Academy Component ---
export default function TawfiqLearningHub() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const [isLocked, setIsLocked] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const hoverTimer = useRef(null);
  const isSpinning = useRef(false);

  const N = topics.length;
  const anglePerItem = 360 / N;
  const wheelRotation = useSpring(0, { stiffness: 45, damping: 15, mass: 1.1 });

  const selectedTopic = topics[activeIndex];

  // Map activeIndex to wheel rotation
  useEffect(() => {
    wheelRotation.set(-activeIndex * anglePerItem);
  }, [activeIndex, anglePerItem, wheelRotation]);

  // Lock body scroll when overlays are open
  useEffect(() => {
    if (isOverlayOpen || isBottomSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOverlayOpen, isBottomSheetOpen]);

  const handleHoverEnter = (index) => {
    if (
      isSpinning.current ||
      isLocked ||
      index === activeIndex ||
      isOverlayOpen ||
      window.matchMedia("(hover: none)").matches
    )
      return;

    hoverTimer.current = setTimeout(() => {
      setActiveIndex(index);
      isSpinning.current = true;
      setTimeout(() => {
        isSpinning.current = false;
      }, 800);
    }, 120);
  };

  const handleHoverLeave = () => {
    clearTimeout(hoverTimer.current);
  };

  const handleNodeClick = (index, e) => {
    if (e) e.stopPropagation();
    if (isOverlayOpen || isLocked) return;

    if (index === activeIndex) {
      setIsLocked(true);
      setIsOverlayOpen(true);
    } else {
      setActiveIndex(index);
      isSpinning.current = true;
      setTimeout(() => {
        isSpinning.current = false;
      }, 800);
    }
  };

  const closeModule = (e) => {
    if (e) e.stopPropagation();
    setIsReturning(true);
    setIsOverlayOpen(false);

    setTimeout(() => {
      setIsReturning(false);
      setIsLocked(false);
    }, 1100);
  };

  return (
    <LayoutGroup>
      <section
        id="academy"
        className="relative min-h-[100dvh] bg-[#F0FDF4] overflow-hidden flex flex-col items-center font-['Geist',sans-serif] py-16 sm:py-20"
      >
        {/* Header Label, Title, and Description - Standard Flow to push content down safely */}
        <motion.div
          animate={{ opacity: isOverlayOpen ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="relative text-center z-20 w-full px-4 mb-8 sm:mb-12 shrink-0 pt-4"
        >
          <p className="text-[10px] sm:text-[11px] font-['Geist',sans-serif] tracking-[0.25em] uppercase text-green-500 mb-3 sm:mb-4">
            03 — The Academy
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-['Newsreader',serif] font-light text-green-950 tracking-tight leading-tight">
            Know Your Faith. <span className="text-[#16A34A]">Know Your Creator</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg font-['Newsreader',serif] font-light text-green-700 max-w-lg mx-auto leading-relaxed px-2">
            Explore the beauty of Islam through the 99 Names of Allah, daily Duas, Salah, Wudu, Seerah, and more, all in one place.
          </p>
        </motion.div>

        {/* --- MAIN INTERACTIVE AREA --- */}
        <div className="relative flex-1 w-full flex flex-col items-center justify-center min-h-[400px]">
          {/* CENTER CONTENT (Shared Layout Mobile + Desktop) */}
          <div className="relative sm:absolute z-30 flex flex-col items-center justify-center w-full max-w-lg sm:max-w-md text-center pointer-events-none px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`topic-${activeIndex}`}
                initial={
                  isReturning
                    ? false
                    : { opacity: 0, filter: "blur(4px)", y: 15 }
                }
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(4px)", y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center w-full pointer-events-auto"
              >
                <span
                  className="font-arabic text-6xl lg:text-7xl text-green-300/80 mb-6 leading-none"
                  dir="rtl"
                >
                  {selectedTopic.arabic}
                </span>

                {/* Title / Trigger (Opens Bottom Sheet on Mobile, disabled on Desktop) */}
                <button
                  onClick={() => {
                    if (window.innerWidth < 640) {
                      setIsBottomSheetOpen(true);
                    }
                  }}
                  className="flex items-center justify-center gap-2 mb-3 sm:mb-4 text-green-950 active:opacity-60 transition-opacity sm:pointer-events-none"
                >
                  <motion.h2
                    layoutId={`title-${selectedTopic.title}`}
                    className="font-['Newsreader',serif] font-light text-4xl sm:text-5xl tracking-tight leading-none"
                  >
                    {selectedTopic.title}
                  </motion.h2>
                  <div className="text-green-500 mt-1 sm:hidden">
                    <ChevronDown />
                  </div>
                </button>

                <motion.p
                  layoutId={`desc-${selectedTopic.title}`}
                  className="font-['Newsreader',serif] font-light text-base sm:text-xl italic text-green-700 leading-relaxed max-w-[280px] sm:max-w-md"
                >
                  {selectedTopic.sentence}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Mobile "Explore Module" Button (Hidden on Desktop) */}
            <div className="pointer-events-auto sm:hidden mt-10 mb-6 w-full flex justify-center">
              <button
                onClick={() => setIsOverlayOpen(true)}
                className="font-['Geist',sans-serif] bg-green-950 text-green-100 px-8 py-4 rounded-full text-xs tracking-[0.15em] uppercase font-semibold active:bg-green-900 transition-colors shadow-lg"
              >
                Explore Module
              </button>
            </div>
          </div>

          {/* --- DESKTOP WHEEL (Hidden on Mobile) --- */}
          <motion.div
            className={`hidden sm:flex relative items-center justify-center sm:w-[600px] sm:h-[600px] lg:w-[780px] lg:h-[780px] rounded-full border border-green-200/70 z-10 ${
              isLocked ? "pointer-events-none" : ""
            }`}
            style={{ rotate: wheelRotation }}
          >
            <motion.div
              animate={{ opacity: isOverlayOpen ? 0 : 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <div className="absolute inset-12 rounded-full border-[0.5px] border-green-200/50" />
              <div className="absolute inset-24 rounded-full border border-green-200/40 border-dashed" />
            </motion.div>

            {topics.map((topic, i) => (
              <WheelNode
                key={topic.title}
                topic={topic}
                index={i}
                angle={i * anglePerItem}
                wheelRotation={wheelRotation}
                isActive={i === activeIndex}
                isOpened={isOverlayOpen && selectedTopic.title === topic.title}
                isFaded={isOverlayOpen && selectedTopic.title !== topic.title}
                onMouseEnter={() => handleHoverEnter(i)}
                onMouseLeave={handleHoverLeave}
                onClick={(e) => handleNodeClick(i, e)}
              />
            ))}
          </motion.div>
        </div>

        {/* --- NATIVE BOTTOM SHEET SELECTOR (Mobile Only) --- */}
        <AnimatePresence>
          {isBottomSheetOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsBottomSheetOpen(false)}
                className="fixed inset-0 bg-green-950/40 z-[100] backdrop-blur-[2px] sm:hidden"
              />

              {/* Sheet */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[101] max-h-[85vh] flex flex-col shadow-2xl sm:hidden"
              >
                {/* Drag Handle & Header */}
                <div className="pt-3 pb-4 border-b border-green-100 shrink-0">
                  <div className="w-12 h-1.5 bg-green-200 rounded-full mx-auto mb-4" />
                  <h3 className="text-center font-['Geist',sans-serif] font-semibold text-xs text-green-500 uppercase tracking-widest">
                    Choose Topic
                  </h3>
                </div>

                {/* Scrollable List */}
                <div className="overflow-y-auto overflow-x-hidden p-4 pb-12 space-y-2">
                  {topics.map((topic, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <button
                        key={topic.title}
                        onClick={() => {
                          setActiveIndex(i);
                          setIsBottomSheetOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-colors active:bg-green-100 ${
                          isActive
                            ? "bg-green-100/50 border border-green-200/50"
                            : "bg-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-4 text-left">
                          <span
                            className="font-arabic text-xl text-green-500 w-12 text-center"
                            dir="rtl"
                          >
                            {topic.arabic}
                          </span>
                          <span
                            className={`font-['Newsreader',serif] font-light text-xl ${
                              isActive ? "text-[#16A34A]" : "text-green-800"
                            }`}
                          >
                            {topic.title}
                          </span>
                        </div>
                        {isActive && <CheckIcon />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* --- FULL SCREEN COURSE OVERLAY (Desktop & Mobile) --- */}
        <AnimatePresence>
          {isOverlayOpen && (
            <div className="fixed inset-0 z-[105] overflow-y-auto overflow-x-hidden bg-[#F0FDF4]">
              {/* Desktop Expanding Background */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 35 }}
                exit={{ scale: 0 }}
                transition={springTransition}
                className="hidden sm:block fixed top-1/2 left-1/2 w-48 h-48 bg-[#F0FDF4] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ zIndex: -1 }}
              />

              {/* Mobile Sticky Top Bar (iOS style) */}
              <div className="sm:hidden sticky top-0 z-50 bg-[#F0FDF4]/90 backdrop-blur-md border-b border-green-200/50 px-4 py-4 flex items-center">
                <button
                  onClick={closeModule}
                  className="text-green-600 font-['Geist',sans-serif] text-sm tracking-wide font-medium flex items-center gap-1 active:opacity-60"
                >
                  <ChevronDown className="rotate-90" />
                  Back
                </button>
              </div>

              {/* Desktop Fixed Back Button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
                transition={{ delay: 0.3, duration: 0.6 }}
                onClick={closeModule}
                className="hidden sm:block fixed top-12 left-12 z-50 text-green-500 hover:text-green-900 tracking-widest uppercase text-xs font-semibold py-2 transition-colors cursor-pointer pointer-events-auto font-['Geist',sans-serif]"
              >
                ← Back to Academy
              </motion.button>

              {/* Course Content */}
              <div className="relative w-full max-w-4xl mx-auto px-6 pt-12 sm:pt-40 pb-32 flex flex-col items-center">
                <motion.h1
                  layoutId={`title-${selectedTopic.title}`}
                  transition={springTransition}
                  className="font-['Newsreader',serif] font-light text-5xl sm:text-7xl lg:text-8xl text-[#16A34A] tracking-tight leading-none mb-4 sm:mb-6 text-center"
                >
                  {selectedTopic.title}
                </motion.h1>

                <motion.p
                  layoutId={`desc-${selectedTopic.title}`}
                  transition={springTransition}
                  className="font-['Newsreader',serif] font-light text-lg sm:text-2xl italic text-green-700 text-center leading-relaxed mb-12 sm:mb-0 max-w-xl"
                >
                  {selectedTopic.sentence}
                </motion.p>

                <div className="w-full border-t border-green-200/60 pt-12 sm:pt-20 sm:mt-24 flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mb-12 sm:mb-24 px-4"
                  >
                    <h3 className="text-2xl sm:text-3xl font-['Newsreader',serif] font-light text-green-950 mb-4 sm:mb-6">
                      {selectedTopic.subtitle}
                    </h3>
                    <p className="font-['Newsreader',serif] font-light text-green-700 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
                      {selectedTopic.intro}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-full max-w-3xl mb-12 sm:mb-24"
                  >
                    <p className="text-[10px] sm:text-xs font-['Geist',sans-serif] tracking-[0.2em] uppercase text-green-500 mb-6 sm:mb-8 text-center font-semibold">
                      Inside Tawfiq
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                      {selectedTopic.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-green-200/60 p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center shadow-sm"
                        >
                          <p className="font-['Newsreader',serif] font-light text-green-900 text-base sm:text-lg">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* CUSTOM ANIMATION INJECTED HERE */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="w-full h-64 sm:h-96 bg-gradient-to-br from-green-100 to-[#F0FDF4] rounded-3xl flex items-center justify-center mb-12 sm:mb-24 border border-green-200/50 shadow-inner overflow-hidden relative"
                  >
                    <PreviewVisuals title={selectedTopic.title} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mb-12 sm:mb-24 px-4 max-w-2xl"
                  >
                    <div className="w-8 sm:w-12 h-[1px] bg-[#16A34A] mx-auto mb-6 sm:mb-8" />
                    <p className="text-xl sm:text-3xl font-['Newsreader',serif] font-light text-green-900 italic leading-relaxed">
                      "{selectedTopic.statistic}"
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="pb-12 w-full sm:w-auto"
                  >
                    <button className="font-['Geist',sans-serif] w-full sm:w-auto bg-green-950 text-green-100 px-10 py-4 rounded-xl sm:rounded-full text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold hover:bg-[#16A34A] hover:text-white transition-all duration-300 shadow-xl sm:hover:shadow-2xl sm:hover:-translate-y-1 cursor-pointer active:bg-green-900">
                      Open in Tawfiq
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
}