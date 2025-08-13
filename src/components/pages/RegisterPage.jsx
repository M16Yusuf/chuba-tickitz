import React, { Fragment, useState } from "react";

// import "../../assets/styles/pages/register-login.css";
import { Link, useNavigate } from "react-router";
import { LoginPersist } from "/src/components/Auth/LoginPersist.jsx";

function RegisterPage() {
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  const [toggleEye, setToggleEye] = useState(false);

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
    <main className="fixed h-screen w-screen overflow-y-auto bg-black/60 bg-[url('/bg-avenger.png')] bg-cover bg-fixed bg-center bg-no-repeat bg-blend-overlay">
      <section className="flex flex-col items-center">
        <div className="m-auto mt-5 w-[25%]">
          <img src="/logo-tickitz-white.png" alt="logo Tickitz" />
        </div>

        <div className="m-5 flex max-w-[480px] flex-col gap-5 self-center rounded-md bg-white p-5 py-10 md:w-full md:p-10">
          <div className="flex w-full flex-row justify-between">
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

          <form className="flex flex-col gap-5" onSubmit={submitData}>
            <div>
              <label htmlFor="ele_mail"> Email </label>
              <br />
              <input
                type="text"
                className="h-10 w-full rounded-xs border-2 border-[#aaaaaa] bg-white px-3"
                name="ele_mail"
                placeholder="Enter your email"
                id="ele_mail"
              />
            </div>
            <div className="pass-area">
              <label htmlFor="pass"> Password </label>
              <div className="flex w-full flex-row gap-0 rounded-xs border-2 border-[#aaaaaa] bg-white">
                <input
                  className="h-10 w-full px-3"
                  type={toggleEye ? "text" : "password"}
                  name="pass"
                  placeholder="Enter your Passwod"
                  id="pass"
                  onChange={validationInput}
                />
                <img
                  className="cursor-pointer p-1.5"
                  src={toggleEye ? "/icon-eye-off.svg" : "/icon-eye.svg"}
                  alt="eye"
                  onClick={() => setToggleEye(!toggleEye)}
                />
              </div>
              <ErrorProcess data={error} />
            </div>
            <div>
              <input type="checkbox" name="agree" id="agree" />
              <label htmlFor="agree">I agree to terms & conditions</label>
            </div>
            <div>
              <button
                className="h-14 w-full rounded-b-sm bg-blue-700 text-white"
                type="submit"
              >
                Join For Free Now
              </button>
            </div>
          </form>

          <div className="register">
            Already have an account?
            <Link className="text-blue-700" to="/login">
              Log in
            </Link>
          </div>

          {/* horizontal rule with or text */}
          <div class="relative flex items-center">
            <div class="flex-grow border-t border-gray-400"></div>
            <span class="mx-4 flex-shrink text-[12px] text-gray-400">Or</span>
            <div class="flex-grow border-t border-gray-400"></div>
          </div>

          {/* other login button */}
          <div className="flex flex-row justify-center gap-5 md:justify-between">
            <button
              className="flex flex-row gap-2.5 bg-white p-5 shadow-sm md:w-full"
              type="button"
            >
              <img src="/icon_google.svg" alt="icon_google" />
              <span className="text-title-info hidden md:block">Google</span>
            </button>
            <button
              className="flex flex-row gap-2.5 bg-white p-5 shadow-sm md:w-full"
              type="button"
            >
              <img src="/icon_facebook.svg" alt="icon_facebook" />
              <span className="text-title-info hidden md:block">Facebook</span>
            </button>
          </div>
        </div>
      </section>
    </main>
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
