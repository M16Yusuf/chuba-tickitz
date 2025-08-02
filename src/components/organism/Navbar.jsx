import React, { useState } from "react";

import ListItem from "../atoms/Link/ListItem.jsx";
import { Link } from "react-router";

/**
 * Navbar Komponen organism, digunakan untuk beberapa page
 */
function Navbar() {
  const [toggleBurger, setToggleBurger] = useState("hidden");

  const ToggleDiv = () => {
    setToggleBurger((prev) =>
      prev.includes("hidden") ? prev.replace("hidden", "") : `${prev} hidden`,
    );
  };

  const navBtn = [
    { text: "Home", route: "/home" },
    { text: "Movie", route: "/movies" },
    { text: "Buy Ticket", route: "/buyticket" },
  ];

  return (
    <header className="sticky top-0 z-10 w-full bg-white shadow-md">
      <nav className="md:w-custom-max-main bg-white-500 flex w-full items-center justify-between p-6 md:justify-around md:justify-self-center">
        <img
          className="h-9 w-24 sm:h-12 sm:w-32"
          src="/logo-blue_tickitz.svg"
          alt="test"
        />
        <ul className="hidden md:flex md:flex-row md:gap-5">
          {navBtn.map((nav, idx) => {
            return <ListItem listText={nav.text} key={idx} to={nav.route} />;
          })}
        </ul>

        <div className="hidden md:flex md:flex-row md:items-center md:gap-3">
          <Link
            className="block rounded-sm border border-blue-700 bg-white p-2.5 text-blue-700"
            to="/login"
          >
            SignIn
          </Link>
          <Link
            className="block rounded-sm bg-blue-700 p-2.5 text-white"
            to="/register"
          >
            Sign Up
          </Link>
        </div>

        {/* Hide hamburger, show when small screen */}
        <div className="block md:hidden" onClick={ToggleDiv}>
          <img src="/icon-hamburger-menu.svg" alt="hamburger" />
        </div>
      </nav>

      {/* this nav will apper only when onclick hamburger only */}
      <ul className={toggleBurger.trim()}>
        {navBtn.map((nav, idx) => {
          return (
            <ListItem
              listText={nav.text}
              key={idx}
              to={nav.route}
              className={
                "block border border-solid border-gray-100 p-3 text-center"
              }
            />
          );
        })}
      </ul>
    </header>
  );
}

export default Navbar;
