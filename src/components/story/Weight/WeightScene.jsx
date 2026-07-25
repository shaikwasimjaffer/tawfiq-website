import { motion } from "framer-motion";

export default function WeightScene({ state }) {
  return (
    <>
      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{
          opacity: state.roomDarkness * 0.35,
        }}
      />

      {/* Calendar */}
      <motion.div
        className="absolute right-20 top-24 rounded-3xl bg-white p-8 shadow-xl"
        animate={{
          y: -state.calendarProgress * 120,
          opacity: 1 - state.calendarProgress * 0.4,
        }}
      >
        <p className="text-2xl font-light text-neutral-800">Days passed...</p>
      </motion.div>
    </>
  );
}
