import React from "react";

function SectionSubscribe() {
  return (
    <main className="w-full p-5 md:max-w-[1440px] md:justify-self-center md:p-20">
      <section className="relative flex flex-col overflow-hidden rounded-3xl bg-blue-700 p-5 py-20">
        <span className="text-center text-3xl font-normal text-white">
          Subscribe to our newsletter
        </span>
        <form>
          <div className="mt-5 flex flex-col gap-4 md:flex-row md:justify-center">
            <input
              className="w-full rounded-md border border-white bg-[#2563eb] p-4 text-white md:max-w-[230px]"
              type="text"
              placeholder="First name"
            />
            <input
              className="w-full rounded-md border border-white bg-[#2563eb] p-4 text-white md:max-w-[230px]"
              type="text"
              placeholder="Email address"
            />
            <button className="w-full rounded-md bg-white p-4 text-blue-700 md:max-w-[230px]">
              Subscibe Now
            </button>
          </div>
        </form>
        <div className="absolute right-[-40px] bottom-[-40px] h-32 w-32 rounded-full border-4 border-white"></div>
      </section>
    </main>
  );
}

export default SectionSubscribe;
