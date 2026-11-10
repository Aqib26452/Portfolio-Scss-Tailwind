import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import LogoImg from "../asserts/logoo-img.png";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import "../sass/App.css";

// `to` must match the id / name of each section on your page.
const NAV_ITEMS = [
  { id: 1, to: "Home", label: "Home" },
  { id: 2, to: "About", label: "About" },
  { id: 3, to: "Portfolio", label: "Portfolio" },
  { id: 4, to: "Experiance", label: "Experience" },
  { id: 5, to: "Contact", label: "Contact" },
];

const linkBase =
  "cursor-pointer select-none rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 transition-all duration-300 ${
        scrolled ? "py-2 shadow-lg shadow-indigo-900/25" : "py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 md:px-12 lg:px-20">
        {/* Brand */}
        <Link
          to="Home"
          smooth={true}
          offset={-80}
          className="flex cursor-pointer items-center gap-3"
        >
          <span className="rounded-full bg-white/90 p-[2px]">
            <img
              src={LogoImg}
              alt="Aqib logo"
              className="h-11 w-11 rounded-full border-2 border-transparent object-cover"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-white">
              Aqib Shahzad
            </span>
            <span className="block text-xs font-medium text-white/70">
              Web Developer
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(({ id, to, label }) => (
            <li key={id}>
              <Link
                to={to}
                smooth={true}
                spy={true}
                offset={-80}
                duration={500}
                activeClass="!bg-white !text-indigo-700 hover:!bg-white"
                className={linkBase}
                tabIndex={0}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop call to action */}
        <Link
          to="Contact"
          smooth={true}
          offset={-80}
          duration={500}
          className="hidden cursor-pointer rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-900/20 transition hover:-translate-y-0.5 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600 md:inline-block"
        >
          Hire me
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenu((open) => !open)}
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          className="grid h-11 w-11 place-items-center rounded-full text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
        >
          {menu ? (
            <MdClose className="text-2xl" />
          ) : (
            <IoMdMenu className="text-2xl" />
          )}
        </button>
      </nav>

      {/* Mobile panel: slides open without pushing the page layout */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          menu ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-1 px-4 pb-5 pt-3">
            {NAV_ITEMS.map(({ id, to, label }) => (
              <li key={id}>
                <Link
                  to={to}
                  smooth={true}
                  spy={true}
                  offset={-80}
                  duration={500}
                  onClick={() => setMenu(false)}
                  activeClass="!bg-white !text-indigo-700"
                  className="block cursor-pointer rounded-xl px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/15"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="Contact"
                smooth={true}
                offset={-80}
                duration={500}
                onClick={() => setMenu(false)}
                className="block cursor-pointer rounded-xl bg-white px-4 py-3 text-center text-base font-semibold text-indigo-700"
              >
                Hire me
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
