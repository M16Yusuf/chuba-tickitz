import React, { Fragment, useState } from "react";

// import "../../assets/styles/pages/register-login.css";
import { Link } from "react-router";

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
    <div className="bgLoginRegister">
      <section className="relative m-auto flex flex-col items-center">
        <div className="mt-5 m-auto w-[25%]">
          <img src="/logo-tickitz-white.png" alt="logo Tickitz" />
        </div>

        <form>
          <div className="flex flex-col gap-4 bg-white rounded-md px-7 self-center w-[480px]">
            <div className="step flex flex-row justify-between">
              <div>
                <div className="bg-blue-700 text-white h-11 w-11 rounded-full content-center text-center">
                  1
                </div>
                Fill Form
              </div>
              <div>
                <div className="bg-[#a0a3bd] h-11 w-11 rounded-full content-center text-center">
                  2
                </div>
                Activate
              </div>
              <div>
                <div className="bg-[#a0a3bd] h-11 w-11 rounded-full content-center text-center">
                  3
                </div>
                Done
              </div>
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
            <div className="pass-area">
              <label htmlFor="pass"> Password </label>
              <br />
              <input
                type="password"
                className="w-[400px] h-10 rounded-xs bg-white border-2 border-[#aaaaaa] px-3"
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
              <button
                className="bg-blue-700 text-white w-[400px] h-14 rounded-b-sm"
                type="submit"
              >
                Join For Free Now
              </button>
            </div>
            <div className="register">
              Already have an account?
              <Link className="text-blue-700" to="/login">
                Log in
              </Link>
            </div>
            <hr className="hr_style" />
            <div>
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

/**
 * Digunakan untuk memproses list error validari input password
 * @param {string[]} props
 */
function ErrorProcess(props) {
  return (
    <div>
      {props.data.length > 0 &&
        props.data.map((eleError, idx) => {
          switch (eleError) {
            case "char":
              return (
                <>
                  <span
                    style={{ color: "red" }}
                    className="font-bold text-sm text-red-600"
                    key={idx}
                  >
                    ❌ The password must contain characters !
                  </span>
                  <br />
                </>
              );
            case "digit":
              return (
                <>
                  <span
                    style={{ color: "red" }}
                    className="font-bold text-sm text-red-600"
                    key={idx}
                  >
                    ❌ The password must contain numbers !
                  </span>
                  <br />
                </>
              );
            case "simbol":
              return (
                <>
                  <span
                    style={{ color: "red" }}
                    className="font-bold text-sm text-red-600"
                    key={idx}
                  >
                    {`❌ The passwords must contain symbols ' !@#$%^&*/><' `}
                  </span>
                  <br />
                </>
              );
            case "length":
              return (
                <>
                  <span
                    style={{ color: "red" }}
                    className="font-bold text-sm text-red-600"
                    key={idx}
                  >
                    ❌ The password must contain 8 characters !
                  </span>
                  <br />
                </>
              );
            case "empty":
              return (
                <>
                  <span
                    style={{ color: "red" }}
                    className="font-bold text-sm text-red-600"
                    key={idx}
                  >
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
