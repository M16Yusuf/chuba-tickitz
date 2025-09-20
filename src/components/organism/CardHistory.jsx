import { useState } from "react";
import QRCode from "react-qr-code";

function CardHistory({ dataHistory }) {
  const [isToggleExp, setToggleExp] = useState(false);

  function logoCinema(place) {
    switch (place.toLowerCase()) {
      case "ebv":
        return "/logo-ebv_id.svg";
      case "cineone":
        return "/logo-CineOne21.svg";
      case "hiflix":
        return "/logo-hiflix2.svg";
      case "cinepolis":
        return "/logo-cinepolis.png";
    }
  }

  function formatDateAndCheckPast(dateString) {
    const date = new Date(dateString);

    const formattedDate = date
      .toLocaleString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Jakarta",
      })
      .replace(",", "")
      .replace(" at ", " - ");

    return {
      formattedDate,
      dateOnly: date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      }),
      timeOnly: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Jakarta",
      }),
      isPast: date < new Date(),
    };
  }

  return (
    <div className="flex w-full flex-col justify-center">
      <div className="border-background flex flex-col gap-2.5 rounded-t-2xl border-b-1 bg-white p-5 shadow-md md:w-full md:flex-row-reverse md:justify-between md:rounded-t-3xl">
        <img
          className="w-24"
          src={logoCinema(dataHistory.cinema_name)}
          alt={dataHistory.place}
        />
        <div className="flex flex-col gap-2.5">
          <span className="text-label text-[13px]">
            {`${dataHistory.city_name}, ${formatDateAndCheckPast(dataHistory.schedule_time).formattedDate}`}
          </span>
          <span className="text-lg">{dataHistory.movie_title}</span>
        </div>
      </div>
      {/* if ticket active & unpaid */}
      <div className="border-background flex flex-col rounded-b-2xl border-t-1 bg-white p-5 shadow-md md:w-full">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <div className="flex w-full flex-col items-center gap-5 md:flex-row">
            <span
              className={`${formatDateAndCheckPast(dataHistory.schedule_time).isPast ? "text-label bg-[rgba(110,113,145,0.2)]" : "text-active bg-[rgba(0,186,136,0.2)]"} w-full rounded-lg p-2.5 text-center md:block md:max-w-44`}
            >
              {`${formatDateAndCheckPast(dataHistory.schedule_time).isPast ? "Ticked used" : "Ticket is Active"}`}
            </span>
            <span
              className={`${dataHistory.paid_at != null ? "text-blue-primary bg-[rgba(29,78,216,0.2)]" : "text-importan bg-[rgba(232,44,44,0.2)]"} block w-full rounded-lg p-2.5 text-center md:block md:max-w-44`}
            >
              {dataHistory.paid_at != null ? "Paid" : "Not paid"}
            </span>
          </div>
          <div
            onClick={() => setToggleExp(!isToggleExp)}
            className="flex cursor-pointer flex-row"
          >
            <span className="text-label block text-center text-nowrap">
              Show Details
            </span>
            <img
              src="/icon-Forward.svg"
              className={`${isToggleExp && "rotate-180"} h-8 w-8`}
              alt="flat-arrow"
            />
          </div>
        </div>
        <div
          className={`${!isToggleExp && "hidden"} mt-5 flex flex-col gap-2.5`}
        >
          <div className="text-lg font-bold">Ticket Information</div>
          {dataHistory.paid_at != null ? (
            <div className="flex flex-col md:flex-row">
              {dataHistory.code_ticket != null && (
                <QRCode
                  value={dataHistory.code_ticket}
                  className="m-0.5 w-36"
                />
              )}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="flex flex-col">
                  <span className="text-label text-[12px]">Category</span>
                  <span className="text-sm font-semibold">
                    {dataHistory.category}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-label text-[12px]">Time</span>
                  <span className="text-sm font-semibold">
                    {formatDateAndCheckPast(dataHistory.schedule_time).timeOnly}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-label text-[12px]">Seats</span>
                  <span className="text-sm font-semibold">
                    {dataHistory.seats.map((seat) => `${seat.seat_code}, `)}
                  </span>
                </div>
                <div className="flex max-w-[200px] flex-col">
                  <span className="text-label text-[12px]">Movie</span>
                  <span className="truncate text-sm font-semibold">
                    {dataHistory.movie_title}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-label text-[12px]">Date</span>
                  <span className="text-sm font-semibold">
                    {formatDateAndCheckPast(dataHistory.schedule_time).dateOnly}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-label text-[12px]">Count</span>
                  <span className="text-sm font-semibold">
                    {dataHistory.seats.length}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-label text-[12px]">Total</span>
                <span className="text-2xl font-semibold">{`$${dataHistory.total}`}</span>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-between md:flex-row">
                <span className="text-label text-base font-light">
                  No. Rekening Virtual :
                </span>
                <div className="flex flex-row items-center justify-between md:gap-5">
                  <span className="text-lg font-bold">{dataHistory.va}</span>
                  <span className="text-blue-primary border-blue-primary rounded-md border p-1">
                    copy
                  </span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between">
                <span className="text-secondary text-[14px]">
                  Total Payment :
                </span>
                <span className="text-blue-primary text-lg font-bold">{`$ ${dataHistory.total}`}</span>
              </div>
              <p className="text-secondary text-[12px] font-normal text-wrap">
                Pay this payment bill before it is due, on{" "}
                <span className="text-importan">
                  {
                    formatDateAndCheckPast(dataHistory.schedule_time)
                      .formattedDate
                  }
                </span>
                . If the bill has not been paid by the specified time, it will
                be forfeited
              </p>
              <span className="bg-blue-primary block w-full rounded-md p-2.5 text-center text-white md:w-48">
                Cek Pembayaran
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardHistory;
