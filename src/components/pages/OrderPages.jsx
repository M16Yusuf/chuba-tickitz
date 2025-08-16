import { useState } from "react";
import { Link } from "react-router";

// component
import OrderSeat from "./../organism/OrderSeat";

function OrderPages() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const price = 10;

  const rows = ["A", "B", "C", "D", "E", "F", "G"];
  const generateSeats = (startCol) => {
    const seats = [];
    for (let row of rows) {
      for (let col = startCol; col < startCol + 7; col++) {
        seats.push(`${row}${col}`);
      }
    }
    return seats;
  };

  const leftSeats = generateSeats(1);
  const rightSeats = generateSeats(8);

  const handleChange = (e) => {
    setSelectedSeats((prev) =>
      prev.includes(e.target.name)
        ? prev.filter((s) => s !== e.target.name)
        : [...prev, e.target.name],
    );
  };

  return (
    <>
      <main className="bg-label-genre flex w-full flex-col gap-5 p-3 py-10 md:justify-self-center md:px-20">
        {/* <!-- section status --> */}
        <section className="mt-10 hidden flex-row justify-center gap-28 md:flex">
          <div>
            <div className="bg-active h-12 w-12 content-center rounded-full text-center text-white">
              ✓
            </div>
            <span>Dates And Time</span>
          </div>
          <div>
            <div className="bg-blue-primary h-12 w-12 content-center rounded-full text-center text-white">
              2
            </div>
            <span>Seat</span>
          </div>
          <div>
            <div className="bg-secondary h-12 w-12 content-center rounded-full text-center text-white">
              3
            </div>
            <span>Payment</span>
          </div>
        </section>

        {/* <!-- section body-order --> */}
        <section class="mb-20 flex flex-col justify-center gap-2.5 md:flex-row">
          <div class="flex flex-col rounded-md bg-white shadow-md">
            {/* <!-- div for seat --> */}
            <div class="border-label-genre m-1.5 flex flex-col items-center gap-2.5 border-2 p-1.5 md:flex-row">
              {/* <!-- div movies --> */}
              <div className="h-44 w-full bg-[url('/spiderman_homecoming.png')] bg-cover bg-center bg-no-repeat md:h-[117px] md:w-[184px]"></div>
              <div className="flex flex-col items-center md:items-start">
                <span className="block text-center text-2xl font-normal">
                  Spider-Man: Homecoming
                </span>
                <div className="flex flex-row flex-wrap">
                  <span className="text-secondary bg-label-genre m-1.5 rounded-[20px] p-2">
                    Action
                  </span>
                  <span className="text-secondary bg-label-genre m-1.5 rounded-[20px] p-2">
                    Adventure
                  </span>
                </div>
                <span className="m-2.5 block">Regular - 13:00 PM </span>
              </div>
              <div className="flex flex-row items-end">
                <span className="text-blue-primary md:bg-blue-primary h-8 w-28 justify-self-center rounded-3xl bg-[rgba(29,78,216,0.2)] text-center md:rounded-sm md:text-white">
                  Change
                </span>
              </div>
            </div>

            {/* seat grid */}
            <div className="w-full overflow-x-scroll">
              <div className="w-[590px] space-y-4 p-4">
                <div className="text-center font-semibold text-gray-500">
                  Screen
                </div>
                <div className="bg-label-genre h-2.5 w-full"></div>

                <div className="flex justify-center gap-2">
                  <div className="mr-1 flex flex-col gap-1">
                    {rows.map((row) => (
                      <div
                        key={row}
                        className="h-8 w-8 items-center justify-center text-sm text-gray-700 md:flex"
                      >
                        {row}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {leftSeats.map((seatId) => (
                      <OrderSeat
                        key={seatId}
                        id={seatId}
                        name={seatId}
                        selectedSeats={selectedSeats}
                        onChange={handleChange}
                      />
                    ))}
                  </div>

                  <div className="w-4"></div>

                  <div className="grid grid-cols-7 gap-1">
                    {rightSeats.map((seatId) => (
                      <OrderSeat
                        key={seatId}
                        id={seatId}
                        name={seatId}
                        selectedSeats={selectedSeats}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </div>

                {/* label seat bottom */}
                <div className="mt-2 flex justify-center gap-2">
                  <div className="w-8"></div>
                  {/* label seat 1-7 */}
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 text-center text-sm text-gray-700 md:block"
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  <div className="w-4"></div>
                  {/* label seat 8-14 */}
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div
                        key={i + 7}
                        className="h-8 w-8 text-center text-sm text-gray-700 md:block"
                      >
                        {i + 8}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- div seating key --> */}
            <div class="flex flex-col gap-2.5 p-5">
              <span>Saeting key</span>
              <div className="flex flex-row flex-wrap justify-center gap-5">
                <div class="key-seat-available flex flex-row">
                  <div className="h-6 w-6 rounded-sm bg-gray-300"></div>
                  <span>available</span>
                </div>
                <div class="key-seat-selected flex flex-row">
                  <div className="bg-blue-primary h-6 w-6 rounded-sm"></div>
                  <span>Selected</span>
                </div>
                <div class="key-seat-love flex flex-row">
                  <div className="h-6 w-6 rounded-sm bg-pink-400"></div>
                  <span>Love Nest</span>
                </div>
                <div class="key-seat-sold flex flex-row">
                  <div className="bg-label h-6 w-6 rounded-sm"></div>
                  <span>Sold</span>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- div for detail payment --> */}
          <div class="flex h-fit w-full flex-col gap-2.5 rounded-sm bg-white p-7 shadow-md md:max-w-[350px]">
            <div className="m-5 flex flex-col items-center">
              {/* <!-- title --> */}
              <img src="/logo-CineOne21.svg" alt="" /> <br />
              <span className="text-center text-2xl font-normal">
                CineOne21 Cinema
              </span>
            </div>
            {/* <!-- detail --> */}
            <div class="flex flex-col gap-2.5">
              <div className="flex flex-row justify-between">
                <label className="text-secondary text-[14px] font-extralight text-nowrap">
                  Movie selected
                </label>
                <span className="text-end text-[14px] font-medium text-nowrap text-black">
                  Spider-Man: Homecoming
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <label className="text-secondary text-[14px] font-extralight text-nowrap">
                  Tuesday, 07 July 2020
                </label>
                <span className="text-end text-[14px] font-medium text-nowrap text-black">
                  13:00pm
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <label className="text-secondary text-[14px] font-extralight text-nowrap">
                  One ticket price
                </label>
                <span className="text-end text-[14px] font-medium text-nowrap text-black">
                  {`$${price}`}
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <label className="text-secondary text-[14px] font-extralight text-nowrap">
                  Seat choosed
                </label>
                <span className="text-end text-[14px] font-medium text-wrap text-black">
                  {selectedSeats.join(", ")}
                </span>
              </div>
            </div>
            <hr className="text-label-genre" />
            <div class="flex flex-row justify-between">
              <span className="text-lg font-semibold">Total payment</span>
              <span className="text-blue-primary font-bold">{`$${price * selectedSeats.length}`}</span>
            </div>

            {/* <!-- checkout tombol --> */}
            <Link
              to={"/movies/payment"}
              className="bg-blue-primary block h-[55px] w-full content-center rounded-sm text-center text-white"
            >
              Checkout Now
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default OrderPages;
