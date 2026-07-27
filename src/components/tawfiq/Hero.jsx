import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef(null);

  // 900vh timeline provides a leisurely, cinematic scroll pacing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- 1. POLISHED STONE FLOOR & MORNING LIGHT BEAM (0% -> 22%) ---
  const floorOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.22],
    [0.35, 0.35, 0],
  );
  const lightBeamOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25],
    [0.85, 0.85, 0],
  );
  const floorScale = useTransform(scrollYProgress, [0, 0.22], [1, 1.05]);

  // --- 2. STAGE 1: HERO HEADLINE (0% -> 15%) ---
  const heroTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.15],
    [1, 1, 0],
  );
  const heroTextY = useTransform(scrollYProgress, [0, 0.15], [0, -30]);

  // --- 3. STAGE 2: THE REFLECTION & EXTENDED HOLD (18% -> 37%) ---
  const philosophyOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.21, 0.34, 0.37],
    [0, 1, 1, 0],
  );
  const philosophyY = useTransform(
    scrollYProgress,
    [0.18, 0.21, 0.34, 0.37],
    [30, 0, 0, -20],
  );

  const goldRevealMask = useTransform(
    scrollYProgress,
    [0.21, 0.28],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  // --- 4. STAGE 3: THE RETURN CASCADE (38% -> 72%) ---
  const cascadeItems = [
    { text: "One Prayer.", isHighlight: false, start: 0.38, end: 0.43 },
    { text: "One Step.", isHighlight: false, start: 0.44, end: 0.49 },
    { text: "One Day.", isHighlight: false, start: 0.5, end: 0.55 },
    { text: "One Habit.", isHighlight: false, start: 0.56, end: 0.61 },
    { text: "Consistency.", isHighlight: true, start: 0.62, end: 0.67 },
    { text: "Closeness.", isHighlight: true, start: 0.68, end: 0.73 },
  ];

  const cascadeOpacities = cascadeItems.map((item) =>
    useTransform(
      scrollYProgress,
      [item.start, item.start + 0.02, item.end, item.end + 0.03],
      [0, 1, 1, 0.2],
    ),
  );

  const cascadeScales = cascadeItems.map((item) =>
    useTransform(scrollYProgress, [item.start, item.end], [0.96, 1]),
  );

  const cascadeContainerOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.75],
    [1, 0],
  );

  // --- 5. STAGE 4: ARABIC BISMILLAH HERO & EXTENDED HOLD (74% -> 90%) ---
  const bismillahTransMask = useTransform(
    scrollYProgress,
    [0.76, 0.81],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  const bismillahOpacity = useTransform(
    scrollYProgress,
    [0.74, 0.77, 0.87, 0.9],
    [0, 1, 1, 0],
  );
  const bismillahScale = useTransform(
    scrollYProgress,
    [0.74, 0.8, 0.9],
    [0.94, 1, 1.03],
  );

  // --- 6. STAGE 5: GRAND FINALE "INTRODUCING TAWFIQ." (91% -> 100%) ---
  const introTawfiqOpacity = useTransform(
    scrollYProgress,
    [0.91, 0.95, 1],
    [0, 1, 1],
  );
  const introTawfiqScale = useTransform(
    scrollYProgress,
    [0.91, 0.96, 1],
    [0.95, 1, 1.02],
  );

  return (
    <section ref={containerRef} className="relative h-[900vh] bg-[#F7F5F1]">
      {/* Sticky Fullscreen Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* --- MORNING SUNLIGHT BEAM & LONG SHADOWS --- */}
        <motion.div
          style={{ opacity: lightBeamOpacity }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(245, 230, 205, 0.45) 0%, rgba(247, 245, 241, 0) 70%), radial-gradient(ellipse 80% 60% at 20% 10%, rgba(235, 205, 160, 0.35) 0%, rgba(247, 245, 241, 0) 75%)",
            }}
          />
        </motion.div>

        {/* --- POLISHED STONE FLOOR TEXTURE & TILES --- */}
        <motion.div
          style={{ opacity: floorOpacity, scale: floorScale }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden"
        >
          <svg
            viewBox="0 0 1200 800"
            className="w-full h-full max-w-[1600px] text-stone-400 fill-current"
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
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Minimal Grid Overlay */}
        <div className="absolute inset-0 flex justify-center pointer-events-none opacity-[0.025] z-0">
          <div className="w-full max-w-[1400px] grid grid-cols-6 h-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="border-r border-stone-900 h-full last:border-r-0"
              />
            ))}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* STAGE 1: HERO HEADLINE (FORCED 2-LINE LAYOUT) */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: heroTextOpacity, y: heroTextY }}
          className="relative z-10 max-w-[1200px] w-full px-4 text-center flex flex-col items-center"
        >
          <h1 className="font-serif text-[2.4rem] xs:text-[2.8rem] sm:text-[4.8rem] md:text-[6.2rem] lg:text-[7.2rem] leading-[1.15] sm:leading-[0.95] tracking-[-0.03em] text-stone-900 max-w-[18ch]">
            <span className="block font-normal">How long has it been</span>
            <span className="block font-light text-stone-500 mt-1 sm:mt-2">
              since your{" "}
              <span className="italic font-normal text-[#C6A26B]">
                last prayer?
              </span>
            </span>
          </h1>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 2: STATEMENT WITH EXTENDED HOLD */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: philosophyOpacity, y: philosophyY }}
          className="absolute z-10 max-w-5xl w-full px-6 text-center"
        >
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-[1.2] font-light">
            <span className="block font-light">
              No matter how many prayers you've missed...
            </span>
            <span className="block mt-2 sm:mt-3">
              <motion.span
                style={{ clipPath: goldRevealMask }}
                className="inline-block italic text-[#C6A26B] font-normal"
              >
                The next one still matters.
              </motion.span>
            </span>
          </h2>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 3: THE RETURN CASCADE */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: cascadeContainerOpacity }}
          className="absolute z-20 flex flex-col items-center justify-center text-center px-6 max-w-lg w-full space-y-6"
        >
          {cascadeItems.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div
                style={{
                  opacity: cascadeOpacities[index],
                  scale: cascadeScales[index],
                }}
                className="transition-all duration-300"
              >
                <p
                  className={`font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight ${
                    item.isHighlight
                      ? "text-[#C6A26B] font-normal italic"
                      : "text-stone-800 font-light"
                  }`}
                >
                  {item.text}
                </p>
              </motion.div>

              {index < cascadeItems.length - 1 && (
                <motion.span
                  style={{ opacity: cascadeOpacities[index] }}
                  className="text-stone-400 font-sans text-xs tracking-widest my-1 block"
                >
                  ↓
                </motion.span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 4: ARABIC BISMILLAH HERO & EXTENDED HOLD */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: bismillahOpacity, scale: bismillahScale }}
          className="absolute z-30 text-center px-6 max-w-[100vw] overflow-hidden flex flex-col items-center"
        >
          <h2
            dir="rtl"
            className="font-serif text-[5.5rem] sm:text-[9rem] md:text-[12rem] lg:text-[14rem] text-stone-900 font-normal tracking-normal leading-none select-none"
          >
            بِسْمِ ٱللَّٰهِ
          </h2>

          <div className="mt-3 sm:mt-6 overflow-hidden">
            <motion.p
              style={{ clipPath: bismillahTransMask }}
              className="inline-block font-serif text-2xl sm:text-4xl md:text-5xl text-[#C6A26B] font-light italic tracking-wide"
            >
              In the Name of Allah
            </motion.p>
          </div>

          <span className="mt-6 sm:mt-8 block font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.35em] text-stone-500 font-medium">
            Every meaningful journey begins here.
          </span>
        </motion.div>

        {/* ==================================================================== */}
        {/* STAGE 5: GRAND FINALE "INTRODUCING TAWFIQ." */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: introTawfiqOpacity, scale: introTawfiqScale }}
          className="absolute z-35 text-center px-6 max-w-[100vw] overflow-hidden"
        >
          <h2 className="font-serif text-[4rem] sm:text-[7rem] md:text-[9.5rem] lg:text-[11.5rem] text-stone-900 font-light tracking-[-0.03em] leading-none select-none">
            Introducing{" "}
            <span className="italic font-normal text-[#C6A26B]">Tawfiq.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
