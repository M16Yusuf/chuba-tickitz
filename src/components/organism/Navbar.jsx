import React, { useEffect, useState } from "react";

import ListItem from "../atoms/Link/ListItem.jsx";
import { Link } from "react-router";

import profile_image from "/src/assets/img/profile_image.jpg";

import { DeletePersist } from "/src/components/Auth/LoginPersist.jsx";

/**
 * Navbar Komponen organism, digunakan untuk beberapa page
 */
function Navbar() {
  const [toggleBurger, setToggleBurger] = useState(false);
  const [isLogin, SetIsLogin] = useState(false);

  const navBtn = [
    { text: "Home", route: "/home" },
    { text: "Movie", route: "/movies" },
    { text: "Buy Ticket", route: "/buyticket" },
  ];

  useEffect(() => {
    if (localStorage.getItem("koda3:login") == null) {
      SetIsLogin(false);
    } else {
      SetIsLogin(true);
    }
  }, []);

  function LogOutClick() {
    DeletePersist();
    window.location.reload();
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-white shadow-md">
      <nav className="w-c bg-white-500 flex w-full items-center justify-between p-6 md:max-w-[1440px] md:justify-around md:justify-self-center">
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

        {isLogin ? (
          <div
            className="hidden md:flex md:flex-row md:items-center md:gap-3"
            onClick={() => setToggleBurger(!toggleBurger)}
          >
            <img
              className="h-10 w-10 rounded-full"
              src={profile_image}
              alt="profile_img"
            />
          </div>
        ) : (
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
        )}

        {/* Hide hamburger, show when small screen */}
        <div
          className="block md:hidden"
          onClick={() => setToggleBurger(!toggleBurger)}
        >
          <img src="/icon-hamburger-menu.svg" alt="hamburger" />
        </div>
      </nav>

      {/* this nav will apper only when onclick hamburger only */}
      <ul
        className={`${!toggleBurger && "hidden"} bg-white md:fixed md:right-52 md:w-2xs md:shadow-md`}
      >
        {isLogin ? (
          <>
            <Link
              to={"/profile"}
              className={
                "flex items-center justify-center gap-5 border border-solid border-gray-100 p-3 text-center"
              }
            >
              <img
                className="h-10 w-10 rounded-full"
                src={profile_image}
                alt="profile_img"
              />
              <span>Muhammad Yusuf</span>
            </Link>
            <li
              className={
                "flex cursor-pointer flex-row gap-2.5 border border-solid border-gray-100 p-3"
              }
              onClick={LogOutClick}
            >
              <img
                className="border-blue-primary h-[45px] w-[45px] rounded-md border"
                src="/icon-log-out.svg"
                alt="log-out"
              />
              <span className="block w-full rounded-sm border border-blue-700 bg-white p-2.5 text-center text-blue-700">
                logout
              </span>
            </li>
          </>
        ) : (
          <>
            <li
              className={
                "block border border-solid border-gray-100 p-3 text-center"
              }
            >
              <Link
                className="block rounded-sm border border-blue-700 bg-white p-2.5 text-blue-700"
                to="/login"
              >
                SignIn
              </Link>
            </li>
            <li
              className={
                "block border border-solid border-gray-100 p-3 text-center"
              }
            >
              <Link
                className="block rounded-sm bg-blue-700 p-2.5 text-white"
                to="/register"
              >
                Sign Up
              </Link>
            </li>
          </>
        )}

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
