import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router";

function MoviesPages() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const url_movies = `${import.meta.env.VITE_TMDB_API_URL}/movie/popular?${searchParams.toString()}&language=en-US&include_adult=false`;
        const url_genre = `${import.meta.env.VITE_TMDB_API_URL}/genre/movie/list?language=en`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODI1ZDA0YzhjNTY0YTdjYjA5NTMwNDRjYzM5YjJlZiIsIm5iZiI6MTc1MzQ1NzU3NS4xNzEsInN1YiI6IjY4ODNhM2E3Y2Y3MTI2Y2Q1YWY3N2Y5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.73DfZA71E3BQa-8f5cgdQJlHUWC0uKt_s_wx9b4gMaM",
          },
        };

        const responMovie = await axios.request(url_movies, options);
        const responGenre = await axios.request(url_genre, options);

        const {
          data: { results: resultMovies },
        } = responMovie;
        const {
          data: { genres: resultGenres },
        } = responGenre;

        let newData = [];
        // console.log(resultMovies);

        newData = resultMovies.map(
          ({
            id,
            title,
            overview,
            firts_air_date,
            backdrop_path,
            poster_path,
            genre_ids,
          }) => ({
            id: id,
            title: title,
            description: overview,
            release_date: firts_air_date,
            backdrop: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
            poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
            // genre_ids = []
            genres: genre_ids.map((ele_map) => {
              // finding genre_id[i] = resultGenres
              const genreMatch = resultGenres.find(({ id }) => id === ele_map);
              //if genre_id not match with any GenreList -> return unknown
              if (genreMatch == undefined) {
                return "unknown";
              }
              let temp = genreMatch.name;
              return temp;
            }),
          }),
        );

        console.log(newData);
        setData(newData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [searchParams]);

  return (
    <Fragment>
      {isLoading && (
        <div role="status" className="flex flex-row justify-center">
          <svg
            aria-hidden="true"
            class="h-[400px] w-[400px] animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      )}
      {!isLoading && Object.keys(data).length > 0 && (
        <>
          <section className="relative h-[450px] p-5 md:p-28">
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

          <main className="md:max-w-custom-max-main w-full p-3 md:justify-self-center md:p-20">
            <div className="flex flex-col pt-2.5 md:flex-row">
              <div className="event">
                <label className="m-5 text-base font-semibold">
                  Cari Event
                </label>
                <br />
                <input
                  className="border-label-genre m-1 w-full border p-2 md:w-[350px]"
                  type="text"
                />
              </div>
              <div className="filter">
                <label className="m-5 text-base font-semibold"> Filter </label>
                <div className="flex flex-row flex-wrap gap-3">
                  <span className="bg-label-genre text-label hover:bg-blue-primary inline-block rounded-md p-1.5 transition hover:text-white">
                    Thriller
                  </span>
                  <span className="bg-label-genre text-label hover:bg-blue-primary inline-block rounded-md p-1.5 transition hover:text-white">
                    Horror
                  </span>
                  <span className="bg-label-genre text-label hover:bg-blue-primary inline-block rounded-md p-1.5 transition hover:text-white">
                    Romantic
                  </span>
                  <span className="bg-label-genre text-label hover:bg-blue-primary inline-block rounded-md p-1.5 transition hover:text-white">
                    Adventure
                  </span>
                  <span className="bg-label-genre text-label hover:bg-blue-primary inline-block rounded-md p-1.5 transition hover:text-white">
                    Sci-Fi
                  </span>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-row overflow-x-scroll">
              <div
                className="grid w-full grid-cols-2 gap-5 self-center overflow-x-scroll md:max-w-[1400px] md:grid-cols-4"
                id="content-area"
              >
                {/* content  */}
                {data.map((itemMovie) => {
                  return (
                    <div className="flex flex-col gap-4" key={itemMovie.id}>
                      <div className="group relative rounded-md md:max-h-[405px] md:max-w-[264px]">
                        <img
                          className="h-full w-full rounded-md bg-cover"
                          src={itemMovie.poster}
                          alt={itemMovie.title}
                        />

                        <div className="absolute inset-0 hidden flex-col justify-center gap-5 rounded-md bg-[rgb(0,0,0,0.8)] group-hover:flex">
                          <Link
                            to={`/movies/details/${itemMovie.id}`}
                            className="flex h-12 w-44 items-center justify-center self-center rounded-md border border-white text-white hover:shadow-lg hover:shadow-white"
                          >
                            Details
                          </Link>
                          <span className="bg-blue-primary flex h-12 w-44 items-center justify-center self-center rounded-md text-white transition-shadow hover:shadow-lg hover:shadow-blue-700">
                            Buy Ticket
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/movies/details/${itemMovie.id}`}
                        className="text-2xl font-bold"
                      >
                        {itemMovie.title}
                      </Link>
                      <div className="flex flex-row flex-wrap gap-5">
                        {itemMovie.genres.map((itemGenre, idx) => {
                          return (
                            <a
                              className="inline-block rounded-md bg-[#A0A3BD1A] px-4 py-2 text-[#A0A3BD] transition hover:bg-blue-700 hover:text-white"
                              key={idx}
                            >
                              {itemGenre}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                {/* end content  */}
              </div>
            </div>

            <section className="m-5 mt-2.5 flex flex-row justify-self-center">
              {[1, 2, 3, 4, 5].map((pageNumber, idx) => {
                return (
                  <div
                    key={idx}
                    className="inline-block rounded-full bg-[#A0A3BD1A] px-4 py-2 text-[#A0A3BD] transition hover:bg-blue-700 hover:text-white"
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
            </section>
          </main>
        </>
      )}
    </Fragment>
  );
}

export default MoviesPages;
