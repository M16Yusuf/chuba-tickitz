import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "react-router";
import axios from "axios";
// utils
import formatDateAndCheckPast from "./../../../utils/timestampToDate";
// import redux state
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../../redux/slice/authSlice";
import { userAction } from "../../../redux/slice/userSlice";

function AddMovie() {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [pageNumber, setPageNumber] = useState([1, 2, 3, 4, 5]);

  const [isAddMenu, setIsAddMenu] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // delete auth/user/logout
  function deleteSession() {
    dispatch(authAction.resetAuthState());
    dispatch(userAction.deleteUserState());
  }

  console.log(allMovies);

  function handleDeleteClick(movieId) {
    toast.info(
      <div>
        <p>Are you sure you want to delete this movie?</p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => {
              deleteAMovie(movieId);
              toast.dismiss();
            }}
            className="rounded bg-red-600 px-3 py-1 text-white"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="rounded bg-gray-300 px-3 py-1"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      },
    );
  }

  async function deleteAMovie(movieId) {
    try {
      const responseData = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_HOST_URL}/admin/movies/${movieId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.user.token}`,
        },
      });

      console.log(responseData);
      // kirim pesan sukses delete movie
      toast.success(`Movie deleted, `, {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
        closeOnClick: true,
      });
    } catch (error) {
      console.log(error);
      // if error bacuse unauthorized, delete all data session
      if (error.status == 401) {
        deleteSession();
      }
      // error notification
      toast.error(
        error.response?.data?.message ||
          `Failed delete movie, ${error.response.data.error}`,
        {
          position: "top-center",
          theme: "colored",
          closeOnClick: true,
          autoClose: 2000,
        },
      );
    }
  }

  // on render this component, and on update searchParams
  useEffect(() => {
    (async function () {
      try {
        const responseData = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_HOST_URL}/admin/movies?${searchParams.toString()}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.user.token}`,
          },
        });
        const {
          data: { data: resultMovies },
        } = responseData;
        // asign result fetch to state
        setAllMovies(resultMovies);
      } catch (error) {
        // if error bacuse unauthorized, delete all data session
        if (error.status == 401) {
          deleteSession();
        }
        // error notification
        toast.error(
          error.response?.data?.message ||
            `Failed to fetch data, ${error.response.data.error}`,
          {
            position: "top-center",
            theme: "colored",
            closeOnClick: true,
            autoClose: 2000,
          },
        );
      }
    })();
  }, [searchParams]);

  return (
    <main className="bg-background h-full w-full p-5">
      <ToastContainer />
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
            {/* thead table  */}
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
              {allMovies.length > 0 &&
                allMovies.map((movie, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <img
                          src={
                            (movie.poster_path &&
                              `${import.meta.env.VITE_HOST_URL}/img/poster/${movie.poster_path}`) ||
                            "/default-poster.jpg"
                          }
                          className="h-[39px] w-[46px] rounded-lg object-cover"
                          alt=""
                        />
                      </td>
                      <td className="text-blue-primary">{movie.title}</td>
                      <td>
                        {movie.genres.map((genre, idx) => {
                          return (
                            <span key={idx}>
                              {genre.genre_name}
                              {idx !== movie.genres.length - 1 && ", "}
                            </span>
                          );
                        })}
                      </td>
                      <td>
                        {formatDateAndCheckPast(movie.release_date).dateOnly}
                      </td>
                      <td>{`${movie.duration} minutes`}</td>
                      <td className="flex flex-row gap-1.5">
                        <div className="bg-blue-primary rounded-md p-1">
                          <img src="/icon-eye-white.svg" alt="" />
                        </div>
                        <div className="bg-blue-primary rounded-md p-1">
                          <img src="/icon-edit.svg" alt="" />
                        </div>
                        <div
                          className="bg-importan rounded-md p-1"
                          onClick={() => handleDeleteClick(movie.movie_id)}
                        >
                          <img src="/icon-delete.svg" alt="" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/* ========= {pagenation} ========= */}
        <section className="m-5 mt-2.5 flex flex-row gap-0.5 justify-self-center md:gap-5">
          <div
            className={`${pageNumber[0] == 1 ? "hidden" : "inline-block"} bg-blue-primary cursor-pointer rounded-lg border px-4 py-2 text-[#A0A3BD]`}
            onClick={() =>
              setPageNumber((dataNumber) =>
                dataNumber.map((eleArr) => eleArr - 1),
              )
            }
          >
            👈
          </div>
          {pageNumber.map((pageNumber, idx) => {
            return (
              <div
                key={idx}
                className={`${parseInt(searchParams.get("page")) == pageNumber && "bg-blue-700 text-white"} inline-block cursor-pointer rounded-lg bg-[#A0A3BD1A] px-4 py-2 text-[#A0A3BD]`}
                onClick={() => {
                  // logika paginasi
                  setSearchParams((searchParams) => {
                    if (searchParams.has("page")) {
                      searchParams.set("page", pageNumber);
                    } else {
                      searchParams.append("page", pageNumber);
                    }
                    return searchParams;
                  });
                }}
              >
                {pageNumber}
              </div>
            );
          })}
          <div
            className={`bg-blue-primary inline-block cursor-pointer rounded-lg border px-4 py-2 text-[#A0A3BD]`}
            onClick={() =>
              setPageNumber((dataNumber) =>
                dataNumber.map((eleArr) => eleArr + 1),
              )
            }
          >
            👉
          </div>
        </section>
      </div>

      {/* =========================== {add movie form} =========================== */}
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
