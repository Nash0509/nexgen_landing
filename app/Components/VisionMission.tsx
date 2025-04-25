"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const VisionMission = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gray-900 min-h-[80vh] flex flex-col justify-center items-center overflow-hidden px-6 md:px-12 border-b border-gray-700"
    >
      <Image
        src="/a3.png"
        height={150}
        width={150}
        alt="vision_mission"
        className="absolute 2xl:top-[4rem] 2xl:right-[10rem] hidden 2xl:block"
      />

      <div className="absolute z-[0] w-[80%] h-[80%] -right-[60%] rounded-full blue__gradient bottom-40 border-2 hidden md:block" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-200 mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          Our Vision <span className="text-red-500">&</span> Mission
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <motion.div
            className="bg-gray-900/60 p-6 sm:p-8 shadow-lg rounded-lg border border-gray-800 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-300 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
              To be a global leader in industrial automation solutions, measured
              by:
            </p>
            <ul className="list-disc list-inside text-gray-500 space-y-2 text-sm sm:text-base md:text-lg">
              <li>
                Delivering innovative solutions and ensuring customer
                satisfaction.
              </li>
              <li>Partnering with Fortune 500 companies worldwide.</li>
              <li>
                Leading in technology and competing with top providers globally.
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-gray-900/60 p-6 sm:p-8 shadow-lg rounded-lg border border-gray-800 text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-green-300 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
              We are committed to total customer satisfaction by providing:
            </p>
            <ul className="list-disc list-inside text-gray-500 space-y-2 text-sm sm:text-base md:text-lg">
              <li>
                Cutting-edge technology and best-in-class quality products.
              </li>
              <li>
                Innovative and expert consulting in industrial automation.
              </li>
              <li>
                Uncompromised quality in services to help businesses achieve
                success.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
