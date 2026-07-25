import { motion } from "framer-motion";

export default function Transformation() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-[#F6F3EC] to-white">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-7xl font-light text-neutral-900">One Prayer.</h2>

        <p className="mt-6 text-2xl text-neutral-600">became two.</p>

        <p className="mt-3 text-2xl text-neutral-600">Then a habit.</p>

        <p className="mt-3 text-2xl text-neutral-600">Then a new beginning.</p>
      </motion.div>
    </section>
  );
}
