import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isMobile } from "react-device-detect";

type NavMenuDropdownProps = {
  children: React.ReactNode;
  title: string;
  windowDimensions: {
    width: number;
    height: number;
  };
};
const NavMenuDropdown = (props: NavMenuDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownMenuRef = useRef<HTMLLIElement>(null);

  // Mobile nav dropdown animation
  let mobileVariant = {
    hidden: {
      overflow: "hidden",
      opacity: 1,
      height: 0,
      transition: {
        type: "tween",
        duration: 0.25,
        ease: "easeInOut",
      },
    },
    show: {
      opacity: 1,
      height: isDropdownOpen ? "auto" : 0,
      transition: {
        type: "tween",
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  };

  // Desktop nav dropdown animation
  let desktopVariant = {
    hidden: {
      opacity: 0,
      scale: 0.4,
      transition: { type: "spring", bounce: 0.2, duration: 0.3 },
      height: 0,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", bounce: 0.2, duration: 0.3 },
      height: "auto",
    },
  };

  //  Handle click outside - close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // if click element outside dropdown menu - close dropdown menu
      if (!dropdownMenuRef.current?.contains(event.target as Element)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <li
      className="md:relative"
      ref={dropdownMenuRef}
      // Desktop version mouse hover to open/close dropdown
      onMouseEnter={() => {
        if (props.windowDimensions.width > 768 && !isMobile)
          setIsDropdownOpen(true);
      }}
      onMouseLeave={() => {
        if (props.windowDimensions.width > 768 && !isMobile)
          setIsDropdownOpen(false);
      }}
    >
      {/* Dropdown toggle */}
      <button
        aria-expanded={isDropdownOpen ? "true" : "false"}
        className={`flex items-center gap-2 w-full py-1 after:absolute after:h-12 after:min-w-full ${
          isDropdownOpen && "text-black text-shadow"
        }`}
        onClick={() => setIsDropdownOpen((prev: boolean) => !prev)}
      >
        {/* Dropdown title */}
        {props.title}
        <span>
          <img
            src="images/icon-arrow-down.svg"
            alt=""
            className={`nav-chevron transition-transform ${
              isDropdownOpen ? "transform -rotate-180" : ""
            }`}
          />
        </span>
      </button>
      {/* Dropdown list */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            variants={
              props.windowDimensions.width > 768
                ? desktopVariant
                : mobileVariant
            }
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <ul className="dropdown-menu ml-5 flex flex-col gap-4 mt-2 md:absolute md:bg-white md:p-6 md:shadow-2xl md:ml-0 md:min-w-max md:rounded-lg md:right-0 ">
              {props.children}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default NavMenuDropdown;
