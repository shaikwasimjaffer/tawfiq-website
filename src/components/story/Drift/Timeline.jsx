import { AnimatePresence, motion } from "framer-motion";

const EVENTS = [
  {
    id: "fajr",
    start: 0.12,
    end: 0.28,
    title: "🕌 Fajr",
    subtitle: "Prayer time has arrived",
  },
  {
    id: "dhuhr",
    start: 0.42,
    end: 0.58,
    title: "🕌 Dhuhr",
    subtitle: "Prayer time has arrived",
  },
];

export default function Timeline({ progress }) {
  const active = EVENTS.find(
    (event) => progress >= event.start && progress <= event.end,
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="absolute left-1/2 top-20 w-[340px] -translate-x-1/2 rounded-3xl border border-white/20 bg-white/90 p-5 shadow-2xl backdrop-blur-xl"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Tawfiq
            </p>

            <h3 className="mt-2 text-lg font-semibold text-neutral-900">
              {active.title}
            </h3>

            <p className="mt-1 text-sm text-neutral-600">{active.subtitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
