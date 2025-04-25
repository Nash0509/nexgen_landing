"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Settings,
  BarChart3,
  PanelLeft,
  Wrench,
  Globe,
  Code,
  ServerCog,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const solutions = [
  {
    name: "Control Panels",
    description:
      "Complete range of automation and LT Panel solutions across industries delivered across the globe.",
    icon: PanelLeft,
  },
  {
    name: "Automation",
    description:
      "Driving efficiency and cost savings through factory and process automation solutions.",
    icon: Settings,
  },
  {
    name: "Automation Consulting",
    description:
      "What are the driving factors behind successful execution of automation projects?",
    icon: BarChart3,
  },
  {
    name: "Engineering Services",
    description:
      "Engineering services for control automation, plant engineering and design across industries.",
    icon: Wrench,
  },
  {
    name: "Industrial Software",
    description:
      "Nexgen provides design and engineering services, software sales & support and training services.",
    icon: Code,
  },
  {
    name: "Global Engineering Outsourcing",
    description:
      "A bench strength of 20+ engineers for customers keen to outsource skilled engineering resources/manpower.",
    icon: Globe,
  },
  {
    name: "ERP Software",
    description:
      "A comprehensive ERP solution designed to streamline business operations, optimize resource management, and enhance efficiency across departments.",
    icon: ServerCog,
  },
];

export default function Solutions() {
  const router = useRouter();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center text-white py-20 bg-gray-900 border-gray-700"
    >
      <Image
        src="/a10.png"
        width={150}
        height={150}
        alt="Picture of the author"
        className="absolute 2xl:top-8 2xl:right-[10rem] hidden 2xl:block"
      />
      <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient bottom-40 border-2" />

      <div className="relative w-full max-w-6xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4"
        >
          Solutions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
          className="text-sm md:text-lg text-gray-400 max-w-3xl mx-auto mb-12"
        >
          At Nexgen, efficiency meets innovation & cutting-edge technology
          transforms possibilities into realities. Our end-to-end automation
          solutions define industry standards with seamless integration of
          hardware & software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#2563eb",
                color: "#fff",
              }}
              transition={{ duration: 0.2 }}
              className="p-6 bg-gray-800 hover:cursor-pointer bg-opacity-75 shadow-md rounded-xl text-lg font-medium text-white border border-gray-600 transition-all hover:shadow-xl flex flex-col items-center text-center gap-4"
              onClick={() => {
                router.push(
                  `/Solutions/${solution.name
                    .toLocaleLowerCase()
                    .split(" ")
                    .join("-")}`
                );
              }}
            >
              <solution.icon className="w-12 h-12 text-cyan-400" />
              <h3 className="text-xl font-semibold">{solution.name}</h3>
              <p className="text-gray-300 text-sm">{solution.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
