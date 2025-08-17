import { useState } from "react";

function AddMovie() {
  const [isAddMenu, setIsAddMenu] = useState(false);

  return (
    <main className="bg-background h-full w-full p-5">
      {/* movies added table */}
      <div
        className={`${isAddMenu && "hidden"} w-full max-w-[1100px] justify-self-center rounded-2xl bg-white p-5 shadow md:rounded-3xl`}
      >
        <div>
          <span className="text-lg font-semibold md:text-2xl md:font-bold">
            List movie
          </span>
        </div>
        {/* interaction */}
        <div className="flex flex-col flex-wrap items-end gap-2.5 md:flex-row-reverse md:flex-nowrap">
          <span
            className="bg-blue-primary block h-12 w-36 rounded-md p-3 text-center text-white"
            onClick={() => setIsAddMenu(!isAddMenu)}
          >
            Add Movie
          </span>
          <select
            className="bg-label-input h-12 w-full rounded-lg px-5 text-center md:w-3xs"
            name="month-filter"
            id="month-filter"
          >
            <option value="jan2025">January 2025</option>
            <option value="feb2025">February 2025</option>
            <option value="march2025">March 2025</option>
            <option value="may2025">May 2025</option>
            <option value="jun2025">June 2025</option>
            <option value="jul2025">July 2025</option>
          </select>
        </div>
        <div className="w-full overflow-x-scroll">
          <table className="my-5 w-max border-separate border-spacing-4 md:w-full">
            <thead className="text-[12px] font-bold">
              <tr>
                <td>No</td>
                <td>Thumbnail</td>
                <td>Movie Name</td>
                <td>Category</td>
                <td>Released Date</td>
                <td>Duration</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <img
                    src="/spiderman_homecoming.png"
                    className="h-[39px] w-[46px] rounded-lg bg-cover"
                    alt=""
                  />
                </td>
                <td className="text-blue-primary">Spiderman HomeComing</td>
                <td>Action, Adventure</td>
                <td>07/05/2023</td>
                <td>2 Hours 15 Minute</td>
                <td className="flex flex-row gap-1.5">
                  <div className="bg-blue-primary rounded-md p-1">
                    <img src="/icon-eye-white.svg" alt="" />
                  </div>
                  <div className="bg-blue-primary rounded-md p-1">
                    <img src="/icon-edit.svg" alt="" />
                  </div>
                  <div className="bg-importan rounded-md p-1">
                    <img src="/icon-delete.svg" alt="" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <img
                    src="/spiderman_homecoming.png"
                    className="h-[39px] w-[46px] rounded-lg bg-cover"
                    alt=""
                  />
                </td>
                <td className="text-blue-primary">Spiderman HomeComing</td>
                <td>Action, Adventure</td>
                <td>07/05/2023</td>
                <td>2 Hours 15 Minute</td>
                <td className="flex flex-row gap-1.5">
                  <div className="bg-blue-primary rounded-md p-1">
                    <img src="/icon-eye-white.svg" alt="" />
                  </div>
                  <div className="bg-blue-primary rounded-md p-1">
                    <img src="/icon-edit.svg" alt="" />
                  </div>
                  <div className="bg-importan rounded-md p-1">
                    <img src="/icon-delete.svg" alt="" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <img
                    src="/spiderman_homecoming.png"
                    className="h-[39px] w-[46px] rounded-lg bg-cover"
                    alt=""
                  />
                </td>
                <td className="text-blue-primary">Spiderman HomeComing</td>
                <td>Action, Adventure</td>
                <td>07/05/2023</td>
                <td>2 Hours 15 Minute</td>
                <td className="flex flex-row gap-1.5">
                  <div className="bg-blue-primary rounded-md p-1">
                    <img src="/icon-eye-white.svg" alt="" />
                  </div>
                  <div className="bg-blue-primary rounded-md p-1">
                    <img src="/icon-edit.svg" alt="" />
                  </div>
                  <div className="bg-importan rounded-md p-1">
                    <img src="/icon-delete.svg" alt="" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <img
                    src="/spiderman_homecoming.png"
                    className="h-[39px] w-[46px] rounded-lg bg-cover"
                    alt=""
                  />
                </td>
                <td className="text-blue-primary">Spiderman HomeComing</td>
                <td>Action, Adventure</td>
                <td>07/05/2023</td>
                <td>2 Hours 15 Minute</td>
                <td className="flex flex-row gap-1.5">
                  <div className="bg-blue-primary rounded-md p-1">
                    <img src="/icon-eye-white.svg" alt="" />
                  </div>
                  <div className="bg-blue-primary rounded-md p-1">
                    <img src="/icon-edit.svg" alt="" />
                  </div>
                  <div className="bg-importan rounded-md p-1">
                    <img src="/icon-delete.svg" alt="" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* add movie form */}
      <div
        className={`${!isAddMenu && "hidden"} flex w-full max-w-[734px] flex-col gap-5 justify-self-center rounded-2xl bg-white p-5 shadow md:rounded-3xl`}
      >
        <div className="flex flex-col">
          <label className="text-secondary">Upload image</label>
          <span className="bg-blue-primary w-[106px] rounded-md p-2.5 text-center text-white">
            Upload
          </span>
        </div>

        <div>
          <label className="text-secondary text-[14px]">Movie Name</label>
          <input
            type="text"
            id="movie-name"
            defaultValue="Spider-Man: Homecoming"
            className="border-label-genre w-full border-2 p-2.5"
          />
        </div>

        <div>
          <label className="text-secondary text-[14px]">Category</label>
          <input
            type="text"
            id="category"
            defaultValue="Action, Adventure, Sci-Fi"
            className="border-label-genre w-full border-2 p-2.5"
          />
        </div>

        <div className="flex flex-col gap-2.5 md:flex-row">
          <div className="w-full">
            <label className="text-secondary text-[14px]">Release Date</label>
            <input
              type="date"
              id="release-date"
              className="border-label-genre w-full border-2 p-2.5"
            />
          </div>

          <div>
            <label className="text-secondary text-[14px]">
              Duration (hour / minute)
            </label>
            <div className="flex flex-col md:flex-row">
              <input
                type="text"
                id="duration-hours"
                defaultValue="2"
                className="border-label-genre w-full border-2 p-2.5 md:w-[135px]"
              />
              <input
                type="text"
                id="duration-minutes"
                defaultValue="13"
                className="border-label-genre w-full border-2 p-2.5 md:w-[135px]"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-secondary text-[14px]">Director Name</label>
          <input
            type="text"
            id="director"
            defaultValue="Jon Watts"
            className="border-label-genre w-full border-2 p-2.5"
          />
        </div>

        <div>
          <label className="text-secondary text-[14px]">Cast</label>
          <input
            type="text"
            id="cast"
            defaultValue="Tom Holland, Michael Keaton, Robert Dow.."
            className="border-label-genre w-full border-2 p-2.5"
          />
        </div>

        <div>
          <label className="text-secondary text-[14px]">Synopsis</label>
          <textarea
            type="text"
            id="synopsis"
            defaultValue="Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, | "
            className="border-label-genre w-full border-2 p-2.5"
          />
        </div>

        <div>
          <label className="text-secondary text-[14px]">Add Location</label>
          <input
            type="text"
            id="location"
            defaultValue="Purwokerto, Bandung, Bekasi"
            className="border-label-genre w-full border-2 p-2.5"
          />
        </div>

        <div>
          <label className="text-secondary text-[14px]">Set Date & Time</label>
          <input
            type="date"
            id="date-loca"
            className="border-label-genre w-full border-2 p-2.5"
          />
        </div>

        <div className="flex flex-row gap-5">
          <span className="border-blue-primary text-blue-primary block h-[30px] w-[62px] rounded-lg border text-center text-2xl">
            +
          </span>
          <span>08:30am</span>
          <span>10:30pm</span>
        </div>

        <span
          className="bg-blue-primary block h-[56px] w-full content-center text-center text-white"
          onClick={() => setIsAddMenu(!isAddMenu)}
        >
          Save Movie
        </span>
      </div>
    </main>
  );
}

export default AddMovie;
