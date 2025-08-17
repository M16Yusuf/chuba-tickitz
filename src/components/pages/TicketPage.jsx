import { Link } from "react-router";

function BuyTicket() {
  return (
    <main className="bg-label-genre flex w-full flex-col justify-self-center md:flex-row 2xl:max-w-[1500px]">
      {/* section jumbotron */}
      <section className="relative h-[800px] w-full p-5 md:w-6/10">
        <img
          src="/bg-avenger.png"
          className="absolute inset-0 h-full w-full object-cover"
          alt="bg-avenger"
        />
        <div className="absolute inset-0 bg-[rgb(0,0,0,0.6)]"></div>

        <div className="absolute flex h-full flex-col items-center justify-center gap-10">
          <img
            src="/logo-tickitz-white.png"
            className="ms:w-[276px] w-32"
            alt="tickitz-logo"
          />
          <span className="text-center text-[32px] font-bold text-white md:text-start md:text-5xl">
            Thankyou For Purchasing
          </span>
          <p className="text-center text-lg font-light text-white md:text-start">
            Lorem ipsum dolor sit amet consectetur. Quam pretium pretium tempor
            integer sed magna et.
          </p>
          <span className="text-lg font-bold text-white">
            Please Download Your Ticket
            <soan className="hidden md:inline">→</soan>
          </span>
        </div>
      </section>

      {/* section ticket information */}
      <main className="p-3 py-10 md:px-20">
        <aside className="flex w-fit flex-col self-center justify-self-center">
          <div className="border-label-genre relative flex h-[295px] w-[295px] items-center justify-center border-b-2 bg-white">
            <img
              src="/dummy_qrcode.png"
              className="h-[186px] w-[186px]"
              alt=""
            />
            <div className="bg-label-genre absolute bottom-[-16px] left-[-16px] h-8 w-8 rounded-full"></div>
            <div className="bg-label-genre absolute right-[-16px] bottom-[-16px] h-8 w-8 rounded-full"></div>
          </div>
          <div className="border-label-genre w-[295px] border-t-2 bg-white p-5">
            <div class="grid grid-cols-2 gap-y-5">
              <div className="w-full">
                <label className="text-label text-[12px] font-semibold">
                  Movie
                </label>
                <span className="block text-[14px] font-semibold">
                  Spider-Man: ..
                </span>
              </div>
              <div className="w-full">
                <label className="text-label text-[12px] font-semibold">
                  Category
                </label>
                <span className="block text-[14px] font-semibold">PG-13</span>
              </div>
              <div className="w-full">
                <label className="text-label text-[12px] font-semibold">
                  Date
                </label>
                <span className="block text-[14px] font-semibold">07 Jul</span>
              </div>
              <div className="w-full">
                <label className="text-label text-[12px] font-semibold">
                  Time
                </label>
                <span className="block text-[14px] font-semibold">2:00pm</span>
              </div>
              <div className="w-full">
                <label className="text-label text-[12px] font-semibold">
                  Count
                </label>
                <span className="block text-[14px] font-semibold">3 pcs</span>
              </div>
              <div className="w-full">
                <label className="text-label text-[12px] font-semibold">
                  Seats
                </label>
                <span className="block text-[14px] font-semibold">
                  C4, C5, C6
                </span>
              </div>
            </div>
            <div className="border-label-genre flex w-full flex-row justify-between rounded-sm border-2 p-1.5">
              <span className="total-payment">Total</span> <span>$30.00</span>
            </div>
          </div>
          <div className="mt-5 flex w-full flex-col gap-2.5">
            <span className="border-blue-primary text-blue-primary block w-full rounded-md border p-2.5 text-center">
              Download
            </span>
            <Link
              to={"/profile"}
              className="bg-blue-primary block w-full rounded-md p-2.5 text-center text-white"
            >
              Done
            </Link>
          </div>
        </aside>
      </main>
    </main>
  );
}

export default BuyTicket;
