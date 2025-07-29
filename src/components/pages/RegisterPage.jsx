import React, { Fragment } from "react";

import "../../assets/styles/pages/register-login.css";

function RegisterPage() {
  return (
    <section>
      <div className="logo">
        <img src="/logo-tickitz-white.png" alt="logo Tickitz" />
      </div>

      <form>
        <div className="card-flex">
          <div className="step">
            <div>
              <div className="Active">1</div>
              Fill Form
            </div>
            <div>
              <div>2</div>
              Activate
            </div>
            <div>
              <div>3</div>
              Done
            </div>
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
          <div className="pass-area">
            <label htmlFor="pass"> Password </label>
            <br />
            <input
              type="password"
              name="pass"
              placeholder="Enter your Passwod"
              id="pass"
            />
          </div>
          <div>
            <input type="checkbox" name="agree" id="agree" />
            <label htmlFor="agree">I agree to terms & conditions</label>
          </div>
          <div>
            <button type="submit"> Join For Free Now </button>
          </div>
          <div className="register">
            Already have an account? <a href="./login.html">Log in</a>
          </div>
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

export default RegisterPage;
