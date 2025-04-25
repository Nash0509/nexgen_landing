"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveHash(window.location.hash || pathname);

      const handleHashChange = () => {
        setActiveHash(window.location.hash);
      };

      window.addEventListener("hashchange", handleHashChange);
      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }
  }, [pathname]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Solutions", path: "/#solutions" },
    { label: "Industries", path: "/#industries" },
    { label: "About Us", path: "/#about" },
    { label: "Gallery", path: "/Gallery/gallery" },
    { label: "Contact", path: "/Contact/contact" },
    { label: "Career", path: "/Jobs/jobs" },
  ];

  const activePath = activeHash || pathname;

  const getNavItemClass = (path: string, isMobile: boolean = false) => {
    const isActive = activePath === path;

    if (isMobile) {
      return `py-2 text-md transition ${
        isActive
          ? "text-red-500 font-bold rounded-tl-lg rounded-br-lg"
          : "text-white hover:text-red-500"
      }`;
    }

    return `relative px-3 py-2 text-sm transition ${
      isActive ? "text-red-500" : "text-white hover:text-red-500"
    }`;
  };

  const handleNavigation = (path: string) => {
    if (path.startsWith("#")) {
      window.location.hash = path;
      setActiveHash(path);
    } else {
      setActiveHash(path);
      router.push(path);
    }
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <Image
            src="/companyLogo.png"
            alt="Company Logo"
            width={125}
            height={125}
            className="hover:opacity-80 transition"
          />
        </div>

        <nav className="hidden sm:flex gap-6 text-lg">
          {navItems.map(({ label, path }) => (
            <button
              key={label}
              className={getNavItemClass(path)}
              onClick={() => handleNavigation(path)}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          className="sm:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-gray-800 text-white p-4 flex flex-col gap-4 absolute w-full top-full shadow-md text-md">
          {navItems.map(({ label, path }) => (
            <button
              key={label}
              className={getNavItemClass(path, true)}
              onClick={() => {
                setMenuOpen(false);
                handleNavigation(path);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
