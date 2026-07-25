import { AnimatePresence, motion } from "framer-motion";

const STORY = [
  {
    id: 1,
    start: 0.0,
    end: 0.2,
    text: "Life became busy.",
  },
  {
    id: 2,
    start: 0.2,
    end: 0.45,
    text: "One missed prayer became another.",
  },
  {
    id: 3,
    start: 0.45,
    end: 0.7,
    text: "It wasn't intentional.",
  },
  {
    id: 4,
    start: 0.7,
    end: 1.0,
    text: "Until the silence became familiar.",
  },
];

export default function Narrative({ progress }) {
  const active = STORY.find(
    (item) => progress >= item.start && progress <= item.end,
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {active && (
          <motion.h2
            key={active.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl px-8 text-center text-5xl font-light leading-tight tracking-tight text-neutral-900 md:text-7xl"
          >
            {active.text}
          </motion.h2>
        )}
      </AnimatePresence>
    </div>
  );
}
