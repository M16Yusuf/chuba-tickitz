import React, { Fragment } from "react";

import { Link } from "react-router";

// import "../../assets/styles/pages/register-login.css";

// import image
// import tickitzWhite from "../../../public/logo/tickitz-white.png";

function LoginPage() {
  return (
    <div className="bgLoginRegister">
      <section className="relative m-auto flex flex-col items-center">
        <div className="m-auto mt-5 w-[25%]">
          <img src="/logo-tickitz-white.png" alt="logo Tickitz" />
        </div>

        <form>
          <div className="flex w-[480px] flex-col self-center rounded-md bg-white px-7">
            <div>
              <span>Welcome Back👋</span>
              <p>
                Sign in with your data that you entered during your registration
              </p>
            </div>
            <div>
              <label htmlFor="ele_mail"> Email </label>
              <br />
              <input
                type="text"
                className="h-10 w-[400px] rounded-xs border-2 border-[#aaaaaa] bg-white px-3"
                name="ele_mail"
                placeholder="Enter your email"
                id="ele_mail"
              />
            </div>
            <div>
              <label htmlFor="pass"> Password </label>
              <br />
              <input
                className="h-10 w-[400px] rounded-xs border-2 border-[#aaaaaa] bg-white px-3"
                type="password"
                name="pass"
                placeholder="Enter your Passwod"
                id="pass"
              />
            </div>
            <div className="login">
              <Link className="text-blue-700" to="/register">
                Forgot your password?
              </Link>
            </div>
            <div>
              <button
                className="h-14 w-[400px] rounded-b-sm bg-blue-700 text-white"
                type="submit"
              >
                Login
              </button>
            </div>
            <div></div>
            <hr className="hr_style" />
            <div className="mb-[50px] flex flex-row justify-between">
              <button
                className="w-44 bg-white text-[#4e4b66] shadow-sm"
                type="button"
              >
                <img src="/icon_google.svg" alt="icon_google" />
                Google
              </button>
              <button
                className="w-44 bg-white text-[#4e4b66] shadow-sm"
                type="button"
              >
                <img src="/icon_facebook.svg" alt="icon_facebook" />
                Facebook
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
