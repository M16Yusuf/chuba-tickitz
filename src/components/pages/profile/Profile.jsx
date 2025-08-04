import profile_image from "/src/assets/img/profile_image.jpg";

function Profile() {
  const dummydata = {
    first: "Muhammad",
    last: "Yusuf",
    email: "yusufsmd58@gmail.com",
    hp: "082240563847",
    pwd: "admin@123",
  };
  return (
    <main className="h-max justify-center bg-[#f5f5f5] md:flex md:flex-row md:p-5">
      <aside className="flex flex-col items-center p-8 md:w-96">
        <div className="w-full rounded-t-lg border-b border-gray-200 bg-white p-8 shadow-md">
          <div className="mt-3 flex flex-row justify-between">
            <span>INFO</span>
            <svg
              className="hidden md:block"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0013 16.3332C15.29 16.3332 16.3346 15.2885 16.3346 13.9998C16.3346 12.7112 15.29 11.6665 14.0013 11.6665C12.7126 11.6665 11.668 12.7112 11.668 13.9998C11.668 15.2885 12.7126 16.3332 14.0013 16.3332Z"
                fill="#5F2EEA"
              />
              <path
                d="M22.1654 16.3332C23.454 16.3332 24.4987 15.2885 24.4987 13.9998C24.4987 12.7112 23.454 11.6665 22.1654 11.6665C20.8767 11.6665 19.832 12.7112 19.832 13.9998C19.832 15.2885 20.8767 16.3332 22.1654 16.3332Z"
                fill="#5F2EEA"
              />
              <path
                d="M5.83333 16.3332C7.122 16.3332 8.16667 15.2885 8.16667 13.9998C8.16667 12.7112 7.122 11.6665 5.83333 11.6665C4.54467 11.6665 3.5 12.7112 3.5 13.9998C3.5 15.2885 4.54467 16.3332 5.83333 16.3332Z"
                fill="#5F2EEA"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img
              className="h-[136px] w-[136px] rounded-full shadow-md"
              src={profile_image}
              alt="profile_page"
            />
            <span className="text-xl font-semibold text-[#14142B]">
              Muhammad Yusuf
            </span>
            <span className="text-xs text-[#4E4B66]">Moviegoers</span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 rounded-b-lg border-t border-gray-200 bg-white p-8 shadow-md">
          <span className="text-base text-[#4E4B66]">Loyalty Points</span>
          <div className="relative h-32 max-w-64 rounded-xl bg-[#1D4ED8]">
            <div className="absolute top-[-63px] right-[-20px] h-32 w-32 rounded-full bg-[#FFFFFF4D]"></div>
            <div className="absolute top-[-20px] right-[-50px] h-32 w-32 rounded-full bg-[#FFFFFF4D]"></div>
            {/* <!-- svg star --> */}
            <img
              className="absolute top-0 right-0 h-[63px] w-[63px]"
              src="/icon-star-fill.svg"
              alt="icon_star"
            />
            <span className="absolute top-5 left-4 text-xs text-white">
              Moviegoers
            </span>
            <span className="absolute bottom-5 left-4 text-2xl text-white">
              320<span className="text-[10px]">points</span>
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
            id="btn-modal-profile"
          >
            Edit profile
          </span>
        </div>
      </aside>

      <div
        className="fixed inset-0 hidden bg-[rgb(0,0,0,0.8)]"
        id="bg-modal-profile"
      ></div>

      {/* <!-- hidden --> */}
      <section
        className="absolute top-[120px] m-[28px] hidden flex-col gap-6 rounded-xl bg-white p-4 md:static md:flex md:flex-col md:gap-5 md:bg-[rgb(0,0,0,0)]"
        id="section-account-seting"
      >
        {/* <!-- hide when small screen --> */}
        <div className="hidden md:mb-5 md:flex md:h-max md:flex-row md:rounded-xl md:bg-white md:pl-4 md:shadow-md">
          <span className="block md:border-b-2 md:border-blue-800 md:p-4">
            {" "}
            Details Account{" "}
          </span>
          <span className="block text-[#AAAAAA] md:p-4"> Order Histori </span>
        </div>
        {/* <!-- show when small screen --> */}
        <span className="text-2xl font-bold md:hidden">Account Settings</span>
        {/* <!-- Detail informastion --> */}
        <div className="flex flex-col gap-5 bg-white md:rounded-xl md:p-5 md:shadow-md">
          <span className="block w-full border-b border-gray-300 p-1">
            Detail Information
          </span>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-base text-[#4E4B66]">First Name</label>
              <input
                className="w-full rounded-md border border-gray-300 p-2"
                type="text"
                defaultValue={dummydata.first}
              />
            </div>
            <div>
              <label className="text-base text-[#4E4B66]">Last Name</label>
              <input
                className="w-full rounded-md border border-gray-300 p-2"
                type="text"
                defaultValue={dummydata.last}
              />
            </div>
            <div>
              <label className="text-base text-[#4E4B66]">Email</label>
              <input
                className="w-full rounded-md border border-gray-300 p-2"
                type="text"
                defaultValue={dummydata.email}
              />
            </div>
            <div>
              <label className="text-base text-[#4E4B66]">Phone Number</label>
              <input
                className="w-full rounded-md border border-gray-300 p-2"
                type="text"
                defaultValue={dummydata.hp}
              />
            </div>
          </div>
        </div>

        {/* <!-- account and privacy --> */}
        <div className="flex flex-col gap-5 bg-white md:rounded-xl md:p-5 md:shadow-md">
          <span className="block w-full border-b border-gray-300 p-1">
            Account and Privacy
          </span>
          <div className="md:flex md:w-full md:flex-row md:gap-5">
            <div>
              <label className="text-base text-[#4E4B66]">New Password</label>
              <input
                className="w-full rounded-md border border-gray-300 p-2"
                type="password"
                defaultValue={dummydata.pwd}
              />
            </div>
            <div>
              <label className="text-base text-[#4E4B66]">
                Confirm Password
              </label>
              <input
                className="w-full rounded-md border border-gray-300 p-2"
                type="password"
                defaultValue={dummydata.pwd}
              />
            </div>
          </div>
        </div>

        <span className="block w-full rounded-lg bg-blue-800 p-4 text-center text-white md:w-80">
          Update Change
        </span>
      </section>
    </main>
  );
}

export default Profile;
