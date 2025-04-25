"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    text: "Nexgen has an excellent team. They demonstrated the patience to understand our requirements.",
    name: "Ravi Kumar",
    position: "P Manager - Instr (Engg) Dept.",
    company: "Aurobindo Pharma Ltd.",
  },
  {
    text: "We have discovered a real ally and partner in your organization. Nexgen has consistently delivered on-time, and also across a wide scope of industrial automation tasks.",
    name: "Lisa Hull",
    position: "Senior Account Manager",
    company: "E&M Electric & Machinery Inc. Irvine, California",
  },
  {
    text: "We have been working with Nexgen for more than two decades and we recognize that this organization is reliable, approachable, efficient and knowledgeable.",
    name: "Amol Timbe",
    position: "GM - Materials",
    company: "Praj Industries Limited",
  },
  {
    text: "During our association, Nexgen have demonstrated cooperation, flexibility, quality and customer commitment to meet our project requirements.",
    name: "Umesh Upadhye",
    position: "Regional Vice President(SCM)",
    company: "MAN Diesel & Turbo India Pvt. Ltd.",
  },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);

  const nextReview = () => {
    setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextReview, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen text-center flex justify-center items-center text-white py-20 px-6 bg-black overflow-hidden">
      <div className="absolute z-20 max-w-3xl ">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-gray-200 leading-tight mb-10"
        >
          What Clients Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
        >
          First-hand testimonials by clients that echo the success stories of
          our partnerships.
        </motion.p>

        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/70 p-8 rounded-xl mx-auto shadow-lg relative"
        >
          <p className="text-lg text-gray-300 italic">
            &quot;{reviews[index].text}&quot;
          </p>

          <div className="mt-4 text-right">
            <p className="text-white font-bold">{reviews[index].name}</p>
            <p className="text-gray-400 text-sm">{reviews[index].position}</p>
            <p className="text-gray-500 text-xs">{reviews[index].company}</p>
          </div>
        </motion.div>

        <div className="flex mt-6 space-x-4 justify-center">
          <button
            onClick={prevReview}
            className="p-2 bg-gray-700 rounded-full hover:bg-blue-600 transition"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextReview}
            className="p-2 bg-gray-700 rounded-full hover:bg-blue-600 transition"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
