import { motion } from "framer-motion";

export default function Companion() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-[#F8F6F1] px-8">
      <div className="max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 text-sm uppercase tracking-[0.4em] text-emerald-700"
        >
          Your Companion
        </motion.p>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-light leading-tight text-neutral-900"
        >
          Tawfiq doesn't replace your worship.
          <br />
          It simply helps you stay consistent.
        </motion.h2>
      </div>
    </section>
  );
}
