"use client";

import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import {
  Car,
  Package,
  Factory,
  Mountain,
  Pill,
  Newspaper,
  Utensils,
  Boxes,
  Droplets,
} from "lucide-react";
import Image from "next/image";

const industries = [
  { name: "Steel Product Processing", icon: Factory },
  { name: "Hot Rolling & Cold Rolling", icon: Mountain },
  { name: "Steel Tube Processing Lines", icon: Package },
  { name: "Ware House Handling Systems(ASRS)", icon: Boxes },
  { name: "Printing and Converting Industries", icon: Newspaper },
  { name: "Food and Beverages", icon: Utensils },
  { name: "Packaging Industries", icon: Package },
  { name: "Rubber & Tyre Industries", icon: Droplets },
  { name: "Sugar Industries", icon: Pill },
  { name: "Automobile", icon: Car },
];

export default function Industries() {
  const router = useRouter();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative w-full min-h-[105vh] flex flex-col items-center justify-center text-white bg-gray-900 border-b border-gray-700 border-t py-10"
    >
      <Image
        src="/a9.png"
        width={200}
        height={200}
        alt="Picture of the author"
        className="absolute 2xl:top-[2rem] 2xl:right-[5rem] hidden 2xl:block"
      />
      <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient bottom-40 border-2" />

      <div className="absolute inset-0"></div>

      <div className="relative w-full max-w-6xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4"
        >
          Industries <span className="text-red-500">We</span> Serve
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
          className="text-sm md:text-lg text-gray-400 max-w-3xl mx-auto mb-12"
        >
          Empowering industries with cutting-edge automation and technological
          solutions for better efficiency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#2563eb",
                color: "#fff",
              }}
              transition={{ duration: 0.2 }}
              className="p-5 bg-gray-800 hover:cursor-pointer bg-opacity-75 shadow-md rounded-xl text-lg font-medium text-white border border-gray-600 transition-all hover:shadow-xl flex flex-col items-center gap-3"
              onClick={() => {
                router.push(
                  `/Industries/${industry.name
                    .toLocaleLowerCase()
                    .split(" ")
                    .join("-")}`
                );
              }}
            >
              <industry.icon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-cyan-400" />
              <span className="text-sm md:text-md">{industry.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
