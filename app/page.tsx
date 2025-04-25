"use client";
import React, { useState, useEffect } from "react";
import Hero from "./Components/Hero";
import ClientsPartnersSection from "./Components/ClientsPartnersSection";
import Industries from "./Components/Industries";
import Solutions from "./Components/Solutions";
import VisionMission from "./Components/VisionMission";
import AboutUs from "./About/about/page";
import { ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("dropdown-menu");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
        <div
          className="bg-green-600 p-3 rounded-full shadow-lg transition-all duration-300 opacity-80 hover:opacity-100 cursor-pointer hover:scale-105"
          onClick={toggleMenu}
        >
          <ChevronUp className="w-8 h-8 text-white" />
        </div>

        {isOpen && (
          <div
            id="dropdown-menu"
            className="absolute bottom-full right-0 mb-3 bg-white text-black w-48 shadow-xl rounded-lg p-3 transition-all duration-300 ease-in-out"
          >
            <ul className="text-sm font-medium">
              <li
                className="hover:bg-gray-900 hover:text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => router.push("/Contact/contact")}
              >
                Contact Us
              </li>
              <li
                className="hover:bg-gray-900 hover:text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Scroll To Top
              </li>
            </ul>
          </div>
        )}
      </div>

      <Hero />
      <AboutUs />
      <Industries />
      <VisionMission />
      {/* <ClientsPartnersSection /> */}
      <Solutions />
    </div>
  );
};

export default Page;
