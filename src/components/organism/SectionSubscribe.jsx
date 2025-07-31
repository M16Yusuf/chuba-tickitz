import React from "react";

function SectionSubscribe() {
  return (
    <main className="p-5">
      <section className="relative bg-blue-700 rounded-3xl py-20 p-5 flex flex-col">
        <span className="text-white text-3xl text-center font-normal">
          Subscribe to our newsletter
        </span>
        <form>
          <div className="flex flex-col gap-4 md:flex-row mt-5">
            <input
              className="w-full p-4 bg-[#2563eb] border border-white rounded-md text-white md:max-w-[230px]"
              type="text"
              placeholder="First name"
            />
            <input
              className="w-full p-4 bg-[#2563eb] border border-white rounded-md text-white md:max-w-[230px]"
              type="text"
              placeholder="Email address"
            />
            <button className="bg-white p-4 text-blue-700 rounded-md w-full md:max-w-[230px]">
              Subscibe Now
            </button>
          </div>
        </form>
        <div className="absolute bottom-[-40px] right-[-40px] w-32 h-32 border-4 border-white rounded-full"></div>
      </section>
    </main>
  );
}

export default SectionSubscribe;
