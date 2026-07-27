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
    sentence: "Ninety-nine doors of knowing the One who knows you.",
    subtitle: "Reflect on His beautiful names.",
    intro:
      "Learn the meanings, virtues, and practical reflections of the 99 Names of Allah.",
    features: [
      "Daily Name",
      "Audio pronunciation",
      "Meaning & reflection",
      "Memorization mode",
    ],
    statistic: "Learn all 99 Names at your own pace.",
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

const springTransition = { duration: 1.1, ease: [0.16, 1, 0.3, 1] };

// --- Custom Generative Animations for Each Topic ---
function PreviewVisuals({ title }) {
  switch (title) {
    case "Salah":
      // Prayer timeline filling up
      return (
        <div className="flex gap-3 sm:gap-6 items-end h-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-3 sm:w-4 rounded-t-full bg-stone-300 origin-bottom"
              animate={{
                height: ["20%", "100%", "20%"],
                backgroundColor: ["#e7e5e4", "#C6A26B", "#e7e5e4"],
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
      // Water ripple following a central point
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 rounded-full border-[1.5px] border-[#C6A26B]"
              animate={{ scale: [1, 6], opacity: [0.8, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut",
              }}
            />
          ))}
          <div className="w-3 h-3 bg-[#C6A26B] rounded-full shadow-[0_0_12px_rgba(198,162,107,0.8)]" />
        </div>
      );
    case "Adhan":
      // Expanding sound waves
      return (
        <div className="flex items-center justify-center gap-2 h-24">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 sm:w-2 bg-[#C6A26B] rounded-full"
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
      // Pages of a book gently turning
      return (
        <div className="relative w-24 h-32 sm:w-32 sm:h-40 perspective-[800px] flex">
          <div className="w-1/2 h-full bg-stone-200 rounded-l-md border-r border-stone-300 shadow-inner" />
          <div className="w-1/2 h-full bg-stone-100 rounded-r-md shadow-md" />
          <motion.div
            className="absolute right-0 w-1/2 h-full bg-white rounded-l-md origin-left shadow-lg border-l border-stone-100"
            animate={{ rotateY: [0, -180, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      );
    case "Ramadan":
      // Crescent moon with changing night sky
      return (
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-stone-900 overflow-hidden flex items-center justify-center shadow-2xl">
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
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-transparent shadow-[inset_-10px_-4px_0_2px_#C6A26B] sm:shadow-[inset_-14px_-6px_0_2px_#C6A26B]"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      );
    case "Zakat":
      // Coins flowing into helping hands
      return (
        <div className="relative w-32 h-40 flex flex-col items-center justify-end pb-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-[#C6A26B] rounded-full shadow-md"
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
          <div className="w-20 h-10 border-b-4 border-l-4 border-r-4 border-stone-400 rounded-b-full opacity-60" />
        </div>
      );
    case "Zakat Calculator":
      // Numbers counting up smoothly
      return (
        <div className="flex items-center text-4xl sm:text-6xl font-serif text-[#C6A26B] font-light overflow-hidden h-16 sm:h-20">
          <span>$</span>
          <motion.div
            animate={{ y: ["0%", "-80%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "circOut" }}
            className="flex flex-col ml-1"
          >
            {["0", "150", "430", "890", "1,250"].map((num, i) => (
              <span key={i} className="h-16 sm:h-20 flex items-center">
                {num}
              </span>
            ))}
          </motion.div>
        </div>
      );
    case "Names of Allah":
      // Arabic calligraphy softly appearing and blurring
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
          <span className="text-6xl sm:text-8xl text-[#C6A26B] font-arabic drop-shadow-lg">
            الرَّحْمَٰن
          </span>
        </motion.div>
      );
    case "Islamic History":
      // Timeline drawing itself
      return (
        <div className="relative w-64 h-1 bg-stone-300 rounded-full flex items-center">
          <motion.div
            className="absolute left-0 h-full bg-[#C6A26B] rounded-full"
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {[20, 50, 80].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white border-2 border-[#C6A26B] rounded-full"
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
      // Arabic words morphing to English
      return (
        <div className="relative flex items-center justify-center w-full h-24 text-3xl sm:text-5xl font-serif text-[#C6A26B]">
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

// --- Wheel Node Component ---
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
      className="absolute inset-0 pointer-events-none flex justify-center"
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
          className="group relative flex flex-col items-center justify-center p-2 sm:p-4 cursor-pointer focus:outline-none touch-manipulation"
        >
          <div
            className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full mb-2 sm:mb-3 transition-all duration-700 ${
              isActive && isOpened
                ? "bg-[#C6A26B] scale-150 shadow-[0_0_24px_rgba(198,162,107,0.8)]"
                : isActive
                  ? "bg-[#C6A26B] scale-125 shadow-[0_0_12px_rgba(198,162,107,0.6)]"
                  : "bg-stone-300 group-hover:bg-stone-400 group-hover:scale-110"
            }`}
          />
          <span
            className={`font-serif tracking-wide transition-all duration-700 whitespace-nowrap ${
              isActive
                ? "text-base sm:text-xl text-[#C6A26B] font-medium"
                : "text-[11px] sm:text-base text-stone-400 group-hover:text-stone-700"
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
export default function Academy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const [isLocked, setIsLocked] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const hoverTimer = useRef(null);
  const isSpinning = useRef(false);

  const N = topics.length;
  const anglePerItem = 360 / N;
  const wheelRotation = useSpring(0, { stiffness: 45, damping: 15, mass: 1.1 });

  useEffect(() => {
    wheelRotation.set(-activeIndex * anglePerItem);
  }, [activeIndex, anglePerItem, wheelRotation]);

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
      setSelectedTopic(topics[index]);
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
        className="relative min-h-[100vh] bg-[#F7F5F1] overflow-hidden flex flex-col items-center justify-center font-sans py-20 sm:py-24"
      >
        <motion.div
          animate={{ opacity: isOverlayOpen ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-10 sm:top-16 text-center z-20"
        >
          <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] uppercase text-stone-400 mb-4">
            03 — The Academy
          </p>
        </motion.div>

        {/* Center Content Display */}
        <div className="absolute z-30 flex flex-col items-center justify-center w-full max-w-[240px] sm:max-w-md text-center pointer-events-none mt-8 sm:mt-12">
          <AnimatePresence>
            {!isOverlayOpen && (
              <motion.div
                key="wheel-center-wrapper"
                className="flex flex-col items-center pointer-events-auto"
              >
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
                    className="flex flex-col items-center"
                  >
                    <span
                      className="font-arabic text-4xl sm:text-6xl lg:text-7xl text-stone-300/80 mb-3 sm:mb-6 leading-none"
                      dir="rtl"
                    >
                      {topics[activeIndex].arabic}
                    </span>

                    <motion.h2
                      layoutId={`title-${topics[activeIndex].title}`}
                      className="font-serif text-2xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight leading-none mb-3 sm:mb-6"
                    >
                      {topics[activeIndex].title}
                    </motion.h2>

                    <motion.p
                      layoutId={`desc-${topics[activeIndex].title}`}
                      className="font-serif text-sm sm:text-lg italic font-light text-stone-600 leading-relaxed"
                    >
                      {topics[activeIndex].sentence}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* The Giant Rotating Wheel */}
        <motion.div
          className={`relative flex items-center justify-center w-[90vw] h-[90vw] max-w-[360px] max-h-[360px] sm:max-w-none sm:max-h-none sm:w-[650px] sm:h-[650px] lg:w-[850px] lg:h-[850px] rounded-full border border-stone-200/70 mt-12 sm:mt-24 z-10 ${
            isLocked ? "pointer-events-none" : ""
          }`}
          style={{ rotate: wheelRotation }}
        >
          <motion.div
            animate={{ opacity: isOverlayOpen ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <div className="absolute inset-6 sm:inset-12 rounded-full border-[0.5px] border-stone-200/50" />
            <div className="absolute inset-12 sm:inset-24 rounded-full border border-stone-200/40 border-dashed" />
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

        {/* Full Screen Course Page Overlay */}
        <AnimatePresence>
          {isOverlayOpen && (
            <div className="fixed inset-0 z-[99999] overflow-y-auto overflow-x-hidden">
              {/* Expanding Background Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 35 }}
                exit={{ scale: 0 }}
                transition={springTransition}
                className="fixed top-1/2 left-1/2 w-48 h-48 bg-[#FAFAFA] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ zIndex: -1 }}
              />

              {/* Fixed Back Button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
                transition={{ delay: 0.3, duration: 0.6 }}
                onClick={closeModule}
                className="fixed top-8 left-6 sm:top-12 sm:left-12 z-50 text-stone-400 hover:text-stone-800 tracking-widest uppercase text-[10px] sm:text-xs font-semibold py-2 transition-colors cursor-pointer pointer-events-auto"
              >
                ← Back to Academy
              </motion.button>

              {/* Scrollable Content Container */}
              <div className="relative z-10 min-h-screen w-full max-w-4xl mx-auto px-6 pt-32 sm:pt-40 pb-32 flex flex-col items-center">
                {/* Shared Elements Morphing */}
                <motion.h1
                  layoutId={`title-${selectedTopic.title}`}
                  transition={springTransition}
                  className="font-serif text-5xl sm:text-7xl lg:text-8xl text-[#C6A26B] tracking-tight leading-none mb-6 text-center"
                >
                  {selectedTopic.title}
                </motion.h1>

                <motion.p
                  layoutId={`desc-${selectedTopic.title}`}
                  transition={springTransition}
                  className="font-serif text-lg sm:text-2xl italic font-light text-stone-600 max-w-xl mx-auto text-center leading-relaxed"
                >
                  {selectedTopic.sentence}
                </motion.p>

                {/* Course Content */}
                <div className="mt-16 sm:mt-24 w-full border-t border-stone-200/60 pt-16 sm:pt-20 flex flex-col items-center pointer-events-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mb-16 sm:mb-24 px-4"
                  >
                    <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-6">
                      {selectedTopic.subtitle}
                    </h3>
                    <p className="text-stone-600 font-light text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                      {selectedTopic.intro}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-full max-w-3xl mb-16 sm:mb-24"
                  >
                    <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-8 text-center font-semibold">
                      Inside Tawfiq
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {selectedTopic.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-stone-200/60 p-6 rounded-2xl text-center shadow-sm"
                        >
                          <p className="text-stone-800 font-light text-lg">
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
                    className="w-full h-64 sm:h-96 bg-gradient-to-br from-stone-100 to-[#F7F5F1] rounded-3xl flex items-center justify-center mb-16 sm:mb-24 border border-stone-200/50 shadow-inner overflow-hidden relative"
                  >
                    <PreviewVisuals title={selectedTopic.title} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mb-16 sm:mb-24 max-w-2xl px-4"
                  >
                    <div className="w-12 h-[1px] bg-[#C6A26B] mx-auto mb-8" />
                    <p className="text-2xl sm:text-3xl font-serif text-stone-800 font-light italic leading-relaxed">
                      "{selectedTopic.statistic}"
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="pb-12"
                  >
                    <button className="bg-stone-900 text-stone-100 px-10 py-4 rounded-full text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#C6A26B] hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
                      Open Tawfiq
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
