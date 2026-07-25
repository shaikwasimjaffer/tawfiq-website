import { motion } from "framer-motion";

export default function Ending() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-[#0F172A] px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center"
      >
        <h2 className="text-7xl font-light">Returning is always possible.</h2>

        <p className="mt-8 text-xl text-neutral-300">
          No matter how many prayers you've missed, the next one is still
          waiting.
        </p>

        <button className="mt-14 rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition hover:scale-105">
          Begin with Tawfiq
        </button>
      </motion.div>
    </section>
  );
}
