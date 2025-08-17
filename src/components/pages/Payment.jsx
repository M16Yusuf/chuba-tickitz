import { useState } from "react";
import { Link } from "react-router";

function Payment() {
  const [isToggle, setIstoggle] = useState(false);

  return (
    <main className="bg-label-genre relative flex w-full flex-col gap-5 p-5 py-10 md:justify-self-center md:px-20">
      {/* status indicator */}
      <section className="mt-2 hidden flex-row justify-center gap-28 md:flex">
        <div>
          <div className="bg-active h-12 w-12 content-center rounded-full text-center text-white">
            ✓
          </div>
          <span>Dates And Time</span>
        </div>
        <div>
          <div className="bg-active h-12 w-12 content-center rounded-full text-center text-white">
            ✓
          </div>
          <span>Seat</span>
        </div>
        <div>
          <div className="bg-blue-primary h-12 w-12 content-center rounded-full text-center text-white">
            3
          </div>
          <span>Payment</span>
        </div>
      </section>
      {/* content form payment */}
      <section className="flex w-full self-center rounded-2xl bg-white p-3 md:max-w-3xl md:p-10">
        <form action="#" className="w-full">
          <div className="flex w-full flex-col gap-5">
            <span className="text-2xl font-bold">Payment Info</span>
            <div>
              <label className="text-secondary text-[14px]" htmlFor="date-time">
                DATE & TIME
              </label>
              <input
                type="text"
                id="date-time"
                defaultValue="Tuesday, 07 July 2020 at 02:00pm"
                className="border-label-genre h-10 w-full border-b-2"
              />
            </div>
            <div>
              <label
                className="text-secondary text-[14px]"
                htmlFor="title-movie"
              >
                MOVIE TITTLE
              </label>
              <input
                type="text"
                id="title-movie"
                defaultValue="Spider-Man: Homecoming"
                className="border-label-genre h-10 w-full border-b-2"
              />
            </div>
            <div>
              <label
                className="text-secondary text-[14px]"
                htmlFor="cinema-name"
              >
                CINEMA NAME
              </label>
              <input
                className="border-label-genre h-10 w-full border-b-2"
                type="text"
                id="cinema-name"
                defaultValue="CineOne21 Cinema"
              />
            </div>
            <div>
              <label
                className="text-secondary text-[14px]"
                htmlFor="number-ticket"
              >
                NUMBER OF TICKET
              </label>
              <input
                className="border-label-genre h-10 w-full border-b-2"
                type="text"
                id="number-ticket"
                defaultValue="3 pieces"
              />
            </div>
            <div>
              <label
                className="text-secondary text-[14px]"
                htmlFor="total-payment"
              >
                TOTAL PAYMENT
              </label>
              <input
                className="border-label-genre h-10 w-full border-b-2"
                type="text"
                id="total-payment"
                defaultValue="$30,00"
              />
            </div>

            <span className="text-2xl font-bold">PERSONAL INFORMATION</span>

            <div>
              <label className="text-secondary text-[14px]" htmlFor="full-name">
                Full Name
              </label>
              <input
                className="border-label-genre h-12 w-full border-2 px-4"
                type="text"
                id="full-name"
              />
            </div>
            <div>
              <label className="text-secondary text-[14px]" htmlFor="email">
                Email
              </label>
              <input
                className="border-label-genre h-12 w-full border-2 px-4"
                type="text"
                id="email"
              />
            </div>
            <div>
              <label className="text-secondary text-[14px]" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="border-label-genre h-12 w-full border-2 px-4"
                type="text"
                id="phone"
              />
            </div>

            <span className="text-2xl font-bold"> Payment Method </span>

            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              <div>
                <input
                  className="peer sr-only"
                  type="radio"
                  name="payment"
                  id="gplay"
                />
                <label
                  htmlFor="gplay"
                  className="border-label-genre peer-checked:bg-blue-primary flex h-12 w-[130px] items-center justify-center border-2 p-2.5 md:h-14 md:w-[146px]"
                >
                  <img src="/logos_google-pay.svg" alt="" />
                </label>
              </div>

              <div>
                <input
                  className="peer sr-only"
                  type="radio"
                  name="payment"
                  id="visa"
                />
                <label
                  htmlFor="visa"
                  className="border-label-genre peer-checked:bg-blue-primary flex h-12 w-[130px] items-center justify-center border-2 p-2.5 md:h-14 md:w-[146px]"
                >
                  <img src="/logos_visa.svg" alt="" />
                </label>
              </div>

              <div>
                <input
                  className="peer sr-only"
                  type="radio"
                  name="payment"
                  id="gopay"
                />
                <label
                  htmlFor="gopay"
                  className="border-label-genre peer-checked:bg-blue-primary flex h-12 w-[130px] items-center justify-center border-2 p-2.5 md:h-14 md:w-[146px]"
                >
                  <img src="/logos_gopay.svg" alt="" />
                </label>
              </div>

              <div>
                <input
                  className="peer sr-only"
                  type="radio"
                  name="payment"
                  id="paypal"
                />
                <label
                  htmlFor="paypal"
                  className="border-label-genre peer-checked:bg-blue-primary flex h-12 w-[130px] items-center justify-center border-2 p-2.5 md:h-14 md:w-[146px]"
                >
                  <img src="/logos_paypal.svg" alt="" />
                </label>
              </div>

              <div>
                <input
                  className="peer sr-only"
                  type="radio"
                  name="payment"
                  id="dana"
                />
                <label
                  htmlFor="dana"
                  className="border-label-genre peer-checked:bg-blue-primary flex h-12 w-[130px] items-center justify-center border-2 p-2.5 md:h-14 md:w-[146px]"
                >
                  <img src="/logos_dana.png" alt="" />
                </label>
              </div>

              <div>
                <input
                  className="peer sr-only"
                  type="radio"
                  name="payment"
                  id="bca"
                />
                <label
                  htmlFor="bca"
                  className="border-label-genre peer-checked:bg-blue-primary flex h-12 w-[130px] items-center justify-center border-2 p-2.5 md:h-14 md:w-[146px]"
                >
                  <img src="/logos_bca.svg" alt="" />
                </label>
              </div>

              <div>
                <input
                  className="peer sr-only"
                  type="radio"
                  name="payment"
                  id="bri"
                />
                <label
                  htmlFor="bri"
                  className="border-label-genre peer-checked:bg-blue-primary flex h-12 w-[130px] items-center justify-center border-2 p-2.5 md:h-14 md:w-[146px]"
                >
                  <img src="/logos_bri.svg" alt="" />
                </label>
              </div>

              <div>
                <input
                  className="peer sr-only"
                  type="radio"
                  name="payment"
                  id="ovo"
                />
                <label
                  htmlFor="ovo"
                  className="border-label-genre peer-checked:bg-blue-primary flex h-12 w-[130px] items-center justify-center border-2 p-2.5 md:h-14 md:w-[146px]"
                >
                  <img src="/logos_ovo.svg" alt="" />
                </label>
              </div>
            </div>

            <button
              className="bg-blue-primary h-14 w-full rounded-sm text-white"
              type="button"
              id="myBtn"
              onClick={() => setIstoggle(!isToggle)}
            >
              Pay your order
            </button>
          </div>
        </form>
      </section>
      {/* bg modal */}
      <div
        className={`${!isToggle ? "hidden" : "block"} absolute inset-0 bg-[rgb(0,0,0,0.8)]`}
      ></div>
      {/* modal content */}
      <section
        className={`${!isToggle ? "hidden" : "flex"} absolute top-1/2 left-1/2 w-full max-w-[573px] -translate-x-1/2 flex-col p-10`}
      >
        <div className="flex flex-col gap-2.5 rounded-2xl bg-white p-3.5">
          <span className="block text-center text-2xl font-bold">
            Payment Info
          </span>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <label className="text-secondary text-[14px] font-normal">
              No. Rekening Virtual :
            </label>
            <div className="flex flex-row items-center justify-between">
              <span className="text-lg font-bold md:px-2.5">
                12321328913829724
              </span>
              <span className="border-blue-primary text-blue-primary border-1 p-1">
                copy
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between">
            <label className="text-secondary text-[14px] font-normal">
              Total payment
            </label>
            <div className="text-blue-primary text-lg font-bold">$30</div>
          </div>

          <p className="text-secondary text-[16px]">
            Pay this payment bill before it is due,
            <span className="text-importan">on June 23, 2023</span>. If the bill
            has not been paid by the specified time, it will be forfeited
          </p>

          <Link
            to={"/movies/ticket"}
            className="bg-blue-primary block border-1 p-2.5 text-center text-white"
          >
            Check Payment
          </Link>

          <span
            className="text-blue-primary border-blue-primary block border-1 p-2.5 text-center"
            onClick={() => setIstoggle(!isToggle)}
          >
            Pay Later
          </span>
        </div>
      </section>
    </main>
  );
}

export default Payment;
