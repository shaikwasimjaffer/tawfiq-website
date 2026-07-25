import { motion } from "framer-motion";

export default function Frame({ children, progress = 0, tilt = true }) {
  const rotateX = tilt ? (0.5 - progress) * 6 : 0;
  const rotateY = tilt ? (progress - 0.5) * 8 : 0;

  return (
    <motion.div
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 2000,
      }}
      className="relative h-[760px] w-[370px]"
    >
      {/* Outer Shadow */}
      <div className="absolute inset-0 rounded-[62px] bg-black/25 blur-3xl scale-95" />

      {/* Titanium Frame */}
      <div className="absolute inset-0 rounded-[62px] bg-gradient-to-br from-neutral-400 via-neutral-200 to-neutral-600 p-[4px] shadow-[0_40px_120px_rgba(0,0,0,.45)]">
        {/* Metal Rim */}
        <div className="absolute inset-[2px] rounded-[60px] border border-white/40" />

        {/* Display Area */}
        <div className="relative h-full w-full overflow-hidden rounded-[58px] bg-black">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
