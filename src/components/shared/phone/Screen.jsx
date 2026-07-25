import { AnimatePresence, motion } from "framer-motion";

import PrayerScreen from "./PrayerScreen";
import QuranScreen from "./QuranScreen";
import DhikrScreen from "./DhikrScreen";
import AcademyScreen from "./AcademyScreen";
import QazaScreen from "./QazaScreen";
import AIScreen from "./AIScreen";

export default function Screen({ screen = "prayer", progress = 0 }) {
  const screens = {
    prayer: <PrayerScreen progress={progress} />,
    quran: <QuranScreen progress={progress} />,
    dhikr: <DhikrScreen progress={progress} />,
    academy: <AcademyScreen progress={progress} />,
    qaza: <QazaScreen progress={progress} />,
    ai: <AIScreen progress={progress} />,
  };

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[42px] bg-[#0B0B0D]">
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C2B3A] via-[#101318] to-black" />

      {/* App Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{
            opacity: 0,
            scale: 0.98,
            y: 16,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 1.02,
            y: -16,
          }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
          className="relative h-full w-full"
        >
          {screens[screen]}
        </motion.div>
      </AnimatePresence>

      {/* OLED Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
    </div>
  );
}
