"use client";

import React from "react";
import { motion } from "framer-motion";

const Page = () => {
  const images = [
    "/a33.jpeg",
    "/a34.jpeg",
    "/a35.jpeg",
    "/a36.jpeg",
    "/a37.jpeg",
    "/plc1.jpeg",
    "/plc2.jpeg",
    "/plc3.jpeg",
    "/plc4.jpeg",
    "/plc5.jpeg",
    "/plc6.jpeg",
    "/plc7.jpeg",
    "/plc8.jpeg",
    "/plc9.jpeg",
    "/plc10.jpeg",
    "/plc11.jpeg",
  ];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6 overflow-hidden relative px-4">
      <div className="absolute z-0 w-[60%] h-[60%] -right-[30%] md:-right-[50%] rounded-full blue__gradient top-[-10%] border-2" />
      <div className="absolute z-0 w-[60%] h-[60%] -left-[30%] md:-left-[50%] rounded-full blue__gradient top-[-10%] border-2" />
      <div className="absolute z-0 w-[60%] h-[60%] -right-[30%] md:-right-[50%] rounded-full blue__gradient bottom-40 border-2" />
      <div className="absolute z-0 w-[60%] h-[60%] -left-[30%] md:-left-[50%] rounded-full blue__gradient bottom-40 border-2" />

      <div
        className="relative h-[30vh] md:h-[40vh] w-[90vw] flex items-center justify-center bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(/gallery.jpg)` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 w-[90%] md:w-[50%] flex flex-col gap-4 bg-gray-800/60 p-6 md:p-8 rounded-lg shadow-lg backdrop-blur-md text-center"
        >
          <p className="text-2xl md:text-4xl font-bold tracking-wide text-red-500 border-b-2 border-gray-400 pb-2">
            Gallery
          </p>
        </motion.div>
      </div>

      <div className="w-[90vw] bg-gray-800 rounded-lg pb-4">
        <ImageGallery
          images={images}
          heading="Control Panels"
          direction="rtl"
        />
      </div>
      <div className="w-[90vw] bg-gray-800 rounded-lg pb-4">
        <ImageGallery
          images={images}
          heading="Control Panels"
          direction="ltr"
        />
      </div>

      <div className="w-[90vw] flex flex-col items-center bg-gray-800 pb-4 justify-center rounded-lg">
        <div className="py-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white px-6 border-b-4 border-red-500 inline-block pb-2">
            Wire Drawing Machine
          </h1>
        </div>
        <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-2xl border border-gray-700">
          <video
            id="myVideo"
            height="240"
            controls
            muted
            className="w-full h-auto rounded-lg"
          >
            <source src="/wire.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => document.getElementById("myVideo").play()}
              className="bg-white text-black px-6 py-3 rounded-full shadow-lg font-semibold hover:bg-gray-300 transition"
            >
              ▶ Play Video
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Page;

const ImageGallery = ({ images, heading, direction }) => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  return (
    <div className="w-full p-4 overflow-hidden bg">
      <div className="relative w-full flex items-center my-6 overflow-hidden flex flex-col">
        <div className="py-6 text-center">
          <h1 className="text-3xl font-bold text-white px-6 border-b-4 border-red-500 inline-block pb-2">
            {heading}
          </h1>
        </div>

        <motion.div
          className="flex gap-4 cursor-pointer"
          initial={{ x: direction === "rtl" ? "30%" : "-30%" }}
          animate={{ x: direction === "rtl" ? "-30%" : "30%" }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          {images.concat(images).map((image, index) => (
            <div
              key={index}
              className="relative w-[300px] h-[400px] bg-black rounded-lg overflow-hidden flex-shrink-0"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xl font-bold transition-opacity duration-300 opacity-100 hover:opacity-0">
                Image {(index % images.length) + 1}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-gray-800 p-4 rounded-lg max-w-[90vw] max-h-[90vh] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-lg hover:bg-red-700"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Enlarged View"
              className="max-w-full max-h-[80vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
