"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/outline";

const slides = [
  {
    id: 1,
    title: "Innovating Automation, Transforming Industries",
    description:
      "Cutting-edge automation solutions designed for efficiency, precision, and scalability.",
  },
  {
    id: 2,
    title: "Seamless Integration, Maximum Efficiency",
    description:
      "We help industries automate their processes with minimal downtime and high performance.",
  },
  {
    id: 3,
    title: "Smart Solutions for Modern Industries",
    description:
      "Empowering industries with AI-driven automation and smart control systems.",
  },
];

const formatTitle = (title: string) => {
  const words = title.split(" ");
  if (words.length < 2) return title;

  return (
    <>
      {words[0]}{" "}
      <span className="relative inline-block">
        <span className="relative z-10">{words[1]}</span>
      </span>{" "}
      {words.slice(2).join(" ")}
    </>
  );
};

const Hero = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-center text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero1.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-4xl text-center px-6">
        <AnimatePresence mode="wait">
          <motion.h1
            key={slides[currentSlide].title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-extrabold leading-tight mt-[5rem]"
          >
            {formatTitle(slides[currentSlide].title)}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={slides[currentSlide].description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-sm md:text-xl text-gray-400"
          >
            {slides[currentSlide].description}
          </motion.p>
        </AnimatePresence>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg"
            onClick={() => {
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Learn More
          </button>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 hidden md:block top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeftIcon className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute hidden md:block right-6 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300"
      >
        <ChevronRightIcon className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-6 flex space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index ? "bg-white scale-125" : "bg-gray-500"
            }`}
          ></span>
        ))}
      </div>
      <div className="text-center mt-20 md:hidden xl:block relative z-20 xl:flex xl:flex-col xl:justify-center xl:items-center">
        <ArrowDownCircleIcon
          className="h-12 w-12 text-white animate-bounce hover:cursor-pointer hover:text-red-500"
          onClick={() => {
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />
        <div className="bg-transparent hidden 2xl:block text-white mt-6 text-sm opacity-50 flex flex-col">
          <div>Scroll down</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
