import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

// component
import CardMovie from "./../organism/CardMovie";
import LoadingCircle from "./../organism/LoadingCircle";

function HomePages() {
  // localSatate
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const url_popular = `${import.meta.env.VITE_HOST_URL}/movies/popular`;
        const url_upcoming = `${import.meta.env.VITE_HOST_URL}/movies/upcoming`;

        const resPopularMovies = await axios.get(url_popular, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resUpcomingMovies = await axios.get(url_upcoming, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const {
          data: { data: resultPopular },
        } = resPopularMovies;
        const {
          data: { data: resultUpcoming },
        } = resUpcomingMovies;

        console.log(resultPopular);
        console.log(resultUpcoming);
        // store on local state
        setPopular(resultPopular);
        setUpcoming(resultUpcoming);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && <LoadingCircle></LoadingCircle>}
      {!isLoading && Object.keys(popular).length > 0 && (
        <main className="w-full p-3 md:max-w-[1440px] md:justify-self-center md:px-20 md:py-10">
          <section className="flex flex-col gap-5 md:flex-row md:justify-center">
            <div className="hero-text my-7 flex flex-col items-center justify-center gap-4 md:w-[580px] md:items-start">
              <span className="text-center text-[18px] font-bold text-blue-700">
                MOVIE TICKET PURCHASES #1 IN INDONESIA
              </span>
              <span className="w-[320px] text-center text-[32px] font-light text-balance md:w-full md:text-start">
                Experience the Magic of Cinema: Book Your Tickets Today
              </span>
              <span className="text-gray-400">
                Sign up and get the ticket with a lot of discount
              </span>
            </div>

            {/* KANAN */}
            {popular && (
              <div className="grid h-[300px] w-full grid-cols-2 grid-rows-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,2fr)] gap-2 sm:h-[360px] sm:gap-[6px] md:h-[400px] md:gap-[8px] lg:w-5/12">
                <img
                  src={
                    (popular[0].poster_path &&
                      `${import.meta.env.VITE_HOST_URL}/img/poster/${popular[0].poster_path}`) ||
                    "default-poster.jpg"
                  }
                  alt={popular[0].title}
                  className="col-start-1 col-end-2 row-start-1 row-end-2 h-full w-full rounded-t-[12px] object-cover object-[center_30%] sm:rounded-t-[16px] md:rounded-t-[20px]"
                />
                <img
                  src={
                    (popular[1].poster_path &&
                      `${import.meta.env.VITE_HOST_URL}/img/poster/${popular[1].poster_path}`) ||
                    "default-poster.jpg"
                  }
                  alt={popular[1].title}
                  className="col-start-2 col-end-3 row-start-1 row-end-3 h-full w-full rounded-t-[12px] object-cover object-top sm:rounded-t-[16px] md:rounded-t-[20px]"
                />
                <img
                  src={
                    (popular[2].poster_path &&
                      `${import.meta.env.VITE_HOST_URL}/img/poster/${popular[2].poster_path}`) ||
                    "default-poster.jpg"
                  }
                  alt={popular[2].title}
                  className="col-start-1 col-end-2 row-start-2 row-end-4 h-full w-full rounded-b-[12px] object-cover object-top sm:rounded-b-[16px] md:rounded-b-[20px]"
                />
                <img
                  src={
                    (popular[3].poster_path &&
                      `${import.meta.env.VITE_HOST_URL}/img/poster/${popular[3].poster_path}`) ||
                    "default-poster.jpg"
                  }
                  alt={popular[3].title}
                  className="col-start-2 col-end-3 row-start-3 row-end-4 h-full w-full rounded-b-[12px] object-cover object-center sm:rounded-b-[16px] md:rounded-b-[20px]"
                />
              </div>
            )}
          </section>

          <section className="my-10 flex flex-col justify-center gap-5 md:w-full md:items-start md:px-24">
            <span className="text-blue-primary text-lg font-bold">
              WHY CHOOSE US
            </span>
            <span className="text-3xl font-normal">
              Unleashing the Ultimate Movie Experience
            </span>
            <div className="flex flex-col items-center gap-5 md:max-w-max md:flex-row md:flex-wrap md:self-center">
              <div className="flex flex-col items-center gap-5 md:max-w-[340px] md:items-start">
                <img src="/icon-blue_shield.svg" alt="blue_shield" />
                <span className="text-lg font-bold"> Guaranteed </span>
                <p className="text-center text-shadow-gray-600 md:text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  alias tempora quo repellat. Totam hic veniam id fugiat
                  recusandae cumque nobis tempore, nam possimus alias facilis
                  molestiae nulla officia commodi.
                </p>
              </div>
              <div className="flex flex-col items-center gap-5 md:max-w-[340px] md:items-start">
                <img src="/icon-blue_check.svg" alt="blue_check" />
                <span className="text-lg font-bold"> Affordable </span>
                <p className="text-center text-shadow-gray-600 md:text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  alias tempora quo repellat. Totam hic veniam id fugiat
                  recusandae cumque nobis tempore, nam possimus alias facilis
                  molestiae nulla officia commodi.
                </p>
              </div>
              <div className="flex flex-col items-center gap-5 md:max-w-[340px] md:items-start">
                <img src="/icon-blue_discus.svg" alt="blue_discus" />
                <span className="text-lg font-bold">
                  {" "}
                  24/7 Customer Support{" "}
                </span>
                <p className="text-center text-shadow-gray-600 md:text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  alias tempora quo repellat. Totam hic veniam id fugiat
                  recusandae cumque nobis tempore, nam possimus alias facilis
                  molestiae nulla officia commodi.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col items-center gap-5">
            <span className="text-blue-primary text-base font-bold">
              MOVIES
            </span>
            <p className="text-center text-3xl font-light">
              Exciting Movies That Should Be <br /> Watched Today
            </p>
            <div className="flex w-full flex-row gap-6 overflow-x-scroll md:ml-5 xl:justify-center">
              {popular.map((itemMovie) => {
                return (
                  <CardMovie key={itemMovie.movie_id} itemMovie={itemMovie} />
                );
              })}
            </div>

            <div>
              <Link
                className="text-blue-primary text-lg font-bold"
                to="/movies"
              >{`View All ->`}</Link>
            </div>
          </section>

          <section className="my-10 flex flex-col items-center gap-5">
            <div className="flex flex-row justify-between md:w-[80%]">
              <div>
                <span className="text-blue-primary text-lg font-bold">
                  UPCOMING MOVIES
                </span>
                <div className="text-3xl font-normal">
                  Exciting Movie Coming Soon
                </div>
              </div>
              <div className="hidden gap-2.5 md:flex md:flex-row">
                <div className="bg-secondary block h-[69px] w-[69px] content-center rounded-full text-center text-white">
                  ←
                </div>
                <div className="bg-blue-primary block h-[69px] w-[69px] content-center rounded-full text-center text-white">
                  →
                </div>
              </div>
            </div>

            <div className="flex w-full flex-row gap-6 overflow-x-scroll md:ml-5 xl:justify-center">
              {upcoming.map((itemMovie) => {
                return (
                  <CardMovie key={itemMovie.movie_id} itemMovie={itemMovie} />
                );
              })}
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default HomePages;
