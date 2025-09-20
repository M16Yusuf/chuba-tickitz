import { useState } from "react";

import ListItem from "../atoms/Link/ListItem.jsx";
import { Link } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../redux/slice/authSlice.js";
import { userAction } from "../../redux/slice/userSlice.js";

/**
 * Navbar Komponen organism, digunakan untuk beberapa page
 */
function Navbar() {
  const [toggleBurger, setToggleBurger] = useState(false);
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navBtn = [
    { text: "Home", route: "/home" },
    { text: "Movie", route: "/movies" },
    { text: "Buy Ticket", route: "/buyticket" },
  ];

  const navAdmin = [
    { text: "Dashboard", route: "/admin/dashboard" },
    { text: "Add Movie", route: "/admin/addmovie" },
  ];

  // delete auth/user/logout
  function LogOutClick() {
    dispatch(authAction.resetAuthState());
    dispatch(userAction.deleteUserState());
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-white shadow-sm">
      <nav className="w-c bg-white-500 flex w-full items-center justify-between p-6 md:max-w-[1440px] md:justify-around md:justify-self-center">
        <img
          className="h-9 w-24 sm:h-12 sm:w-32"
          src="/logo-blue_tickitz.svg"
          alt="test"
        />
        <ul className="hidden md:flex md:flex-row md:gap-5">
          {authState.user.role != "admin"
            ? navBtn.map((nav, idx) => {
                return (
                  <ListItem listText={nav.text} key={idx} to={nav.route} />
                );
              })
            : navAdmin.map((nav, idx) => {
                return (
                  <ListItem listText={nav.text} key={idx} to={nav.route} />
                );
              })}
        </ul>

        {/* shown in wide screen */}
        {(!authState.user || Object.keys(authState.user).length) != 0 ? (
          <div className="hidden md:flex md:flex-row md:items-center md:gap-3">
            <select name="city-select" id="city-select" defaultValue={location}>
              <option value="Location">Location</option>
              <option value="cityA">City A</option>
              <option value="cityB">City B</option>
              <option value="cityC">City C</option>
              <option value="cityD">City D</option>
              <option value="cityE">City E</option>
            </select>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
                fill="#414141"
              />
            </svg>
            <img
              className="h-10 w-10 rounded-full object-cover"
              onClick={() => setToggleBurger(!toggleBurger)}
              src={
                (authState.user.avatar_path &&
                  `${import.meta.env.VITE_HOST_URL}/img/profile/${authState.user.avatar_path}`) ||
                (userState.user.profile_path &&
                  `${import.meta.env.VITE_HOST_URL}/img/profile/${userState.user.profile_path}`) ||
                "/profile_default.jpg"
              }
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

        {/* Hiden hamburger, show when small screen */}
        <div
          className="block md:hidden"
          onClick={() => setToggleBurger(!toggleBurger)}
        >
          <img src="/icon-hamburger-menu.svg" alt="hamburger" />
        </div>
      </nav>

      {/* this nav will apper only when onclick hamburger only */}
      <ul
        className={`${!toggleBurger && "hidden"} bg-white md:fixed md:right-20 md:w-2xs md:shadow-md`}
        onClick={() => setToggleBurger(!toggleBurger)}
      >
        {(!authState.user || Object.keys(authState.user).length) != 0 ? (
          <>
            <Link
              to={"/profile"}
              className={
                "flex items-center justify-center gap-5 border border-solid border-gray-100 p-3 text-center"
              }
            >
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={
                  (authState.user.avatar_path &&
                    `${import.meta.env.VITE_HOST_URL}/img/profile/${authState.user.avatar_path}`) ||
                  (userState.user.profile_path &&
                    `${import.meta.env.VITE_HOST_URL}/img/profile/${userState.user.profile_path}`) ||
                  "/profile_default.jpg"
                }
                alt="profile_img"
              />
              <span>{`${authState.user.first_name} ${authState.user.last_name}`}</span>
            </Link>
            <li
              className={
                "flex cursor-pointer flex-row gap-2.5 border border-solid border-gray-100 p-3"
              }
              onClick={LogOutClick}
            >
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

        {authState.user.role != "admin"
          ? navBtn.map((nav, idx) => {
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
            })
          : navAdmin.map((nav, idx) => {
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
