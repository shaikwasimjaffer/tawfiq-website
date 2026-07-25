import { AnimatePresence, motion } from "framer-motion";

const STORY = [
  {
    id: 1,
    start: 0,
    end: 0.3,
    text: "Every return begins with one sincere intention.",
  },
  {
    id: 2,
    start: 0.3,
    end: 0.65,
    text: "Allah's mercy was never far away.",
  },
  {
    id: 3,
    start: 0.65,
    end: 1,
    text: "You only had to take the first step.",
  },
];

export default function Timeline({ progress }) {
  const current = STORY.find(
    (item) => progress >= item.start && progress <= item.end,
  );

  return (
    <AnimatePresence mode="wait">
      {current && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <h2 className="max-w-4xl px-8 text-center text-6xl font-light leading-tight text-neutral-900">
            {current.text}
          </h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
