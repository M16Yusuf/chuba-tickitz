import React, { Fragment } from "react";

import { Link } from "react-router";

// import "../../assets/styles/pages/register-login.css";

// import image
// import tickitzWhite from "../../../public/logo/tickitz-white.png";

function LoginPage() {
  return (
    <div className="bgLoginRegister">
      <section className="relative m-auto flex flex-col items-center">
        <div className="mt-5 m-auto w-[25%]">
          <img src="/logo-tickitz-white.png" alt="logo Tickitz" />
        </div>

        <form>
          <div className="flex flex-col bg-white rounded-md px-7 self-center w-[480px]">
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
                className="w-[400px] h-10 rounded-xs bg-white border-2 border-[#aaaaaa] px-3"
                name="ele_mail"
                placeholder="Enter your email"
                id="ele_mail"
              />
            </div>
            <div>
              <label htmlFor="pass"> Password </label>
              <br />
              <input
                className="w-[400px] h-10 rounded-xs bg-white border-2 border-[#aaaaaa] px-3"
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
                className="bg-blue-700 text-white w-[400px] h-14 rounded-b-sm"
                type="submit"
              >
                Login
              </button>
            </div>
            <div></div>
            <hr className="hr_style" />
            <div className="flex flex-row justify-between mb-[50px]">
              <button
                className="bg-white text-[#4e4b66] w-44 shadow-sm"
                type="button"
              >
                <img src="/icon_google.svg" alt="icon_google" />
                Google
              </button>
              <button
                className="bg-white text-[#4e4b66] w-44 shadow-sm"
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
