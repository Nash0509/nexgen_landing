"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const HeroClients = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    margin: "-50px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gray-900 text-center flex flex-col pt-[4rem] items-center overflow-hidden border-b border-gray-700 px-10"
    >
      <Image
        src="/a8.png"
        height={150}
        width={150}
        alt="vision_mission"
        className="absolute 2xl:top-[3rem] 2xl:left-[10rem] rotate-[-10deg] hidden 2xl:block"
      />
      <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient bottom-40 border-2" />

      <div className="relative z-10 max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold text-white tracking-wide"
        >
          Partnered <span className="text-red-500">and</span> certified by
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-sm md:text-lg text-gray-400"
        >
          Partnering with industry leaders to innovate and build a smarter
          world.
        </motion.p>

        <motion.div
          className="mt-16 p-10 bg-gray-800 bg-opacity-75 shadow-xl rounded-xl flex flex-col items-center relative text-6xl font-extrabold text-transparent mb-10 tracking-wide 
             before:absolute before:top-0 before:left-0 before:w-16 before:h-16 before:border-t-4 before:border-l-4 before:border-red-500 
             after:absolute after:bottom-0 after:right-0 after:w-16 after:h-16 after:border-b-4 after:border-r-4 after:border-red-500 
             drop-shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/siemens.svg"
            alt="Siemens Logo"
            width={200}
            height={200}
            className="object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroClients;
