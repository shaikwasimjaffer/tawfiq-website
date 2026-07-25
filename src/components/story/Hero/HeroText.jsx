import { motion } from "framer-motion";

export default function HeroText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.3,
      }}
      className="space-y-8"
    >
      <p className="text-sm uppercase tracking-[0.45em] text-neutral-500">
        TAWFIQ
      </p>

      <h1 className="max-w-5xl text-6xl font-light leading-tight text-neutral-900 md:text-8xl">
        Returning
        <br />
        begins with
        <br />
        one sincere step.
      </h1>

      <p className="mx-auto max-w-xl text-lg leading-8 text-neutral-600">
        A quiet companion for Muslims striving to return to Allah through
        consistency in worship.
      </p>
    </motion.div>
  );
}
