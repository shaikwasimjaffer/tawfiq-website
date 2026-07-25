import { AnimatePresence, motion } from "framer-motion";

const TEXT = [
  {
    start: 0,
    end: 0.35,
    value: "Days quietly became weeks.",
  },
  {
    start: 0.35,
    end: 0.7,
    value: "The hardest part wasn't missing prayers.",
  },
  {
    start: 0.7,
    end: 1,
    value: "It was not knowing how to return.",
  },
];

export default function WeightNarrative({ progress }) {
  const current = TEXT.find(
    (item) => progress >= item.start && progress <= item.end,
  );

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {current && (
          <motion.h2
            key={current.value}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl px-8 text-center text-5xl font-light leading-tight text-neutral-900 md:text-7xl"
          >
            {current.value}
          </motion.h2>
        )}
      </AnimatePresence>
    </div>
  );
}
