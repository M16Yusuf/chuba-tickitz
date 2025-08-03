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
      {isLoading && <p>Loading...</p>}
      {!isLoading && Object.keys(data).length > 0 && (
        <main className="justify-self-center">
          <section className="jumbotron">
            <div> LIST MOVIE OF THE WEEK </div>
            <div>
              Experience the Magic of <br />
              Cinema: Book Your Tickets <br />
              Today
            </div>
            <img
              src="../img/indicator_carousel.png"
              alt="indicator"
              id="indicator"
            />
          </section>

          <section className="grid">
            <div className="flex flex-row">
              <div className="event">
                <label> Cari Event </label>
                <input className="" type="text" />
              </div>
              <div className="filter">
                <label> Filter </label>
                <div className="flex flex-row gap-3">
                  <a href="#Thriller">Thriller</a> <a href="#horror">Horror</a>
                  <a href="#romantic">Romantic</a>
                  <a href="#adventure">Adventure</a>
                  <a href="#scifi">Sci-Fi</a>
                </div>
              </div>
            </div>

            <div
              className="grid max-w-[1400px] grid-cols-4 gap-5 self-center"
              id="content-area"
            >
              {/* content  */}
              {data.map((itemMovie) => {
                return (
                  <div
                    className="flex max-w-2xs flex-col gap-4"
                    key={itemMovie.id}
                  >
                    <div className="group relative max-h-[405px] max-w-[264px] rounded-md">
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

            <section className="m-5 flex flex-row gap-2 justify-self-center">
              {[1, 2, 3, 4, 5].map((pageNumber, idx) => {
                return (
                  <div
                    key={idx}
                    className="bg-label-genre h-[40px] w-[40px] cursor-pointer justify-items-center rounded-full text-center"
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
          </section>
        </main>
      )}
    </Fragment>
  );
}

export default MoviesPages;
