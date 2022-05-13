import { useState } from "react";
import NavMenu from "./NavMenu";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="max-w-7xl mx-auto p-6 relative">
      <div className="header-content-container flex items-center justify-between gap-4">
        {/* Nav logo */}
        <section className="logo-container">
          <img
            src="images/logo.svg"
            alt="company logo"
            className="logo cursor-pointer min-w-[84px]"
          />
        </section>

        {/* Mobile nav menu toggle */}
        <button
          aria-label="open navigation menu"
          // ? aria-expanded={isNavOpen ? "true" : "false"}
          className="nav-toggle p-2 md:hidden"
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <img src="images/icon-menu.svg" alt="menu icon" />
        </button>

        {/* Nav menu */}
        <NavMenu isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      </div>
    </header>
  );
};

export default Header;
