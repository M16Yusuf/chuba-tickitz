import { useState } from "react";
import profile_image from "/src/assets/img/profile_image.jpg";

// component
import CardHistory from "./../../organism/CardHistory";

function Profile() {
  const [toggleModal, setToggleModal] = useState(false);
  const [isDetailOrHistory, setDetailOrHistory] = useState(true);

  const dummydata = {
    first: "Muhammad",
    last: "Yusuf",
    email: "yusufsmd58@gmail.com",
    hp: "082240563847",
    pwd: "admin@123",
  };

  const dummyHistory = [
    {
      movie_id: 1311031,
      movie_title: "Demon Slayer: Kimetsu no Yaiba — Infinity Castle",
      date: "Thursday, 28 August 2025 - 07:30 pm",
      category: "PG-13",
      seat: ["C4", "C5", "C6"],
      price: 10,
      total: 30,
      place: "ebv",
      va: "12321328913829724",
      is_paid: false,
      data: "/dummy_qrcode.png",
    },
    {
      movie_id: 378064,
      movie_title: "A Silent Voice: The Movie",
      date: "Wednesday, 15 May 2018 - 02:30 pm",
      category: "PG-13",
      seat: ["D6", "D7"],
      price: 10,
      total: 20,
      place: "cineone21",
      va: "4232871345915311",
      is_paid: true,
      data: "/dummy_qrcode.png",
    },
  ];
  return (
    <main className="bg-background w-full justify-self-center md:px-20">
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
              onClick={() => setToggleModal(!toggleModal)}
            >
              Edit profile
            </span>
          </div>
        </aside>

        {/* bg modal div */}
        <div
          className={`${!toggleModal && "hidden"} fixed inset-0 bg-[rgb(0,0,0,0.8)]`}
          onClick={() => setToggleModal(!toggleModal)}
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
            {/* as modal */}
            <div
              className={`${!toggleModal && "hidden"} w-2xs rounded-xl bg-white p-4 md:flex md:w-full md:flex-col md:gap-5 md:bg-[rgb(0,0,0,0)] md:p-0`}
            >
              {/* <!-- Detail informastion --> */}
              <span className="text-2xl font-bold md:hidden">
                Account Settings
              </span>
              <div className="flex flex-col gap-5 bg-white md:rounded-xl md:p-5 md:shadow-md">
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
                      type="text"
                      defaultValue={dummydata.first}
                    />
                  </div>
                  <div>
                    <label className="text-base text-[#4E4B66]">
                      Last Name
                    </label>
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
                    <label className="text-base text-[#4E4B66]">
                      Phone Number
                    </label>
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
                    <label className="text-base text-[#4E4B66]">
                      New Password
                    </label>
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
              {/* button change update for wide screen */}
              <span className="mt-5 block w-full rounded-lg bg-blue-800 p-4 text-center text-white md:w-80">
                Update Change
              </span>
            </div>
          </section>

          {/* section for content order history */}
          <section
            className={`${isDetailOrHistory && "hidden md:hidden"} flex flex-col gap-7 md:w-full md:bg-[rgb(0,0,0,0)] md:p-0`}
          >
            {dummyHistory.length > 0 &&
              dummyHistory.map((history, idx) => {
                return <CardHistory dataHistory={history} key={idx} />;
              })}
          </section>
        </section>
      </main>
    </main>
  );
}

export default Profile;
