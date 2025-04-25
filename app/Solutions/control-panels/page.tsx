"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type IndustryData = {
  heading?: string;
  mainContent1?: string;
  mainContent2?: string;
  lowerContent1?: string;
  lowerContent2?: string;
  icon?: string;
  images?: string[];
};

const Page = () => {
  const pathName = usePathname();
  const dataToGet = pathName.split("/")[2];

  const [data, setData] = useState<{
    heading?: string;
    mainContent1?: string;
    mainContent2?: string;
    lowerContent1?: string;
    lowerContent2?: string;
    icon?: string;
    images?: string[];
  }>({});

  useEffect(() => {
    if (!dataToGet) return;

    import("../../Utilities/data")
      .then((module) => {
        const { solutions } = module;
        const retrievedData = solutions[dataToGet as keyof typeof solutions];

        if (retrievedData) {
          setData(retrievedData);
        } else {
          console.warn("No data found for key:", dataToGet);
        }
      })
      .catch((err) => console.error("Failed to load data:", err));
  }, [dataToGet]);

  return (
    <section className="relative min-h-screen flex flex-col items-center bg-gray-900 text-white overflow-hidden px-6 md:px-12">
      <div
        className="relative h-[50vh] sm:h-[60vh] bg-cover bg-center w-full flex items-center justify-center"
        style={{
          backgroundImage: `url(${
            data.icon?.startsWith("http") ? data.icon : `/a38.jpg`
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-55"></div>
        <div className="z-10 text-white flex items-center justify-center h-full rounded-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col gap-4 bg-gray-800/60 p-6 sm:p-8 rounded-lg shadow-lg backdrop-blur-md text-center"
          >
            <p className="text-2xl sm:text-3xl md:text-4xl text-red-500 font-bold tracking-wide border-b-2 border-gray-400 pb-2">
              {data.heading || "Default Heading"}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient bottom-40 border-2" />

      <ImageSliderWithContent data={data} />
    </section>
  );
};

function ImageSliderWithContent({ data }: { data: IndustryData }) {
  const router = useRouter();
  const images = [
    "/a33.jpeg",
    "/a34.jpeg",
    "/a35.jpeg",
    "/a36.jpeg",
    "/a37.jpeg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="z-10 mt-4 md:mt-4 bg-gray-800/60 text-gray-300 p-6 rounded-lg shadow-lg backdrop-blur-md w-full leading-relaxed relative"
    >
      <p className="text-sm md:text-lg w-full">
        {data.mainContent1 || "Default content 1"} <br />
        <br /> {data.mainContent2 || "Default content 2"}
      </p>
      <p className="text-sm md:text-lg">
        {data.lowerContent1 || "Default lower content 1"}
      </p>
      <br />
      <p className="text-sm md:text-lg">
        {data.lowerContent2 || "Default lower content 2"}
      </p>
      <div className="relative w-full h-[70vh] my-6 flex items-center justify-center bg-black rounded-lg overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="max-w-full max-h-full object-contain rounded-lg"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xl font-bold transition-opacity duration-300 opacity-100 group-hover:opacity-0">
          Site Image {currentIndex + 1}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-900/50 text-white p-2 rounded-full hover:bg-gray-900/70 transition"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900/50 text-white p-2 rounded-full hover:bg-gray-900/70 transition"
        >
          ▶
        </button>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="px-6 py-3 mt-6 text-sm md:text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg"
          onClick={() => router.push("/Contact/contact")}
        >
          Contact Us
        </button>
      </div>
    </motion.div>
  );
}

export default Page;
