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
  },
  {
    title: "Wudu",
    arabic: "الوضوء",
    sentence: "Purification of the body, a quiet preparation of the heart.",
  },
  {
    title: "Adhan",
    arabic: "الأذان",
    sentence:
      "The call that has gathered hearts to prayer for fourteen centuries.",
  },
  {
    title: "Hadith",
    arabic: "الحديث",
    sentence:
      "The preserved words of the Prophet ﷺ, a living guide after the Book.",
  },
  {
    title: "Ramadan",
    arabic: "رمضان",
    sentence: "The month of restraint, revelation, and return.",
  },
  {
    title: "Zakat",
    arabic: "الزكاة",
    sentence: "A portion given, a wealth purified, a community held.",
  },
  {
    title: "Zakat Calculator",
    arabic: "حاسبة الزكاة",
    sentence: "Know what is due, with clarity and ease.",
  },
  {
    title: "Names of Allah",
    arabic: "أسماء الله الحسنى",
    sentence: "Ninety-nine doors of knowing the One who knows you.",
  },
  {
    title: "Islamic History",
    arabic: "التاريخ الإسلامي",
    sentence: "The story of a faith that shaped civilizations.",
  },
  {
    title: "Learn Arabic",
    arabic: "تعلم العربية",
    sentence: "The language of revelation, learned one word at a time.",
  },
];

const springTransition = { duration: 1.1, ease: [0.16, 1, 0.3, 1] };

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

export default function Academy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // NEW: Precise locks to prevent animation collisions
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
    // If the wheel is locked during an open/close transition, ignore all hovers
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
      setIsLocked(true); // Lock the wheel interactions immediately
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

    setIsReturning(true); // Tells the wheel text to bypass its fade-in animation
    setIsOverlayOpen(false); // Trigger the close

    // Wait for the spring animation to fully settle (1.1s) before unlocking
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
        {/* Background Hint / Academy Title */}
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
                    // CRITICAL FIX: If returning from overlay, skip the opacity 0 state so the layoutId can morph visibly!
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
          // Disable pointer events entirely when locked to prevent rogue hovers
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
            // Elevated to z-[99999] so it safely covers global headers and floating players
            <div className="fixed inset-0 z-[99999] overflow-y-auto">
              {/* The Expanding Circle - Moved inside the fixed overlay to cover the whole site */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 35 }}
                exit={{ scale: 0 }}
                transition={springTransition}
                className="fixed top-1/2 left-1/2 w-48 h-48 bg-[#FAFAFA] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ zIndex: -1 }} // Keeps the circle behind the text
              />

              {/* Scrollable Content Container */}
              <div className="relative z-10 min-h-screen w-full max-w-3xl mx-auto px-6 pt-12 sm:pt-16 pb-32 flex flex-col items-center">
                {/* Back button safely in the DOM flow, clearing headers */}
                <div className="w-full flex justify-start mb-16 sm:mb-24">
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10, transition: { duration: 0.3 } }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    onClick={closeModule}
                    className="text-stone-400 hover:text-stone-800 tracking-widest uppercase text-xs font-semibold py-2 transition-colors cursor-pointer"
                  >
                    ← Back to Academy
                  </motion.button>
                </div>

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

                {/* Rest of the Course Page Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-16 sm:mt-24 w-full border-t border-stone-200 pt-12 flex flex-col gap-8"
                >
                  <div className="flex justify-between items-center text-sm tracking-widest uppercase text-stone-400">
                    <span>Course Module 0{activeIndex + 1}</span>
                    <span>4 Lessons • 45 Min</span>
                  </div>
                  <p className="text-stone-700 leading-loose text-justify font-light">
                    This is where the expansive course content for{" "}
                    {selectedTopic.title} begins. The overlay now floats at the
                    highest possible level in the browser to cover global
                    navigation headers, and the reverse shared-element layout
                    transition is fully protected against accidental mouse
                    hovers.
                  </p>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
}
