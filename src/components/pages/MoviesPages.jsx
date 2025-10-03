import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../redux/slice/movieSlice";

// component
import CardMovie from "./../organism/CardMovie";
import LoadingCircle from "./../organism/LoadingCircle";

function MoviesPages() {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [pageNumber, setPageNumber] = useState([1, 2, 3, 4, 5]);

  const dispatch = useDispatch();
  const movieState = useSelector((state) => state.movies);
  const authState = useSelector((state) => state.auth);

  // on endering component
  useEffect(() => {
    dispatch(movieActions.getGenreThunk());
  }, []);

  // pagination and useSearchparam
  // on update state
  useEffect(() => {
    let rawParams = searchParams.toString();
    let cleanedParams = rawParams.replace(/%25/g, "&");
    console.log(cleanedParams);
    let dataUrl = `${import.meta.env.VITE_HOST_URL}/movies?${cleanedParams}`;

    dispatch(
      movieActions.getMovieThunk({
        url: dataUrl,
        Authorization: `Bearer ${authState.user.token}`,
      }),
    );
  }, [searchParams]);

  function selectGenreClick(genreName) {
    setSearchParams((param) => {
      if (param.has("genres")) {
        let current = param.get("genres").split("%");

        if (current.includes(genreName)) {
          if (current.length === 1) {
            param.delete("genres");
          } else {
            param.set(
              "genres",
              current.filter((name) => name !== genreName).join("%"),
            );
          }
        } else {
          current.push(genreName);
          param.set("genres", current.join("%"));
        }
      } else {
        param.append("genres", genreName);
      }
      return param;
    });
  }

  // genre style
  function selectGenreStyle(genreName) {
    let data = searchParams.get("genres");
    if (data != null) {
      const selectedGenres = data.split("%");
      return selectedGenres.includes(genreName)
        ? "bg-blue-primary text-white"
        : "bg-label-genre text-label";
    }
  }

  function querySearch(eve) {
    let datSearch = eve.target.value;
    console.log(datSearch);
    setSearchParams((param) => {
      if (datSearch === "") {
        param.delete("search");
      } else if (param.has("search")) {
        param.set("search", datSearch);
      } else {
        param.append("search", datSearch);
      }
      return param;
    });
  }

  return (
    <Fragment>
      <section className="relative h-[450px] w-full p-5 md:p-28">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/bg-avenger.png"
          alt="indicator"
          id="indicator"
        />

        <div className="absolute inset-0 bg-[rgb(0,0,0,0.6)]"></div>
        <div className="absolute flex flex-col">
          <div className="mb-1.5 text-lg text-white">
            LIST MOVIE OF THE WEEK
          </div>
          <div className="text-5xl text-white">
            Experience the Magic of <br />
            Cinema: Book Your Tickets <br />
            Today
          </div>
        </div>
      </section>

      <section className="w-full p-3 md:max-w-[1440px] md:justify-self-center md:p-20">
        {/* search & filter genre film? */}
        <div className="flex flex-col justify-self-center pt-2.5 md:max-w-[1124px] md:flex-row">
          <div className="event">
            <label className="m-5 text-base font-semibold">Cari Event</label>
            <br />
            <input
              className="border-label-genre focus:outline-blue-primary focus:ring-blue-primary m-1 w-full border p-2 md:w-[350px]"
              type="text"
              onChange={querySearch}
            />
          </div>

          {/* filter by genre */}
          <div className="filter">
            <label className="m-5 text-base font-semibold"> Filter </label>
            <div className="flex flex-row flex-wrap gap-3">
              {movieState.genres.length > 0 &&
                movieState.genres.map((itemGenre) => {
                  return (
                    <span
                      className={`${selectGenreStyle(itemGenre.genre_name)} text-label border-label-genre inline-block cursor-pointer rounded-md border-1 p-1.5`}
                      key={itemGenre.id}
                      onClick={() => {
                        selectGenreClick(itemGenre.genre_name);
                      }}
                    >
                      {itemGenre.genre_name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* movie section */}
        {movieState.isLoading && movieState.movies && (
          <LoadingCircle></LoadingCircle>
        )}
        {!movieState.isLoading && movieState.movies && (
          <div className="w-full overflow-x-scroll xl:justify-items-center">
            <div
              className="grid w-max grid-cols-4 gap-1 px-1 py-2 md:gap-5"
              id="content-area"
            >
              {/* content  */}
              {movieState.movies.map((itemMovie) => {
                return <CardMovie itemMovie={itemMovie} key={itemMovie.id} />;
              })}
              {/* end content  */}
            </div>
          </div>
        )}

        {/* pagenation button */}
        <section className="m-5 mt-2.5 flex flex-row gap-0 justify-self-center md:gap-5">
          <div
            className={`${pageNumber[0] == 1 ? "hidden" : "inline-block"} bg-blue-primary cursor-pointer rounded-full border px-4 py-2 text-[#A0A3BD]`}
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
                className={`${parseInt(searchParams.get("page")) == pageNumber && "bg-blue-700 text-white"} inline-block cursor-pointer rounded-full bg-[#A0A3BD1A] px-4 py-2 text-[#A0A3BD]`}
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
            className={`bg-blue-primary inline-block cursor-pointer rounded-full border px-4 py-2 text-[#A0A3BD]`}
            onClick={() =>
              setPageNumber((dataNumber) =>
                dataNumber.map((eleArr) => eleArr + 1),
              )
            }
          >
            👉
          </div>
        </section>
      </section>
    </Fragment>
  );
}

export default MoviesPages;
