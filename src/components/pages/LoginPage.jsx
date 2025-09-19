import { useEffect, useState } from "react";
import { Link } from "react-router";
// toastify
import { ToastContainer, toast } from "react-toastify";
// redux state auth
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../redux/slice/authSlice";

function LoginPage() {
  const [toggleEye, setToggleEye] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  // function for onsubmit handler login
  function loginHandler(event) {
    event.preventDefault();
    const email = event.target.ele_mail.value;
    const password = event.target.pass.value;
    // validate login inputs
    if (email.length == 0 || password.length == 0) {
      setError("Email / password cannot be empty");
      return;
    }
    const data = {
      email: email,
      password: password,
    };
    // dispatch inputs to thunk
    dispatch(authAction.postLoginThunk(data));
  }

  useEffect(() => {
    if (
      authState.error &&
      authState.error.payload &&
      authState.error.payload.error
    ) {
      toast.error(authState.error.payload.error, {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: false,
      });
      dispatch(authAction.resetAuthState());
    }
  }, [authState.error]);

  return (
    <main className="fixed h-screen w-screen overflow-y-auto bg-black/60 bg-[url('/bg-avenger.png')] bg-cover bg-fixed bg-center bg-no-repeat bg-blend-overlay">
      <ToastContainer />
      <section className="flex flex-col items-center">
        <div className="m-auto mt-5 w-[25%]">
          <img src="/logo-tickitz-white.png" alt="logo Tickitz" />
        </div>
        <div className="m-5 flex max-w-[480px] flex-col gap-5 self-center rounded-md bg-white p-5 py-10 md:p-10">
          <div>
            <span>Welcome Back👋</span>
            <p className="text-secondary">
              Sign in with your data that you entered during your registration
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={loginHandler}>
            <div>
              <label htmlFor="ele_mail" className="text-title-info">
                Email
              </label>
              <input
                type="text"
                className="h-10 w-full rounded-xs border-2 border-[#aaaaaa] bg-white px-3"
                name="ele_mail"
                placeholder="Enter your email"
                id="ele_mail"
              />
            </div>
            <div>
              <label htmlFor="pass" className="text-title-info">
                Password
              </label>
              <div className="flex w-full flex-row gap-0 rounded-xs border-2 border-[#aaaaaa] bg-white">
                <input
                  className="h-10 w-full px-3"
                  type={toggleEye ? "text" : "password"}
                  name="pass"
                  placeholder="Enter your Passwod"
                  id="pass"
                />
                <img
                  className="cursor-pointer p-1.5"
                  src={toggleEye ? "/icon-eye-off.svg" : "/icon-eye.svg"}
                  alt="eye"
                  onClick={() => setToggleEye(!toggleEye)}
                />
              </div>
            </div>
            {error && (
              <p className="text-importan border-importan rounded-sm border bg-red-200 p-1 text-sm">
                {error}
              </p>
            )}
            <div className="flex justify-end">
              <Link className="text-end text-blue-700" to="/register">
                Forgot your password?
              </Link>
            </div>
            <div>
              <button
                className="h-14 w-full rounded-b-sm bg-blue-700 text-white"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>

          {/* horizontal rule with or text */}
          <div className="relative flex items-center py-2.5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink text-[12px] text-gray-400">
              Or
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

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

export default LoginPage;
