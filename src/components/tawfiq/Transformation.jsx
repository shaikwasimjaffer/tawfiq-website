import { motion } from "framer-motion";
import { Check } from "lucide-react";
import BismillahButton from "./BismillahButton";

export default function Transformation() {
  const beforePoints = [
    "Prayers slip through your day unnoticed",
    "Missed Salah piles up without clear tracking",
    "Qaza feels confusing and hard to start",
    "Islamic knowledge is scattered everywhere",
    "You can't see your worship consistency clearly",
  ];

  const afterPoints = [
    "Stay connected with your five daily prayers",
    "Recover missed Salah with a clear Qaza journey",
    "Learn Islam through one guided Academy",
    "Understand your worship and see your consistency grow",
    "Ask questions and receive guidance grounded in Islamic knowledge",
  ];

  return (
    <section className="bg-[#F0FDF4] overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Matching the website heading pattern - Tawfiq in green */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-['Newsreader',serif] font-light text-green-950 tracking-tight leading-tight text-center mb-10">
          See what changes when you have <span className="text-[#16A34A]">Tawfiq</span>
        </h2>
        <div className="relative grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Left Panel: Before Tawfiq */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-xl p-8 border border-gray-200 flex flex-col h-full"
          >
            <h2 className="font-['Newsreader',serif] font-light text-3xl md:text-4xl text-green-800 mb-4">
              Before Tawfiq
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              When worship feels scattered.
            </p>
            <div className="space-y-4">
              {beforePoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  translation={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="ml-3 text-gray-500">
                    • {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Panel: With Tawfiq */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            translation={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#064E3B] rounded-xl p-8 flex flex-col h-full"
          >
            <h2 className="font-['Newsreader',serif] font-light text-3xl md:text-4xl text-white mb-4">
              With Tawfiq
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              When your faith has a place to grow.
            </p>
            <div className="space-y-4">
              {afterPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  translation={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-white/20 text-white rounded-full">
                    <Check className="h-5 w-5" />
                  </span>
                  <span className="ml-3 text-white font-medium">
                    {point}
                  </span>
                </motion.div>
              ))}
              {/* Make first item slightly stronger */}
              <style>
                {`
                  .space-y-4 > :first-child .ml-3 {
                    font-weight: 600;
                  }
                `}
              </style>
            </div>
          </motion.div>
        </div>

              </div>
    </section>
  );
}