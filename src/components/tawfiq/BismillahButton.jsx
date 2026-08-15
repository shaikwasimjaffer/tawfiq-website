import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BismillahButton({ onClick }) {
  const [animatingAction, setAnimatingAction] = useState(null);

  const handleBismillahClick = () => {
    if (animatingAction) return;
    setAnimatingAction({ type: "bismillah", label: "Bismillah" });

    setTimeout(() => {
      onClick();
      setTimeout(() => setAnimatingAction(null), 400);
    }, 450);
  };

  return (
    <motion.div
      className="pointer-events-none flex items-center justify-center"
      animate={{
        left: animatingAction ? 0 : "auto",
        right: animatingAction ? 0 : 32,
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.button
        onClick={handleBismillahClick}
        whileHover={{ y: -1 }}
        className={`group bg-[#15803D] hover:bg-[#146c33] text-white flex items-center justify-center font-['Geist',sans-serif] overflow-hidden pointer-events-auto cursor-pointer shadow-sm border border-white/20 transition-all ${
          animatingAction ? "" : "px-5 py-3 md:px-6 md:py-3.5"
        }`}
        animate={{
          width: animatingAction ? "100%" : "auto",
          height: animatingAction ? "100%" : "auto",
          borderRadius: "9999px",
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
              className="font-['Newsreader',serif] font-light italic text-2xl text-white tracking-wide"
            >
              {animatingAction.label}
            </motion.span>
          ) : (
            <motion.div
              key="begin"
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 text-[14px] md:text-[15px] font-medium tracking-tight whitespace-nowrap"
            >
              <span className="font-serif text-[16px] md:text-[18px] opacity-90 leading-none pt-0.5" dir="rtl">
                بسم الله
              </span>
              <span>Bismillah</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}