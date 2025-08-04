import React, { Fragment, useState } from "react";

// import "../../assets/styles/pages/register-login.css";
import { Link, useNavigate } from "react-router";
import { LoginPersist } from "/src/components/Auth/LoginPersist.jsx";

function RegisterPage() {
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  function submitData(event) {
    event.preventDefault();
    const formEmail = event.target.ele_mail.value;
    const formPass = event.target.pass.value;
    setTimeout(() => {
      LoginPersist(formEmail, formPass);
    }, 1000);

    if (localStorage.getItem("koda3:login") != null) {
      navigate("/profile");
    }
  }

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
        <div className="m-auto mt-5 w-[25%]">
          <img src="/logo-tickitz-white.png" alt="logo Tickitz" />
        </div>

        <form onSubmit={submitData}>
          <div className="flex w-[480px] flex-col gap-4 self-center rounded-md bg-white px-7">
            <div className="step flex flex-row justify-between">
              <div>
                <div className="h-11 w-11 content-center rounded-full bg-blue-700 text-center text-white">
                  1
                </div>
                Fill Form
              </div>
              <div>
                <div className="h-11 w-11 content-center rounded-full bg-[#a0a3bd] text-center">
                  2
                </div>
                Activate
              </div>
              <div>
                <div className="h-11 w-11 content-center rounded-full bg-[#a0a3bd] text-center">
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
                className="h-10 w-[400px] rounded-xs border-2 border-[#aaaaaa] bg-white px-3"
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
                className="h-10 w-[400px] rounded-xs border-2 border-[#aaaaaa] bg-white px-3"
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
                className="h-14 w-[400px] rounded-b-sm bg-blue-700 text-white"
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

/**
 * Digunakan untuk memproses list error validari input password
 * @param {Object} props
 * @param {Array} props.data
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
                    className="text-sm font-bold text-red-600"
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
                    className="text-sm font-bold text-red-600"
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
                    className="text-sm font-bold text-red-600"
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
                    className="text-sm font-bold text-red-600"
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
                    className="text-sm font-bold text-red-600"
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
