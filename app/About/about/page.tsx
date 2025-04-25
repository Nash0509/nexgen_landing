"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { PhoneCall, Mail, MapPin } from "lucide-react";
import Map from "@/app/Components/Map";

export default function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px 0px" });

  return (
    <div className="bg-gray-900 text-white relative">
      <section
        id="about"
        ref={ref}
        className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-20 overflow-hidden"
      >
        <Image
          src="/a31.png"
          width={150}
          height={150}
          alt="Company Logo"
          className="absolute hidden 2xl:block 2xl:top-[5rem] 2xl:left-[7rem]"
          style={{ animation: "bounce-custom 3s infinite ease-in-out" }}
        />
        <div className="absolute z-0 w-[60%] h-[60%] -right-[50%] rounded-full bg-blue-600 opacity-20 blur-3xl top-20" />

        <div className="relative z-10 max-w-5xl w-full text-center space-y-6">
          <motion.h1
            key={isInView.toString()}
            className="text-4xl md:text-6xl font-bold tracking-wide mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            About <span className="text-red-500">Us</span>
          </motion.h1>

          <motion.p
            key={`p1-${isInView}`}
            className="text-base md:text-lg text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <strong className="text-white">
              NexGen Industrial Solutions Pvt. Ltd.
            </strong>{" "}
            was founded by a group of experts in{" "}
            <strong className="text-red-500">2015</strong>, with extensive
            experience in
            <span className="text-blue-400">
              {" "}
              Industrial Automation, Motion Control, and Process Control
              Applications.
            </span>
          </motion.p>

          <motion.p
            key={`p2-${isInView}`}
            className="text-base md:text-lg text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            We have been an
            <span className="text-blue-400">
              {" "}
              Authorized System House of <span className="text-red-500">Siemens</span> since 2018,
            </span>{" "}
            providing end-to-end industrial automation solutions from
            <span className="text-blue-400">
              {" "}
              Basic Engineering, Detailed Engineering, Manufacturing, Site
              Installation, and Commissioning.
            </span>
          </motion.p>

          <motion.p
            key={`p3-${isInView}`}
            className="text-base md:text-lg font-semibold text-blue-400 mt-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Your success is our priority, and we are committed to driving
            innovation and excellence in industrial automation.
          </motion.p>

          <motion.div
            key={`contact-${isInView}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-10"
          >
            {[ 
              {
                title: "Call us now",
                content: "+91 (Land Line)",
                href: "tel:+919810227663",
                icon: <PhoneCall size={30} className="text-blue-400" />,
              },
              {
                title: "Come visit us",
                content:
                  "Swadeshi compound, A-1/265, Kavi Nagar Industrial Area, Sector 17, Kavi Nagar, Ghaziabad, Uttar Pradesh 201002",
                href: "https://maps.app.goo.gl/kJXsfFrB65iNeApr7",
                icon: <MapPin size={30} className="text-red-400" />,
              },
              {
                title: "Send us a message",
                content: "info@nexgen.in",
                href: "mailto:info@nexgen.in",
                icon: <Mail size={30} className="text-green-400" />,
              },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#1e40af",
                  color: "#fff",
                }}
                className="flex flex-col gap-3 bg-gray-800 bg-opacity-80 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-1/3"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto">
                  {item.icon}
                </div>
                <p className="text-sm md:text-lg font-medium text-gray-300">
                  {item.title}
                </p>
                <p className="text-white text-sm md:text-base text-center">
                  {item.content}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
        <div className="mt-16 w-full max-w-6xl">
          <Map />
        </div>
      </section>
    </div>
  );
}
