import React, { Fragment, useState } from "react";

import "../../assets/styles/pages/register-login.css";

function RegisterPage() {
  const inputData = {};
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState([]);

  function validationInput(ev) {
    ev.preventDefault();
    const formD = ev.target;

    const mustHvChar = /[a-zA-Z]/;
    const mustHvDigit = /\d/;
    const mustHvSimbol = /[!@#$%^&*/><]/;

    if (!mustHvChar.test(formD.value)) {
      if (!error.includes("char"))
        setError((dataError) => [...dataError, "char"]);
    } else {
      let index = error.indexOf("char");
      if (index !== -1) {
        setError((dataError) => dataError.splice(index, 1));
      }
    }
    if (!mustHvDigit.test(formD.value)) {
      if (!error.includes("digit"))
        setError((dataError) => [...dataError, "digit"]);
    } else {
      let index = error.indexOf("digit");
      if (index !== -1) {
        setError((dataError) => dataError.splice(index, 1));
      }
    }
    if (!mustHvSimbol.test(formD.value)) {
      if (!error.includes("simbol"))
        setError((dataError) => [...dataError, "simbol"]);
    } else {
      let index = error.indexOf("simbol");
      if (index !== -1) {
        setError((dataError) => dataError.splice(index, 1));
      }
    }
    if (formD.value.length < 8) {
      if (!error.includes("length"))
        setError((dataError) => [...dataError, "length"]);
    } else {
      let index = error.indexOf("length");
      if (index !== -1) {
        setError((dataError) => dataError.splice(index, 1));
      }
    }
    if (formD.value.length == " ") {
      if (!error.includes("empty"))
        setError((dataError) => [...dataError, "empty"]);
    } else {
      let index = error.indexOf("empty");
      if (index !== -1) {
        setError((dataError) => dataError.splice(index, 1));
      }
    }

    console.log(error);
    return error;
  }

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
              onChange={validationInput}
            />
            <ErrorProcess data={error} />
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

function ErrorProcess(props) {
  return (
    <div>
      {props.data.length > 0 &&
        props.data.map((eleError, idx) => {
          switch (eleError) {
            case "char":
              return (
                <>
                  <span style={{ color: "red" }} className="font-bold text-sm text-red-600" key={idx}>
                    ❌ The password must contain characters !
                  </span>
                  <br />
                </>
              );
            case "digit":
              return (
                <>
                  <span style={{ color: "red" }} className="font-bold text-sm text-red-600"  key={idx}>
                    ❌ The password must contain numbers !
                  </span>
                  <br />
                </>
              );
            case "simbol":
              return (
                <>
                  <span style={{ color: "red" }} className="font-bold text-sm text-red-600" key={idx}>
                    {`❌ The passwords must contain symbols ' !@#$%^&*/><' `}
                  </span>
                </>
              );
            case "length":
              return (
                <>
                  <span style={{ color: "red" }} className="font-bold text-sm text-red-600"  key={idx}>
                    ❌ The password must contain 8 characters !
                  </span>
                <br />
                </>
              );
            case "empty":
              return (
                <>
                  <span style={{ color: "red" }} className="font-bold text-sm text-red-600"  key={idx}>
                    ❌ The password cannot be empty !
                  </span>
                  <br />
                </>
              );
          }
        })}
    </div>
  );
}

export default RegisterPage;
