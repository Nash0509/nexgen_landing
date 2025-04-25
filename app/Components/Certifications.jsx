import { motion } from "framer-motion";

export default function Certifications() {
  return (
    <section className="w-full flex flex-col items-center text-center text-white py-20 px-6">
      <div className="w-full max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4"
        >
          Certifications
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-black max-w-3xl mx-auto"
        >
          Our processes & solutions comply with stringent quality & industry
          standards set by international certification organizations.
        </motion.p>
      </div>

      <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        src="/certifications.jpg"
        alt="Certifications"
        className="w-full max-w-4xl mt-8 rounded-lg shadow-lg"
      />
    </section>
  );
}
