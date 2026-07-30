import React from "react";
import Navbar from "@/components/tawfiq/Navbar";
import Hero from "@/components/tawfiq/Hero";
import Qaza from "@/components/tawfiq/Qaza";
import Quran from "@/components/tawfiq/Quran";
import Academy from "@/components/tawfiq/Academy";

// 1. Updated the import to match your file name exactly
import TawfiqAI from "@/components/tawfiq/TawfiqAI";

import SurahTaha from "@/components/tawfiq/SurahTaha";
import Footer from "@/components/tawfiq/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.main
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      className="bg-[#F7F5F1]"
    >
      <Navbar />
      <Hero />
      <Qaza />
      <Quran />
      <Academy />

      {/* 2. Place the component here */}
      <TawfiqAI />

      <SurahTaha />
      <Footer />
    </motion.main>
  );
}
