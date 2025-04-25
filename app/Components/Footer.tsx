"use client";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="relative bg-gray-900 text-white py-10 px-6 overflow-hidden  border-gray-700 border-t">
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40 border-2" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:flex md:justify-between gap-8">
        <div className="md:w-1/3">
          <div className="flex justify-center">
            <Image
              src="/companyLogo.png"
              alt="Nexgen Logo"
              width={130}
              height={130}
              onClick={() => router.push("/")}
              className="hover:cursor-pointer"
            />
          </div>
          <div className="mt-[1rem] flex flex-col items-center">
            <h2 className="text-sm md:text-lg font-semibold mb-3 text-gray-400">
              We build impactful automation solutions
            </h2>
            <p className="text-sm text-gray-500 hover:text-red-600 underline cursor-pointer">
              <a
                href="mailto:info@nexgen.in"
                className="hover:cursor-pointer hover:text-red-600 hover:underline"
              >
                Send your enquiries for a quick response.
              </a>
            </p>
          </div>
        </div>

        <div className="md:w-1/3 flex justify-center pt-[1.5rem]">
          <ul className="flex gap-4">
            <li
              className="hover:cursor-pointer hover:text-red-600 hover:underline text-sm md:text-md"
              onClick={() => router.push("/#solutions")}
            >
              Solutions
            </li>
            <li
              className="hover:cursor-pointer hover:text-red-600 hover:underline text-sm md:text-md"
              onClick={() => router.push("/#industries")}
            >
              Industries
            </li>
            <li
              className="hover:cursor-pointer hover:text-red-600 hover:underline text-sm md:text-md"
              onClick={() => router.push("/#about")}
            >
              About Us
            </li>
            <li
              className="hover:cursor-pointer hover:text-red-600 hover:underline text-sm md:text-md"
              onClick={() => router.push("/Gallery/gallery")}
            >
              Gallery
            </li>
            <li
              className="hover:cursor-pointer hover:text-red-600 hover:underline text-sm md:text-md"
              onClick={() => router.push("/Jobs/jobs")}
            >
              Careers
            </li>
          </ul>
        </div>

        <div className="md:w-1/3 ml-[2rem]">
          <h3 className="font-semibold text-md md:text-lg">
            Corporate <span className="text-red-500">Office</span>
          </h3>
          <p className="mt-2 text-sm text-gray-300">
            Swadeshi compound, A-1/265, Kavi Nagar Industrial Area, Sector 17,
            Kavi Nagar, Ghaziabad, Uttar Pradesh 201002
          </p>

          <div className="mt-3">
            <p className="flex items-center text-sm">
              <EnvelopeIcon className="w-5 h-5 mr-2 text-gray-400" />
              <a
                href="mailto:info@nexgen.in"
                className="hover:cursor-pointer hover:text-red-600 hover:underline"
              >
                info@nexgen.in
              </a>
            </p>
            <p className="flex items-center text-sm mt-2">
              <PhoneIcon className="w-5 h-5 mr-2 text-gray-400" />
              <a
                href="tel:9810227663"
                className="hover:cursor-pointer hover:text-red-600 hover:underline"
              >
                +91 (Land Line)
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        <p>
          © 2025 Nexgen Pvt. Ltd. | Designed & Developed by Nexgen Pvt. Ltd.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
