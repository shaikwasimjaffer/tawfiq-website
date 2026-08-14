import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Transformation() {
  const beforePoints = [
    "Prayers easily slip through the day",
    "Missed Salah becomes difficult to keep track of",
    "Qaza feels overwhelming and uncertain",
    "Duas and Islamic knowledge are scattered",
    "Hard to see your progress and consistency",
  ];

  const afterPoints = [
    "Stay connected with all five daily prayers",
    "Understand and recover missed Salah with Qaza tracking",
    "Learn Duas, Salah, Wudu, and the 99 Names of Allah",
    "Build a deeper understanding of Islam through the Academy",
    "See your worship journey, progress, and consistency clearly",
    "Receive meaningful guidance through TawfiqAI",
  ];

  return (
    <section className="relative bg-[#F7F5F1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Panel: Before Tawfiq */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#F0FDF4] rounded-xl p-8"
          >
            <h2 className="font-['Newsreader',serif] font-light text-3xl md:text-4xl text-green-950 mb-4">
              Before Tawfiq
            </h2>
            <p className="text-green-800 mb-6">
              When worship feels scattered.
            </p>
            <div className="space-y-4">
              {beforePoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 border border-green-300 rounded-full">
                  </span>
                  <span className="ml-3 text-green-700">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Panel: With Tawfiq */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#064E3B] rounded-xl p-8"
          >
            <h2 className="font-['Newsreader',serif] font-light text-3xl md:text-4xl text-white mb-4">
              With Tawfiq
            </h2>
            <p className="text-white/90 mb-6">
              When your faith has a place to grow.
            </p>
            <div className="space-y-4">
              {afterPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 bg-white/20 text-white rounded-full">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="ml-3 text-white">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}