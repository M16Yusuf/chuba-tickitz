import React, { Fragment } from "react";

import "../../assets/styles/pages/register-login.css";

// import image
// import tickitzWhite from "../../../public/logo/tickitz-white.png";

function LoginPage() {
  return (
    <section>
      <div className="logo">
        <img src="/logo-tickitz-white.png" alt="logo Tickitz" />
      </div>

      <form>
        <div className="card-flex">
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
              name="ele_mail"
              placeholder="Enter your email"
              id="ele_mail"
            />
          </div>
          <div>
            <label htmlFor="pass"> Password </label>
            <br />
            <input
              type="password"
              name="pass"
              placeholder="Enter your Passwod"
              id="pass"
            />
          </div>
          <div className="login">
            <a href="./register.html">Forgot your password?</a>
          </div>
          <div>
            <button type="submit"> Login </button>
          </div>
          <div></div>
          <hr className="hr_style" />
          <div>
            <button type="button">
              <img src="/icon_google.svg" alt="icon_google" />
              Google
            </button>
            <button type="button">
              <img src="/icon_facebook.svg" alt="icon_facebook" />
              Facebook
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default LoginPage;
