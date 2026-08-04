import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef(null);

  // 1100vh timeline provides clean spacing for 6 distinct cinematic stages
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- 1. BACKGROUND & LIGHT BEAM (0% -> 25%) ---
  const floorOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25],
    [0.35, 0.35, 0],
  );
  const lightBeamOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.28],
    [0.85, 0.85, 0],
  );
  const floorScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.05]);

  // --- 2. STAGE 1: HERO HEADLINE (0% -> 15%) ---
  const heroTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.15],
    [1, 1, 0],
  );
  const heroTextY = useTransform(scrollYProgress, [0, 0.15], [0, -30]);

  // --- 3. STAGE 2: "No matter how many prayers you've missed..." (18% -> 35%) ---
  const missedTextOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.22, 0.31, 0.35],
    [0, 1, 1, 0],
  );
  const missedTextY = useTransform(
    scrollYProgress,
    [0.18, 0.22, 0.31, 0.35],
    [30, 0, 0, -20],
  );

  // --- 4. STAGE 3: "The next one still matters." (Standalone Big Text) (38% -> 55%) ---
  const nextOneOpacity = useTransform(
    scrollYProgress,
    [0.38, 0.43, 0.51, 0.55],
    [0, 1, 1, 0],
  );
  const nextOneY = useTransform(
    scrollYProgress,
    [0.38, 0.43, 0.51, 0.55],
    [40, 0, 0, -30],
  );
  const nextOneScale = useTransform(scrollYProgress, [0.38, 0.45], [0.92, 1]);
  const nextOneRevealMask = useTransform(
    scrollYProgress,
    [0.41, 0.48],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  // --- 5. STAGE 4: BEFORE / AFTER SPLIT SCREEN (58% -> 83%) ---
  const splitScreenOpacity = useTransform(
    scrollYProgress,
    [0.58, 0.62, 0.79, 0.83],
    [0, 1, 1, 0],
  );
  const splitScreenY = useTransform(
    scrollYProgress,
    [0.58, 0.62, 0.79, 0.83],
    [40, 0, 0, -40],
  );

  // Staggered left-to-right arrow reveal masks
  const arrowMask1 = useTransform(
    scrollYProgress,
    [0.61, 0.66],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const arrowMask2 = useTransform(
    scrollYProgress,
    [0.64, 0.69],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const arrowMask3 = useTransform(
    scrollYProgress,
    [0.67, 0.72],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const arrowMasks = [arrowMask1, arrowMask2, arrowMask3];

  // Subtle left-to-right translation to enhance the arrow shooting effect
  const arrowX1 = useTransform(scrollYProgress, [0.61, 0.66], [-20, 0]);
  const arrowX2 = useTransform(scrollYProgress, [0.64, 0.69], [-20, 0]);
  const arrowX3 = useTransform(scrollYProgress, [0.67, 0.72], [-20, 0]);
  const arrowXs = [arrowX1, arrowX2, arrowX3];

  const splitRows = [
    { before: "Missed prayers", after: "Next prayer tracked" },
    { before: "No routine", after: "Growing consistency" },
    { before: "Feeling behind", after: "Daily progress" },
  ];

  // --- 6. STAGE 5: ARABIC BISMILLAH (84% -> 94%) ---
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

  // --- 7. STAGE 6: GRAND FINALE "INTRODUCING TAWFIQ." (95% -> 100%) ---
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
      ref={containerRef}
      className="relative h-[1100vh] bg-[#F0FDF4] font-['Plus_Jakarta_Sans',sans-serif]"
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
        {/* STAGE 1: HERO HEADLINE */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: heroTextOpacity, y: heroTextY }}
          className="absolute z-10 w-full px-4 text-center flex flex-col items-center"
        >
          <h1 className="font-['Cormorant_Garamond',serif] font-medium text-[2.1rem] xs:text-[2.5rem] sm:text-[5.2rem] md:text-[6.8rem] lg:text-[8rem] leading-[1.2] sm:leading-[0.92] tracking-[-0.02em] text-green-950">
            <span className="block font-normal text-green-950 whitespace-nowrap sm:whitespace-normal">
              How long has it been
            </span>
            <span className="block font-normal text-green-950 mt-1 sm:mt-2 whitespace-nowrap sm:whitespace-normal">
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
          <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-green-950 leading-[1.15] font-light tracking-[-0.01em]">
            No matter how many prayers you've missed.
          </h2>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 3: "The next one still matters." (Standalone Big Scroll Text) */}
        {/* ==================================================================== */}
        <motion.div
          style={{
            opacity: nextOneOpacity,
            y: nextOneY,
            scale: nextOneScale,
          }}
          className="absolute z-10 max-w-6xl w-full px-6 text-center"
        >
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-[#16A34A] italic font-normal tracking-[-0.02em] leading-[1.1]">
            <motion.span
              style={{ clipPath: nextOneRevealMask }}
              className="inline-block"
            >
              The next one still matters.
            </motion.span>
          </h2>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 4: BEFORE / AFTER SPLIT SCREEN */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: splitScreenOpacity, y: splitScreenY }}
          className="absolute z-20 inset-0 flex items-center justify-center w-full px-4 sm:px-8 pointer-events-none"
        >
          <div className="w-full max-w-5xl flex flex-col">
            {/* Split Headers */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 sm:gap-8 md:gap-16 mb-10 md:mb-16 w-full items-end">
              <div className="text-right">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] sm:text-sm md:text-base uppercase tracking-[0.15em] text-[#829B8C] font-semibold block">
                  Before Tawfiq
                </span>
              </div>
              <div className="w-8 sm:w-12 md:w-16"></div>{" "}
              {/* Spacer matching arrow width */}
              <div className="text-left">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] sm:text-sm md:text-base uppercase tracking-[0.15em] text-[#16A34A] font-semibold block">
                  After Tawfiq
                </span>
              </div>
            </div>

            {/* Split Rows */}
            <div className="flex flex-col gap-10 sm:gap-12 md:gap-16 font-['Cormorant_Garamond',serif] text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
              {splitRows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_auto_1fr] gap-4 sm:gap-8 md:gap-16 items-center w-full"
                >
                  {/* Before side (Drained - soft muted green-gray, light, blurred) */}
                  <div className="text-right text-[#829B8C] opacity-[0.55] blur-[1px] font-light leading-[1.1] md:leading-tight">
                    {row.before}
                  </div>

                  {/* Animated Connecting Arrow */}
                  <div className="flex justify-center text-[#16A34A]">
                    <motion.svg
                      style={{ clipPath: arrowMasks[i], x: arrowXs[i] }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </motion.svg>
                  </div>

                  {/* After side (Crisp and Vibrant) */}
                  <div className="text-left text-[#16A34A] italic font-normal leading-[1.1] md:leading-tight">
                    {row.after}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            className="font-serif text-[5.5rem] sm:text-[9rem] md:text-[12rem] lg:text-[14rem] text-green-950 font-normal tracking-normal leading-none select-none"
          >
            بِسْمِ ٱللَّٰهِ
          </h2>

          <div className="mt-3 sm:mt-6 overflow-hidden">
            <motion.p
              style={{ clipPath: bismillahTransMask }}
              className="inline-block font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl md:text-5xl text-[#16A34A] font-light italic tracking-wide"
            >
              In the Name of Allah
            </motion.p>
          </div>

          <span className="mt-6 sm:mt-8 block font-['Plus_Jakarta_Sans',sans-serif] text-[10px] sm:text-[12px] uppercase tracking-[0.35em] text-green-600 font-medium">
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
          <h2 className="font-['Cormorant_Garamond',serif] text-[3.5rem] xs:text-[4rem] sm:text-[6.5rem] md:text-[8.5rem] lg:text-[10rem] text-green-950 font-light tracking-[-0.02em] leading-[1.15] select-none sm:whitespace-nowrap">
            Introducing{" "}
            <span className="italic font-normal text-[#16A34A]">Tawfiq.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
