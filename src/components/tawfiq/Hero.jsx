import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef(null);

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

  // --- 0. STAGE 0: ISLAMIC WELCOME "ASSALAMU ALAIKUM" (0% -> 10%) ---
  // Starts at 1 opacity so it's immediately visible at 0 scroll position
  const welcomeOpacity = useTransform(
    scrollYProgress,
    [0, 0.07, 0.1],
    [1, 1, 0],
  );
  const welcomeY = useTransform(scrollYProgress, [0, 0.07, 0.1], [0, 0, -20]);
  const welcomeScale = useTransform(scrollYProgress, [0, 0.08], [1, 1.02]);

  // --- 2. STAGE 1: HERO HEADLINE (11% -> 22%) ---
  const heroTextOpacity = useTransform(
    scrollYProgress,
    [0.11, 0.14, 0.19, 0.22],
    [0, 1, 1, 0],
  );
  const heroTextY = useTransform(
    scrollYProgress,
    [0.11, 0.14, 0.19, 0.22],
    [20, 0, 0, -25],
  );

  // --- 3. STAGE 2: "No matter how many prayers you've missed..." (24% -> 36%) ---
  const missedTextOpacity = useTransform(
    scrollYProgress,
    [0.24, 0.27, 0.33, 0.36],
    [0, 1, 1, 0],
  );
  const missedTextY = useTransform(
    scrollYProgress,
    [0.24, 0.27, 0.33, 0.36],
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

  // --- 5. STAGE 4A: "Change doesn't begin tomorrow..." (56% -> 69%) ---
  const changeTextOpacity = useTransform(
    scrollYProgress,
    [0.56, 0.6, 0.66, 0.69],
    [0, 1, 1, 0],
  );
  const changeTextY = useTransform(
    scrollYProgress,
    [0.56, 0.6, 0.66, 0.69],
    [30, 0, 0, -30],
  );

  // --- 6. STAGE 4B: "That's why we built Tawfiq." (71% -> 82%) ---
  const builtTextOpacity = useTransform(
    scrollYProgress,
    [0.71, 0.74, 0.79, 0.82],
    [0, 1, 1, 0],
  );
  const builtTextY = useTransform(
    scrollYProgress,
    [0.71, 0.74, 0.79, 0.82],
    [30, 0, 0, -30],
  );

  // --- 7. STAGE 5: ARABIC BISMILLAH (84% -> 94%) ---
  const bismillahTransMask = useTransform(
    scrollYProgress,
    [0.86, 0.9],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

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

  // --- 8. STAGE 6: GRAND FINALE "INTRODUCING TAWFIQ." (95% -> 100%) ---
  const introTawfiqOpacity = useTransform(
    scrollYProgress,
    [0.95, 0.98, 1],
    [0, 1, 1],
  );
  const introTawfiqScale = useTransform(
    scrollYProgress,
    [0.95, 0.98, 1],
    [0.95, 1, 1.02],
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[1200vh] bg-[#F0FDF4] font-['Geist',sans-serif]"
    >
      {/* Sticky Fullscreen Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        {/* --- MORNING SUNLIGHT BEAM & LONG SHADOWS --- */}
        <motion.div
          style={{ opacity: lightBeamOpacity }}
          className="absolute inset-0 z-0"
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(220, 252, 231, 0.45) 0%, rgba(240, 253, 244, 0) 70%), radial-gradient(ellipse 80% 60% at 20% 10%, rgba(187, 247, 208, 0.35) 0%, rgba(240, 253, 244, 0) 75%)",
            }}
          />
        </motion.div>

        {/* --- POLISHED STONE FLOOR TEXTURE & TILES --- */}
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
        {/* STAGE 0: ISLAMIC WELCOME ("ASSALAMU ALAIKUM") */}
        {/* ==================================================================== */}
        <motion.div
          style={{
            opacity: welcomeOpacity,
            y: welcomeY,
            scale: welcomeScale,
          }}
          className="absolute z-10 w-full px-6 text-center flex flex-col items-center justify-center"
        >
          <h2
            dir="rtl"
            className="font-serif text-[3.2rem] sm:text-[5.5rem] md:text-[7.2rem] lg:text-[8.5rem] text-green-950 font-normal tracking-wide leading-none select-none drop-shadow-sm"
          >
            السَّلَامُ عَلَيْكُمْ
          </h2>

          <p className="mt-4 sm:mt-6 font-['Newsreader',serif] font-light italic text-xl sm:text-3xl md:text-4xl text-green-800/80 tracking-wider">
            Peace be upon you.
          </p>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 1: HERO HEADLINE */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: heroTextOpacity, y: heroTextY }}
          className="absolute z-10 w-full px-4 text-center flex flex-col items-center"
        >
          <h1 className="font-['Newsreader',serif] font-light text-[2.1rem] xs:text-[2.5rem] sm:text-[5.2rem] md:text-[6.8rem] lg:text-[8rem] leading-[1.2] sm:leading-[0.92] tracking-[-0.02em] text-green-950">
            <span className="block text-green-950 whitespace-nowrap sm:whitespace-normal">
              How long has it been
            </span>
            <span className="block text-green-950 mt-1 sm:mt-2 whitespace-nowrap sm:whitespace-normal">
              since your{" "}
              <span className="inline-block italic font-normal text-[#16A34A]">
                last prayer?
              </span>
            </span>
          </h1>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 2: "No matter how many prayers you've missed..." */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: missedTextOpacity, y: missedTextY }}
          className="absolute z-10 max-w-5xl w-full px-6 text-center"
        >
          <h2 className="font-['Newsreader',serif] font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-green-950 leading-[1.15] tracking-[-0.01em]">
            No matter how many prayers you've missed.
          </h2>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 3: "The next one still matters." */}
        {/* ==================================================================== */}
        <motion.div
          style={{
            opacity: nextOneOpacity,
            y: nextOneY,
            scale: nextOneScale,
          }}
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
        {/* STAGE 4A: "Change doesn't begin tomorrow..." */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: changeTextOpacity, y: changeTextY }}
          className="absolute z-20 max-w-5xl w-full px-6 text-center"
        >
          <h2 className="font-['Newsreader',serif] font-light text-[clamp(2.75rem,6vw,8rem)] text-green-950 leading-[1.15] tracking-[-0.01em]">
            It's never too late to
            <br />
            <span className="italic font-normal text-[#16A34A]">Return</span>
          </h2>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 4B: "That's why we built Tawfiq." */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: builtTextOpacity, y: builtTextY }}
          className="absolute z-20 max-w-5xl w-full px-6 text-center"
        >
          <h2 className="font-['Newsreader',serif] font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-green-950 leading-[1.15] tracking-[-0.01em]">
            That's why we built{" "}
            <span className="italic font-medium text-[#16A34A]">Tawfiq.</span>
          </h2>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 5: ARABIC BISMILLAH HERO */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: bismillahOpacity, scale: bismillahScale }}
          className="absolute z-30 text-center px-6 max-w-[100vw] overflow-hidden flex flex-col items-center"
        >
          <h2
            dir="rtl"
            className="font-serif text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] text-green-950 font-normal tracking-normal leading-none select-none"
          >
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
          </h2>

          <div className="mt-3 sm:mt-6 overflow-hidden">
            <motion.p
              style={{ clipPath: bismillahTransMask }}
              className="inline-block font-['Newsreader',serif] font-light italic text-3xl sm:text-4xl md:text-5xl text-[#16A34A] tracking-wide"
            >
              In the name of Allah, the Most Gracious, the Most Merciful.
            </motion.p>
          </div>

          <span className="mt-6 sm:mt-8 block font-['Geist',sans-serif] text-[10px] sm:text-[12px] uppercase tracking-[0.35em] text-green-600 font-medium">
            Every meaningful journey begins here.
          </span>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 6: GRAND FINALE "INTRODUCING TAWFIQ." */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: introTawfiqOpacity, scale: introTawfiqScale }}
          className="absolute z-35 text-center px-6 max-w-[100vw] overflow-visible"
        >
          <h2 className="font-['Newsreader',serif] font-light text-[3.5rem] xs:text-[4rem] sm:text-[6.5rem] md:text-[8.5rem] lg:text-[10rem] text-green-950 tracking-[-0.02em] leading-[1.15] select-none sm:whitespace-nowrap">
            Introducing{" "}
            <span className="italic font-normal text-[#16A34A]">Tawfiq.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
