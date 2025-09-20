import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// component
import CardHistory from "./../../organism/CardHistory";
import UpdateAvatar from "./../../organism/UpdateAvatar";
// import redux state
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../../redux/slice/authSlice";
import { userAction } from "../../../redux/slice/userSlice";

function Profile() {
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleModalAvatar, setToggleModalAvatar] = useState(false);
  const [isDetailOrHistory, setDetailOrHistory] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [histories, setHistories] = useState([]);

  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // disable button logic
  const isButtonDisabled =
    !newPassword || !confirmPassword || newPassword !== confirmPassword;

  // delete auth/user/logout
  function deleteSession() {
    dispatch(authAction.resetAuthState());
    dispatch(userAction.deleteUserState());
  }

  // function for update profile
  async function submitUpdateProfile(event) {
    event.preventDefault();
    const data = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      phone: event.target.phone_number.value,
    };

    try {
      const responseData = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_HOST_URL}/users`,
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.user.token}`,
        },
      });

      // send update notification if success update profile
      if (responseData.status === 200) {
        toast.success("Profile updated", {
          position: "top-center",
          theme: "colored",
        });
      }
      // close modal after update
      setToggleModal(false);
      // update user redux state after success update
      dispatch(userAction.getUserThunk(authState.user.token));
    } catch (error) {
      console.log(error);
      // if error bacuse unauthorized, delete all data session (expired token)
      if (error.status == 401) {
        deleteSession();
      }
      // error notification
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile. Please try again.",
        {
          position: "top-center",
          theme: "colored",
        },
      );
    }
  }

  // function for update password
  async function submitUpdatePassword(event) {
    event.preventDefault();
    const data = {
      email: userState.user.email,
      password: event.target.pass.value,
    };

    try {
      const responseData = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_HOST_URL}/users/password`,
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.user.token}`,
        },
      });

      // send update notification if success update password
      if (responseData.status === 200) {
        toast.success("Password updated", {
          position: "top-center",
          theme: "colored",
        });
      }
      // close modal after update
      setToggleModal(false);
      // update user redux state after success update
      dispatch(userAction.getUserThunk(authState.user.token));
    } catch (error) {
      // if error bacuse unauthorized, delete all data session (expired token)
      if (error.status == 401) {
        deleteSession();
      }
      // error notification
      toast.error(
        error.response?.data?.message ||
          `Failed to update password, ${error.response.data.error}`,
        {
          position: "top-center",
          theme: "colored",
        },
      );
    }
  }

  // on render component
  useEffect(() => {
    dispatch(userAction.getUserThunk(authState.user.token));

    // display toastify welcome message
    if (authState.justLoggedIn) {
      toast.success(
        `Welcome back ${authState.user.first_name} ${authState.user.last_name}!`,
        {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: false,
        },
      );
      dispatch(authAction.clearJustLoggedIn()); // reset flag
    }

    // fetch histories data user
    (async function () {
      try {
        const responseData = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_HOST_URL}/histories`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.user.token}`,
          },
        });
        // Destructuring response data
        const {
          data: { data: resultdata },
        } = responseData;
        setHistories(resultdata);
      } catch (error) {
        // if error bacuse unauthorized, delete all data session
        if (error.status == 401) {
          deleteSession();
        }
      }
    })();
  }, []);

  return (
    <main className="bg-background w-full justify-self-center md:px-20">
      <ToastContainer />
      {/* section navigation switch "detail account" or "order history" on small screen */}
      <div className="flex w-full flex-row justify-around bg-white shadow-md md:hidden">
        <span
          className={`${isDetailOrHistory && "border-blue-primary block border-b-2 text-black"} p-4 text-[#AAAAAA]`}
          onClick={() => setDetailOrHistory(true)}
        >
          Details Account
        </span>
        <span
          className={`${!isDetailOrHistory && "border-blue-primary block border-b-2 text-black"} p-4 text-[#AAAAAA]`}
          onClick={() => setDetailOrHistory(false)}
        >
          Order History
        </span>
      </div>

      {/* main contern */}
      <main className="h-max items-start md:flex md:flex-row md:p-5">
        {/* aside: profile card section */}
        <aside
          className={`${!isDetailOrHistory && "hidden"} flex flex-col items-center px-4 py-8 md:block md:w-96 md:px-0`}
        >
          <div className="w-full min-w-3xs rounded-t-lg border-b border-gray-200 bg-white p-8 shadow-md">
            <div className="mt-3 flex flex-row justify-between">
              <span>INFO</span>
              <img
                src="/icon-blue-threedot.svg"
                className="hidden h-7 w-7 md:block"
                alt="threedot"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <img
                  className="h-[136px] w-[136px] rounded-full object-cover shadow-md"
                  src={`${!userState.user.profile_path ? "/profile_default.jpg" : `${import.meta.env.VITE_HOST_URL}/img/profile/${userState.user.profile_path}`}`}
                  alt="profile_page"
                />
                <img
                  className="absolute right-2 bottom-0 h-8 w-8 cursor-pointer rounded-full bg-white p-1.5 hover:scale-105"
                  src="/edit.svg"
                  onClick={() => setToggleModalAvatar(!toggleModalAvatar)}
                />
              </div>
              <span className="text-xl font-semibold text-[#14142B]">
                {`${userState.user.first_name} ${userState.user.last_name}`}
              </span>
              <span className="text-xs text-[#4E4B66]">Moviegoers</span>
            </div>
          </div>
          <div className="flex w-full min-w-3xs flex-col gap-4 rounded-b-lg border-t border-gray-200 bg-white p-8 shadow-md">
            <span className="text-base text-[#4E4B66]">Loyalty Points</span>
            <div className="relative h-32 max-w-64 rounded-xl bg-[#1D4ED8]">
              <div className="absolute top-[-63px] right-[-20px] h-32 w-32 rounded-full bg-[#FFFFFF4D]"></div>
              <div className="absolute top-[-20px] right-[-50px] h-32 w-32 rounded-full bg-[#FFFFFF4D]"></div>
              <img
                className="absolute top-0 right-0 h-[63px] w-[63px]"
                src="/icon-star-fill.svg"
                alt="icon_star"
              />
              <span className="absolute top-5 left-4 text-xs text-white">
                Moviegoers
              </span>
              <span className="absolute bottom-5 left-4 text-2xl text-white">
                {userState.user.point}
                <span className="text-[10px]">points</span>
              </span>
            </div>

            <span className="text-[16px] text-[#4E4B66]">
              180 points become a master
            </span>
            <div className="h-4 w-full rounded-xl bg-white shadow-[inset_0_2px_8px_gray]">
              <div className="h-4 w-[50%] rounded-xl bg-[#1D4ED8]"></div>
            </div>
            <span
              className="block w-full rounded-2xl border border-[#1D4ED8] p-4 text-center text-[#1D4ED8] md:hidden"
              onClick={() => setToggleModal(!toggleModal)}
            >
              Edit profile
            </span>
          </div>
        </aside>

        {/* bg modal div smallscreen for profile */}
        <div
          className={`${!toggleModal && "hidden"} fixed inset-0 bg-[rgb(0,0,0,0.8)]`}
          onClick={() => setToggleModal(!toggleModal)}
        ></div>
        {/* bg modal for update profile */}
        <div
          className={`${!toggleModalAvatar && "hidden"} fixed inset-0 bg-[rgb(0,0,0,0.8)]`}
          onClick={() => setToggleModalAvatar(!toggleModalAvatar)}
        ></div>

        <section
          className={`flex flex-col justify-center gap-6 p-8 md:m-[28px] md:w-full md:gap-5 md:p-0`}
        >
          {/* navigation switch "detail account" or "order history" on big screen */}
          <div className="hidden md:mb-5 md:flex md:h-max md:w-full md:flex-row md:rounded-xl md:bg-white md:pl-4 md:shadow-md">
            <span
              className={`${isDetailOrHistory && "border-blue-primary border-b-2 text-black"} block p-4 text-[#AAAAAA]`}
              onClick={() => setDetailOrHistory(true)}
            >
              Details Account
            </span>
            <span
              className={`${!isDetailOrHistory && "border-blue-primary border-b-2 text-black"} block p-4 text-[#AAAAAA]`}
              onClick={() => setDetailOrHistory(false)}
            >
              Order History
            </span>
          </div>

          {/* content for Detail account */}
          <section
            className={`${!isDetailOrHistory && "hidden md:hidden"} absolute top-[120px] left-1/2 -translate-x-1/2 transform md:static md:flex md:translate-none md:transform-none md:flex-col md:gap-5 md:bg-[rgb(0,0,0,0)]`}
          >
            {/* user details can be a form edit, and modal form in small screen */}
            <div
              className={`${!toggleModal && "hidden"} w-2xs rounded-xl bg-white p-4 md:flex md:w-full md:flex-col md:gap-5 md:bg-[rgb(0,0,0,0)] md:p-0`}
            >
              {/* <!-- Detail informastion --> */}
              <span className="text-2xl font-bold md:hidden">
                Account Settings
              </span>
              {/* first form for update profile */}
              <form
                onSubmit={submitUpdateProfile}
                className="flex flex-col gap-5 bg-white md:rounded-xl md:p-5 md:shadow-md"
              >
                <span className="block w-full border-b border-gray-300 p-1">
                  Detail Information
                </span>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-base text-[#4E4B66]">
                      First Name
                    </label>
                    <input
                      className="w-full rounded-md border border-gray-300 p-2"
                      name="first_name"
                      type="text"
                      defaultValue={userState.user.first_name}
                    />
                  </div>
                  <div>
                    <label className="text-base text-[#4E4B66]">
                      Last Name
                    </label>
                    <input
                      className="w-full rounded-md border border-gray-300 p-2"
                      name="last_name"
                      type="text"
                      defaultValue={userState.user.last_name}
                    />
                  </div>
                  <div>
                    <label className="text-base text-[#4E4B66]">Email</label>
                    <input
                      className="w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-500"
                      type="text"
                      defaultValue={userState.user.email}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-base text-[#4E4B66]">
                      Phone Number
                    </label>
                    <input
                      className="w-full rounded-md border border-gray-300 p-2"
                      name="phone_number"
                      type="text"
                      defaultValue={userState.user.phone}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mb-5 block w-full cursor-pointer rounded-lg bg-blue-800 p-4 text-center text-white md:w-80"
                >
                  Update Change
                </button>
              </form>
              {/* second form for update password */}
              <form
                onSubmit={submitUpdatePassword}
                className="flex flex-col gap-5 bg-white md:rounded-xl md:p-5 md:shadow-md"
              >
                <span className="block w-full border-b border-gray-300 p-1">
                  Account and Privacy
                </span>
                <div className="md:flex md:w-full md:flex-row md:gap-5">
                  <div>
                    <label className="text-base text-[#4E4B66]">
                      New Password
                    </label>
                    <input
                      className="w-full rounded-md border border-gray-300 p-2"
                      type="password"
                      placeholder="New password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className={`${newPassword == confirmPassword ? "text-[#4E4B66]" : "text-red-600"} text-base`}
                    >
                      Confirm Password
                    </label>
                    <input
                      className={`${newPassword == confirmPassword ? "border-gray-300" : "border-red-600 text-red-600"} w-full rounded-md border-2 p-2`}
                      name="pass"
                      type="password"
                      placeholder="Confirm new password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className={`${isButtonDisabled ? "cursor-not-allowed bg-gray-400" : "bg-blue-800"} mb-5 block w-full rounded-lg p-4 text-center text-white md:w-80`}
                  disabled={isButtonDisabled}
                >
                  Update password
                </button>
              </form>
            </div>
          </section>

          {/* form update avatar/profile */}
          <div
            className={`${!toggleModalAvatar && "hidden md:hidden"} fixed inset-0 flex items-center justify-center`}
          >
            <UpdateAvatar setToggleModalAvatar={setToggleModalAvatar} />
          </div>

          {/* section for content order history */}
          <section
            className={`${isDetailOrHistory && "hidden md:hidden"} flex flex-col gap-7 md:w-full md:bg-[rgb(0,0,0,0)] md:p-0`}
          >
            {histories.length > 0 &&
              histories.map((history) => {
                return (
                  <CardHistory
                    dataHistory={history}
                    key={history.transaction_id}
                  />
                );
              })}
          </section>
        </section>
      </main>
    </main>
  );
}

export default Profile;
