import { motion } from "framer-motion";

export default function Reflection({ progress = 0 }) {
  return (
    <>
      {/* Main Moving Reflection */}
      <motion.div
        className="pointer-events-none absolute -left-24 -top-20 h-[900px] w-32 rotate-[18deg]"
        animate={{
          x: progress * 220 - 110,
        }}
        transition={{
          duration: 0.25,
          ease: "linear",
        }}
      >
        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/18 to-transparent blur-2xl" />
      </motion.div>

      {/* Secondary Reflection */}
      <motion.div
        className="pointer-events-none absolute right-0 top-0 h-full w-24"
        animate={{
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="h-full w-full bg-gradient-to-l from-white/10 to-transparent" />
      </motion.div>

      {/* Top Glass Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/12 to-transparent" />

      {/* Bottom Glass Fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/12 to-transparent" />

      {/* Edge Highlights */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-white/20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/15" />

      {/* Corner Glow */}
      <div className="pointer-events-none absolute left-4 top-4 h-32 w-32 rounded-full bg-white/8 blur-3xl" />
    </>
  );
}
