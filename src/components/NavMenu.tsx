import React, { useEffect, useRef, useState } from "react";

type NavMenuProps = {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Close dropdown menu when click outside of it
const useClickOutside = (
  isDropdownOpen: boolean,
  closeDropdownMenu: Function
) => {
  const domNode = useRef<HTMLLIElement>(null);

  useEffect(() => {
    // if menu is open
    if (isDropdownOpen) {
      console.log("dropdown event");
      const eventHandler = (event: MouseEvent) => {
        console.log("click event / inside?");
        // if click outside of menu - close the menu
        if (!domNode.current?.contains(event.target as Element)) {
          closeDropdownMenu();
          console.log("click outside");
        }
      };

      document.addEventListener("mousedown", eventHandler);

      return () => {
        document.removeEventListener("mousedown", eventHandler);
      };
    }
  }, [isDropdownOpen]);

  return domNode;
};

const NavMenu = ({ isNavOpen, setIsNavOpen }: NavMenuProps) => {
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] =
    useState<boolean>(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] =
    useState<boolean>(false);

  // Refs for dropdown menus
  const featuresDropdownNodeRef = useClickOutside(
    isFeaturesDropdownOpen,
    setIsFeaturesDropdownOpen
  );
  const companyDropdownNodeRef = useClickOutside(
    isCompanyDropdownOpen,
    setIsCompanyDropdownOpen
  );

  return (
    // Nav container
    <section
      className={`nav-container absolute top-0 right-0 transition-all ${
        isNavOpen ? "visible opacity-100" : "invisible opacity-0"
      } md:visible md:opacity-100 md:relative md:w-full`}
    >
      {/* Nav menu backdrop */}
      <div
        className={`nav-backdrop bg-zinc-900 fixed inset-0 w-full h-full transition-opacity duration-200 ${
          isNavOpen
            ? "opacity-80 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => setIsNavOpen(false)}
      ></div>

      {/* Nav menu */}
      <article
        className={`nav-menu bg-white absolute min-w-fit min-h-screen w-72 p-6 right-0 top-0 z-10  transition-transform md:visible md:translate-x-0 md:flex md:relative md:min-h-0 md:justify-between md:w-full md:py-0 md:items-start md:transition-none ${
          isNavOpen ? "translate-x-0 " : "translate-x-full"
        } `}
      >
        <button
          aria-label="close navigation menu"
          className="block ml-auto mb-6 p-1 md:hidden"
          onClick={() => setIsNavOpen(false)}
        >
          <img src="images/icon-close-menu.svg" alt="close icon" />
        </button>

        {/* Menu list */}
        <ul className="text-left flex flex-col gap-3 md:flex-row md:mr-auto md:gap-6">
          {/* Dropdown 1 */}
          <li className="md:relative" ref={featuresDropdownNodeRef}>
            {/* dropdown 1 - toggle */}
            <button
              // ? aria-expanded={isFeaturesDropdownOpen ? "true" : "false"}
              className="flex items-center gap-2 w-full py-1"
              onClick={() => setIsFeaturesDropdownOpen((prev) => !prev)}
            >
              Features
              <span>
                <img
                  src="images/icon-arrow-down.svg"
                  alt=""
                  className={`nav-chevron transition-transform ${
                    isFeaturesDropdownOpen ? "transform -rotate-180" : ""
                  }`}
                />
              </span>
            </button>
            {/* dropdown 1 - list */}
            {isFeaturesDropdownOpen && (
              <ul className="dropdown-menu ml-3 flex flex-col gap-4 mt-2 md:absolute md:bg-white md:p-6 md:shadow-2xl md:min-w-max md:ml-0 md:right-0 md:rounded-lg">
                <li>
                  <a href="#/" className="flex items-center gap-3">
                    <span>
                      <img src="images/icon-todo.svg" alt="" />
                    </span>
                    Todo List
                  </a>
                </li>
                <li>
                  <a href="#/" className="flex items-center gap-3">
                    <span>
                      <img src="images/icon-calendar.svg" alt="" />
                    </span>
                    Calendar
                  </a>
                </li>
                <li>
                  <a href="#/" className="flex items-center gap-3">
                    <span>
                      <img src="images/icon-reminders.svg" alt="" />
                    </span>
                    Reminders
                  </a>
                </li>
                <li>
                  <a href="#/" className="flex items-center gap-3">
                    <span>
                      <img src="images/icon-planning.svg" alt="" />
                    </span>
                    Planning
                  </a>
                </li>
              </ul>
            )}
          </li>
          {/* Dropdown 2 */}
          <li className="md:relative" ref={companyDropdownNodeRef}>
            {/* dropdown 2 - toggle */}
            <button
              // ? aria-expanded={isCompanyDropdownOpen ? "true" : "false"}
              className="flex items-center gap-2 w-full py-1 md:relative"
              onClick={() => setIsCompanyDropdownOpen((prev) => !prev)}
            >
              Company
              <span>
                <img
                  src="images/icon-arrow-down.svg"
                  alt=""
                  className={`nav-chevron transition-transform ${
                    isCompanyDropdownOpen ? "transform -rotate-180" : ""
                  }`}
                />
              </span>
            </button>
            {/* dropdown 2 - list */}
            {isCompanyDropdownOpen && (
              <ul className="dropdown-menu ml-3 flex flex-col gap-4 mt-2 md:absolute md:bg-white md:p-6 md:shadow-2xl md:ml-0 md:min-w-max md:rounded-lg">
                <li>
                  <a href="#/" className="flex items-center gap-3">
                    History
                  </a>
                </li>
                <li>
                  <a href="#/" className="flex items-center gap-3">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#/" className="flex items-center gap-3">
                    Blog
                  </a>
                </li>
              </ul>
            )}
          </li>
          {/* Dropdown 2 end */}
          <li>
            <a href="#/" className="block w-full py-1 text-left ">
              Careers
            </a>
          </li>
          <li>
            <a href="#/" className="block w-full py-1 text-left ">
              About
            </a>
          </li>
        </ul>
        {/* Menu list end */}

        {/* Login / Register */}
        <ul className="mt-4 flex flex-col gap-2 text-center md:flex-row md:-mt-1">
          <li>
            <a
              href="#/"
              className="block rounded-xl border-2 border-transparent w-full py-2 md:px-6 md:py-1.5"
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="#/"
              className="block rounded-xl border-2 border-zinc-600 w-full py-2 md:px-6 md:py-1.5 hover:bg-black hover:text-white"
            >
              Register
            </a>
          </li>
        </ul>
        {/* login / register end */}
      </article>
    </section>
  );
};

export default NavMenu;
