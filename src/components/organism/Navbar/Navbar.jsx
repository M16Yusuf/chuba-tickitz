import React, { useState } from "react";

import ListItem from "./../../atoms/Link/ListItem.jsx";

/**
 * Navbar Komponen organism, digunakan untuk beberapa page
 */
function Navbar() {
  const [toggleBurger, setToggleBurger] = useState("hidden");

  const ToggleDiv = () => {
    setToggleBurger((prev) =>
      prev.includes("hidden") ? prev.replace("hidden", "") : `${prev} hidden`
    );
  };

  const navBtn = [
    { text: "Home", route: "/home" },
    { text: "Movie", route: "/movie" },
    { text: "Buy Ticket", route: "/buyticket" },
  ];

  return (
    <header className="shadow-md bg-white w-full sticky top-0 z-10">
      <nav className="flex w-full bg-white-500 justify-between items-center p-6 md:justify-around">
        <img
          className="w-24 h-9  sm:w-32 sm:h-12"
          src="./logo-blue_tickitz.svg"
          alt="test"
        />
        <ul className="hidden md:flex md:flex-row md:gap-5">
          {navBtn.map((nav, idx) => {
            return <ListItem listText={nav.text} key={idx} to={nav.route} />;
          })}
        </ul>

        <div className="hidden md:flex md:flex-row md:gap-3 md:items-center"></div>

        {/* Hide hamburger when small screen */}
        <div className="block md:hidden" onClick={ToggleDiv}>
          <img src="./icon-hamburger-menu.svg" alt="hamburger" />
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
                "block p-3 text-center border border-solid border-gray-100"
              }
            />
          );
        })}
      </ul>
    </header>
  );
}

export default Navbar;
