import { Link } from "react-router";
import profile_image from "/src/assets/img/profile_image.jpg";
import { useState } from "react";

function NavbarProfile() {
  const [toggleBurger, setToggleBurger] = useState(false);

  return (
    <header className="sticky top-0 z-10 w-full bg-white md:shadow-md">
      <nav
        className="bg-white-500 flex w-full items-center justify-between p-6 md:justify-around"
        id="nav"
      >
        {/* <!-- image logo --> */}
        <img
          className="h-9 w-24 sm:h-12 sm:w-32"
          src="/logo-blue_tickitz.svg"
          alt="logo blue Tickitz"
        />

        {/* <!-- nav for big screen > 768 --> */}
        <div className="hidden md:flex md:flex-row md:gap-5">
          <Link
            className="block border border-solid border-gray-100 text-center"
            to={"/home"}
          >
            Home
          </Link>
          <Link
            className="block border border-solid border-gray-100 text-center"
            to={"/movies"}
          >
            Movie
          </Link>
          <Link
            className="block border border-solid border-gray-100 text-center"
            to={"/buyticket"}
          >
            Buy Ticket
          </Link>
        </div>

        {/* <!-- make this display hidden when smal --> */}
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
            className="h-10 w-10 rounded-full"
            src={profile_image}
            alt="profile_img"
            onClick={() => setToggleBurger(!toggleBurger)}
          />
        </div>

        {/* <!-- hiden button hamburger --> */}
        <div
          className="block md:hidden"
          onClick={() => setToggleBurger(!toggleBurger)}
        >
          <img
            className="h-6 w-6"
            src="/icon-hamburger-menu.svg"
            alt="hamburger"
          />
        </div>
      </nav>

      {/* <!-- hamburger menu --> */}
      <div
        className={`${!toggleBurger && "hidden"} bg-white md:fixed md:right-24 md:w-2xs md:shadow-md`}
        id="content-hamburger"
      >
        <div className="flex cursor-pointer flex-row gap-2.5 border border-solid border-gray-100 p-3">
          <img
            className="border-blue-primary h-[45px] w-[45px] rounded-md border"
            src="/icon-log-out.svg"
            alt="log-out"
          />
          <span className="block w-full rounded-sm border border-blue-700 bg-white p-2.5 text-center text-blue-700">
            logout
          </span>
        </div>
        <Link
          className="block border border-solid border-gray-100 p-3 text-center"
          to={"/home"}
        >
          Home
        </Link>
        <Link
          className="block border border-solid border-gray-100 p-3 text-center"
          to={"/movies"}
        >
          Movie
        </Link>
        <Link
          className="block border border-solid border-gray-100 p-3 text-center"
          to={"/buyticket"}
        >
          Buy Ticket
        </Link>
      </div>
    </header>
  );
}

export default NavbarProfile;
