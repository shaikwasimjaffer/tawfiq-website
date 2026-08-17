import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Helper function to determine the dynamic greeting based on context
function getDynamicGreeting() {
  const now = new Date();
  const hours = now.getHours();
  const dayOfWeek = now.getDay(); // 5 is Friday

  // Example Check for Friday (Day 5)
  if (dayOfWeek === 5) {
    return {
      arabic: "جُمُعَة مُبَارَكَة",
      english: "Blessed Friday.",
    };
  }

  // Morning vs Evening check (Morning: 4 AM - 4 PM, Evening: 4 PM - 4 AM)
  if (hours >= 4 && hours < 16) {
    return {
      arabic: "السَّلَامُ عَلَيْكُمْ",
      english: "Peace be upon you.",
    };
  } else {
    return {
      arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ",
      english: "May peace and the mercy of Allah be upon you.",
    };
  }
}

export default function Hero() {
  const containerRef = useRef(null);

  // Memoize the greeting so it doesn't recalculate on every render scroll frame
  const greeting = useMemo(() => getDynamicGreeting(), []);

  // 1200vh timeline provides clean, unhurried pacing across 7 cinematic stages
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- 1. BACKGROUND & LIGHT BEAM (0% -> 30%) ---
  const floorOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.3],
    [0.35, 0.35, 0],
  );
  const lightBeamOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.32],
    [0.85, 0.85, 0],
  );
  const floorScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  // --- 0. STAGE 0: DYNAMIC ISLAMIC WELCOME (0% -> 10%) ---
  const welcomeOpacity = useTransform(
    scrollYProgress,
    [0, 0.07, 0.1],
    [1, 1, 0],
  );
  const welcomeY = useTransform(scrollYProgress, [0, 0.07, 0.1], [0, 0, -20]);
  const welcomeScale = useTransform(scrollYProgress, [0, 0.08], [1, 1.02]);

  // --- 2. STAGE 1: HERO HEADLINE (11% -> 22%) ---
  const heroText1Opacity = useTransform(
    scrollYProgress,
    [0.11, 0.14, 0.19, 0.22],
    [0, 1, 1, 0],
  );
  const heroText1Y = useTransform(
    scrollYProgress,
    [0.11, 0.14, 0.19, 0.22],
    [20, 0, 0, -25],
  );
  const heroText2Opacity = useTransform(
    scrollYProgress,
    [0.12, 0.15, 0.19, 0.22],
    [0, 1, 1, 0],
  );
  const heroText2Y = useTransform(
    scrollYProgress,
    [0.12, 0.15, 0.19, 0.22],
    [20, 0, 0, -25],
  );

  // --- 3. STAGE 2: "No matter how many prayers you've missed..." (24% -> 36%) ---
  const missedText1Opacity = useTransform(
    scrollYProgress,
    [0.24, 0.27, 0.33, 0.36],
    [0, 1, 1, 0],
  );
  const missedText1Y = useTransform(
    scrollYProgress,
    [0.24, 0.27, 0.33, 0.36],
    [30, 0, 0, -20],
  );
  const missedText2Opacity = useTransform(
    scrollYProgress,
    [0.25, 0.28, 0.33, 0.36],
    [0, 1, 1, 0],
  );
  const missedText2Y = useTransform(
    scrollYProgress,
    [0.25, 0.28, 0.33, 0.36],
    [30, 0, 0, -20],
  );

  // --- 4. STAGE 3: "The next one still matters." (38% -> 54%) ---
  const nextOneOpacity = useTransform(
    scrollYProgress,
    [0.38, 0.42, 0.5, 0.54],
    [0, 1, 1, 0],
  );
  const nextOneY = useTransform(
    scrollYProgress,
    [0.38, 0.42, 0.5, 0.54],
    [40, 0, 0, -30],
  );
  const nextOneScale = useTransform(scrollYProgress, [0.38, 0.45], [0.92, 1]);
  const nextOneRevealMask = useTransform(
    scrollYProgress,
    [0.41, 0.48],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  // --- 5. STAGE 4A: "It's never too late to Return" (56% -> 69%) ---
  const changeText1Opacity = useTransform(
    scrollYProgress,
    [0.56, 0.59, 0.66, 0.69],
    [0, 1, 1, 0],
  );
  const changeText1Y = useTransform(
    scrollYProgress,
    [0.56, 0.59, 0.66, 0.69],
    [30, 0, 0, -30],
  );
  const changeText2Opacity = useTransform(
    scrollYProgress,
    [0.57, 0.6, 0.66, 0.69],
    [0, 1, 1, 0],
  );
  const changeText2Y = useTransform(
    scrollYProgress,
    [0.57, 0.6, 0.66, 0.69],
    [30, 0, 0, -30],
  );

  // --- 6. STAGE 4B: "That's why we built Tawfiq." (71% -> 82%) ---
  const builtText1Opacity = useTransform(
    scrollYProgress,
    [0.71, 0.74, 0.79, 0.82],
    [0, 1, 1, 0],
  );
  const builtText1Y = useTransform(
    scrollYProgress,
    [0.71, 0.74, 0.79, 0.82],
    [30, 0, 0, -30],
  );
  const builtText2Opacity = useTransform(
    scrollYProgress,
    [0.72, 0.75, 0.79, 0.82],
    [0, 1, 1, 0],
  );
  const builtText2Y = useTransform(
    scrollYProgress,
    [0.72, 0.75, 0.79, 0.82],
    [30, 0, 0, -30],
  );

  // --- 7. STAGE 5: ARABIC BISMILLAH (84% -> 94%) ---
  const bismillahOpacity = useTransform(
    scrollYProgress,
    [0.84, 0.87, 0.92, 0.94],
    [0, 1, 1, 0],
  );
  const bismillahScale = useTransform(
    scrollYProgress,
    [0.84, 0.89, 0.94],
    [0.94, 1, 1.03],
  );
  const englishOpacity = useTransform(scrollYProgress, [0.86, 0.89], [0, 1]);
  const englishY = useTransform(scrollYProgress, [0.86, 0.89], [30, 0]);

  // --- 8. STAGE 6: GRAND FINALE "INTRODUCING TAWFIQ." (95% -> 100%) ---
  const introOpacity = useTransform(
    scrollYProgress,
    [0.95, 0.98, 1],
    [0, 1, 1],
  );
  const introY = useTransform(scrollYProgress, [0.95, 0.98, 1], [20, 0, 0]);
  const tawfiqOpacity = useTransform(
    scrollYProgress,
    [0.96, 0.99, 1],
    [0, 1, 1],
  );
  const tawfiqY = useTransform(scrollYProgress, [0.96, 0.99, 1], [30, 0, 0]);
  const finaleScale = useTransform(
    scrollYProgress,
    [0.95, 0.98, 1],
    [0.95, 1, 1.02],
  );

  // Predefined particle configurations for subtle background drifting
  const particles = useMemo(
    () => [
      { id: 1, size: 4, x: "15%", delay: 0, duration: 14 },
      { id: 2, size: 6, x: "35%", delay: 3, duration: 18 },
      { id: 3, size: 3, x: "55%", delay: 1, duration: 16 },
      { id: 4, size: 5, x: "75%", delay: 5, duration: 20 },
      { id: 5, size: 4, x: "85%", delay: 2, duration: 15 },
      { id: 6, size: 3, x: "25%", delay: 4, duration: 19 },
    ],
    [],
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[1200vh] bg-[#F0FDF4] font-['Geist',sans-serif]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none"
      >
        {/* --- DYNAMIC BACKGROUNDS & PARTICLES --- */}
        <motion.div
          style={{ opacity: lightBeamOpacity }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          {/* Slowly breathing/shifting gradient background */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(220, 252, 231, 0.5) 0%, rgba(240, 253, 244, 0) 70%), radial-gradient(ellipse 90% 70% at 20% 20%, rgba(187, 247, 208, 0.4) 0%, rgba(240, 253, 244, 0) 80%)",
              backgroundSize: "200% 200%",
            }}
          />

          {/* Faint Floating Particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-green-400/30 blur-[1px]"
              style={{
                width: p.size,
                height: p.size,
                left: p.x,
                bottom: "-10%",
              }}
              animate={{
                y: ["0vh", "-110vh"],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>

        <motion.div
          style={{ opacity: floorOpacity, scale: floorScale }}
          className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden"
        >
          <svg
            viewBox="0 0 1200 800"
            className="w-full h-full max-w-[1600px] text-green-300 fill-current"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="stoneFloor"
                x="0"
                y="0"
                width="200"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  width="200"
                  height="100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  className="opacity-25"
                />
                <line
                  x1="100"
                  y1="0"
                  x2="100"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="opacity-15"
                />
              </pattern>
            </defs>
            <rect width="1200" height="800" fill="url(#stoneFloor)" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/10 via-transparent to-transparent" />
        </motion.div>

        {/* Minimal Grid Overlay */}
        <div className="absolute inset-0 flex justify-center opacity-[0.025] z-0">
          <div className="w-full max-w-[1400px] grid grid-cols-6 h-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="border-r border-green-950 h-full last:border-r-0"
              />
            ))}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* STAGE 0: DYNAMIC ISLAMIC WELCOME (WITH PREMIUM HOVER) */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: welcomeOpacity, y: welcomeY, scale: welcomeScale }}
          className="absolute z-10 w-full px-6 text-center flex flex-col items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.0, filter: "brightness(1.03)" }}
            initial={{ scale: 0.98, filter: "brightness(1.0)" }}
            animate={{ scale: 1.0, filter: "brightness(1.0)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="cursor-pointer inline-block pointer-events-auto px-4 py-2"
          >
            {/* Dynamic Arabic text */}
            <h2
              dir="rtl"
              className="font-serif text-[3.2rem] sm:text-[5.5rem] md:text-[7.2rem] lg:text-[8.5rem] text-green-950 font-normal tracking-wide leading-none select-none drop-shadow-sm transition-all duration-300"
            >
              {greeting.arabic}
            </h2>

            {/* Dynamic English translation */}
            <p className="mt-4 sm:mt-6 font-['Newsreader',serif] font-light italic text-xl sm:text-3xl md:text-4xl text-green-800/80 tracking-wider transition-all duration-300">
              {greeting.english}
            </p>
          </motion.div>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 1: HERO HEADLINE */}
        {/* ==================================================================== */}
        <div className="absolute z-10 w-full px-4 text-center flex flex-col items-center">
          <h1 className="font-['Newsreader',serif] font-light text-[2.1rem] xs:text-[2.5rem] sm:text-[5.2rem] md:text-[6.8rem] lg:text-[8rem] leading-[1.2] sm:leading-[0.92] tracking-[-0.02em] text-green-950">
            <motion.span
              style={{ opacity: heroText1Opacity, y: heroText1Y }}
              className="block text-green-950 whitespace-nowrap"
            >
              How long has it been
            </motion.span>
            <motion.span
              style={{ opacity: heroText2Opacity, y: heroText2Y }}
              className="block text-green-950 mt-1 sm:mt-2 whitespace-nowrap"
            >
              since your{" "}
              <span className="inline-block italic font-normal text-[#16A34A]">
                last prayer?
              </span>
            </motion.span>
          </h1>
        </div>

        {/* ==================================================================== */}
        {/* STAGE 2: "No matter how many prayers you've missed..." */}
        {/* ==================================================================== */}
        <div className="absolute z-10 max-w-5xl w-full px-6 text-center flex flex-col items-center">
          <h2 className="font-['Newsreader',serif] font-light text-[2.1rem] xs:text-[2.5rem] sm:text-[5.2rem] md:text-[6.8rem] lg:text-[8rem] leading-[1.2] sm:leading-[0.92] tracking-[-0.02em] text-green-950">
            <motion.span
              style={{ opacity: missedText1Opacity, y: missedText1Y }}
              className="block text-green-950 whitespace-nowrap"
            >
              No matter how many
            </motion.span>
            <motion.span
              style={{ opacity: missedText2Opacity, y: missedText2Y }}
              className="block text-green-950 mt-1 sm:mt-2 whitespace-nowrap"
            >
              prayers you've{" "}
              <span className="inline-block italic font-normal text-[#16A34A]">
                missed.
              </span>
            </motion.span>
          </h2>
        </div>

        {/* ==================================================================== */}
        {/* STAGE 3: "The next one still matters." */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: nextOneOpacity, y: nextOneY, scale: nextOneScale }}
          className="absolute z-10 max-w-6xl w-full px-6 text-center"
        >
          <h2 className="font-['Newsreader',serif] font-light italic text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-[#16A34A] tracking-[-0.02em] leading-[1.1]">
            <motion.span
              style={{ clipPath: nextOneRevealMask }}
              className="inline-block"
            >
              The next one still matters.
            </motion.span>
          </h2>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 4A: "It's never too late to Return" */}
        {/* ==================================================================== */}
        <div className="absolute z-20 max-w-5xl w-full px-6 text-center flex flex-col items-center">
          <h2 className="font-['Newsreader',serif] font-light text-[2.1rem] xs:text-[2.5rem] sm:text-[5.2rem] md:text-[6.8rem] lg:text-[8rem] leading-[1.2] sm:leading-[0.92] tracking-[-0.02em] text-green-950">
            <motion.span
              style={{ opacity: changeText1Opacity, y: changeText1Y }}
              className="block text-green-950 whitespace-nowrap"
            >
              It's never too late to
            </motion.span>
            <motion.span
              style={{ opacity: changeText2Opacity, y: changeText2Y }}
              className="block mt-1 sm:mt-2 whitespace-nowrap italic font-normal text-[#16A34A]"
            >
              Return
            </motion.span>
          </h2>
        </div>

        {/* ==================================================================== */}
        {/* STAGE 4B: "That's why we built Tawfiq." */}
        {/* ==================================================================== */}
        <div className="absolute z-20 max-w-5xl w-full px-6 text-center flex flex-col items-center">
          <h2 className="font-['Newsreader',serif] font-light text-[2.1rem] xs:text-[2.5rem] sm:text-[5.2rem] md:text-[6.8rem] lg:text-[8rem] leading-[1.2] sm:leading-[0.92] tracking-[-0.02em] text-green-950">
            <motion.span
              style={{ opacity: builtText1Opacity, y: builtText1Y }}
              className="block text-green-950 whitespace-nowrap"
            >
              That's why we built
            </motion.span>
            <motion.span
              style={{ opacity: builtText2Opacity, y: builtText2Y }}
              className="block mt-1 sm:mt-2 whitespace-nowrap italic font-medium text-[#16A34A]"
            >
              Tawfiq.
            </motion.span>
          </h2>
        </div>

        {/* ==================================================================== */}
        {/* STAGE 5: ARABIC BISMILLAH (WITH PREMIUM HOVER) */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: bismillahOpacity, scale: bismillahScale }}
          className="absolute z-30 text-center px-6 max-w-[100vw] overflow-hidden flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.0, filter: "brightness(1.03)" }}
            initial={{ scale: 0.98, filter: "brightness(1.0)" }}
            animate={{ scale: 1.0, filter: "brightness(1.0)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="cursor-pointer inline-block pointer-events-auto px-4 py-2"
          >
            <h2
              dir="rtl"
              className="font-serif text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] text-green-950 font-normal tracking-normal leading-none select-none transition-all duration-300"
            >
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
            </h2>
            <motion.div
              style={{ opacity: englishOpacity, y: englishY }}
              className="flex flex-col items-center"
            >
              <p className="mt-3 sm:mt-6 inline-block font-['Newsreader',serif] font-light italic text-3xl sm:text-4xl md:text-5xl text-[#16A34A] tracking-wide transition-all duration-300">
                In the name of Allah, the Most Gracious, the Most Merciful.
              </p>
              <span className="mt-6 sm:mt-8 block font-['Geist',sans-serif] text-[10px] sm:text-[12px] uppercase tracking-[0.35em] text-green-600 font-medium">
                Every meaningful journey begins here.
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 6: GRAND FINALE "INTRODUCING TAWFIQ." */}
        {/* ==================================================================== */}
        <motion.div
          style={{ scale: finaleScale }}
          className="absolute z-35 text-center px-6 max-w-[100vw] overflow-visible"
        >
          <h2 className="font-['Newsreader',serif] font-light text-[3.5rem] xs:text-[4rem] sm:text-[6.5rem] md:text-[8.5rem] lg:text-[10rem] text-green-950 tracking-[-0.02em] leading-[1.15] select-none flex flex-wrap justify-center gap-x-4 sm:gap-x-8">
            <motion.span
              style={{ opacity: introOpacity, y: introY }}
              className="block sm:inline-block"
            >
              Introducing
            </motion.span>
            <motion.span
              style={{ opacity: tawfiqOpacity, y: tawfiqY }}
              className="italic font-normal text-[#16A34A] block sm:inline-block"
            >
              Tawfiq.
            </motion.span>
          </h2>
        </motion.div>
      </motion.div>
    </section>
  );
}

