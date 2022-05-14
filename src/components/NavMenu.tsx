import React from "react";
import NavMenuDropdown from "./NavMenuDropdown";
import { useState, useEffect } from "react";
import { ReactComponent as IconTodo } from "../images/icon-todo.svg";
import { ReactComponent as IconCalendar } from "../images/icon-calendar.svg";
import { ReactComponent as IconReminder } from "../images/icon-reminders.svg";
import { ReactComponent as IconPlanning } from "../images/icon-planning.svg";

type NavMenuProps = {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavMenu = ({ isNavOpen, setIsNavOpen }: NavMenuProps) => {
  // Window dimenstions / handle window resize for mobile/desktop nav dropdown animation
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  useEffect(() => {
    console.log(windowDimensions);
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowDimensions]);

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
        <ul className="text-left flex flex-col gap-3 md:flex-row md:mr-auto md:gap-6 md:relative">
          {/* Dropdown 1 */}
          <NavMenuDropdown
            title={"Features"}
            windowDimensions={windowDimensions}
          >
            <li>
              <a href="#/" className="flex items-center gap-3">
                <span>
                  <IconTodo />
                </span>
                Todo List
              </a>
            </li>
            <li>
              <a href="#/" className="flex items-center gap-3">
                <span>
                  <IconCalendar />
                </span>
                Calendar
              </a>
            </li>
            <li>
              <a href="#/" className="flex items-center gap-3">
                <span>
                  <IconReminder />
                </span>
                Reminders
              </a>
            </li>
            <li>
              <a href="#/" className="flex items-center gap-3">
                <span>
                  <IconPlanning />
                </span>
                Planning
              </a>
            </li>
          </NavMenuDropdown>

          {/* Dropdown 2 */}
          <NavMenuDropdown
            title={"Company"}
            windowDimensions={windowDimensions}
          >
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
          </NavMenuDropdown>

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
