import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroCTA() {
  return (
    <motion.button
      whileHover={{
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="
        mt-14
        flex
        items-center
        gap-3
        rounded-full
        bg-neutral-900
        px-8
        py-4
        text-sm
        font-medium
        text-white
        transition-all
        duration-300
        hover:bg-neutral-800
      "
    >
      Begin Your Journey
      <ArrowRight size={18} />
    </motion.button>
  );
}
