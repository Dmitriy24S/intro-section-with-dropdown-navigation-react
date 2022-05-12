import { useState, useEffect, useRef } from "react";

const NavMenuDropdown = (props: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownMenuRef = useRef<HTMLLIElement>(null);

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
    <li className="md:relative" ref={dropdownMenuRef}>
      {/* Dropdown toggle */}
      <button
        aria-expanded={isDropdownOpen ? "true" : "false"}
        className="flex items-center gap-2 w-full py-1 "
        onClick={(e) => setIsDropdownOpen((prev: boolean) => !prev)}
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
      {isDropdownOpen && (
        <ul className="dropdown-menu ml-5 flex flex-col gap-4 mt-2 md:absolute md:bg-white md:p-6 md:shadow-2xl md:ml-0 md:min-w-max md:rounded-lg md:right-0">
          {props.children}
        </ul>
      )}
    </li>
  );
};

export default NavMenuDropdown;
