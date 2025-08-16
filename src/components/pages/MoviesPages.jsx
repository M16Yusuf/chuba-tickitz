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

  // pagination and useSearchparam
  useEffect(() => {
    let dataUrl = "";
    if (searchParams.has("with_genres") && !searchParams.has("query")) {
      dataUrl = `${import.meta.env.VITE_TMDB_API_URL}/discover/movie?${searchParams.toString()}&language=en-US&include_adult=false`;
    } else if (!searchParams.has("with_genres") && searchParams.has("query")) {
      dataUrl = `${import.meta.env.VITE_TMDB_API_URL}/search/movie?${searchParams.toString()}&language=en-US&include_adult=false`;
    } else if (!searchParams.has("with_genres") && !searchParams.has("query")) {
      dataUrl = `${import.meta.env.VITE_TMDB_API_URL}/movie/now_playing?$?${searchParams.toString()}&language=en-US&include_adult=false`;
    }

    dispatch(
      movieActions.getMovieThunk({
        url: dataUrl,
      }),
    );
  }, [searchParams]);

  function selectGenreClick(genreid) {
    setSearchParams((param) => {
      if (param.has("with_genres")) {
        let current = param
          .get("with_genres")
          .split(",")
          .map((eleArr) => parseInt(eleArr));

        if (current.includes(genreid)) {
          if (current.length == 1) {
            param.delete("with_genres");
          } else {
            param.set(
              "with_genres",
              current.filter((arrValue) => arrValue != genreid),
            );
          }
        } else {
          current.push(genreid);
          param.set("with_genres", current.join());
        }
      } else {
        param.append("with_genres", genreid);
      }
      return param;
    });
  }

  // genre style
  function selectGenreStyle(genreid) {
    let data = searchParams.get("with_genres");
    if (data != null) {
      data = data.split(",").map((eleArr) => parseInt(eleArr));
      return data.includes(genreid)
        ? "bg-blue-primary text-white"
        : "bg-label-genre text-label";
    }
  }

  function querySearch(eve) {
    let datSearch = eve.target.value;
    console.log(datSearch);
    setSearchParams((param) => {
      if (datSearch === "") {
        param.delete("query");
      } else if (param.has("query")) {
        param.set("query", datSearch);
      } else {
        param.append("query", datSearch);
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
        <div className="flex flex-col pt-2.5 md:flex-row">
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
                      className={`${selectGenreStyle(itemGenre.id)} inline-block cursor-pointer rounded-md p-1.5`}
                      key={itemGenre.id}
                      onClick={() => {
                        // genreOnclick(itemGenre.id);
                        selectGenreClick(itemGenre.id);
                      }}
                    >
                      {itemGenre.name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* movie section */}
        {movieState.isLoading && <LoadingCircle></LoadingCircle>}
        {!movieState.isLoading && (
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
        <section className="m-5 mt-2.5 flex flex-row gap-5 justify-self-center">
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
