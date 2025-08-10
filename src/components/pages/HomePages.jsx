import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import CardMovie from "./../organism/CardMovie";

function HomePages() {
  const [airing, setAiring] = useState([]);
  const [camSoon, setCamSoon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const options = {
          method: "GET",
          params: { language: "en-US", page: "1" },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
        };

        const url_airing = `${import.meta.env.VITE_TMDB_API_URL}/movie/now_playing`;
        const url_coming = `${import.meta.env.VITE_TMDB_API_URL}/movie/upcoming`;
        const url_genre = `${import.meta.env.VITE_TMDB_API_URL}/genre/movie/list?language=en`;

        const responAiring = await axios.get(url_airing, options);
        const responComing = await axios.get(url_coming, options);
        const responGenre = await axios.get(url_genre, options);

        const {
          data: { results: resultAiring },
        } = responAiring;
        const {
          data: { results: resultComing },
        } = responComing;
        const {
          data: { genres: resultGenres },
        } = responGenre;

        let dataAiring = [];
        let dataComing = [];

        dataAiring = resultAiring.map(
          ({ id, title, poster_path, genre_ids }) => ({
            id: id,
            title: title,
            poster: poster_path,
            genres: genre_ids.map((genID) => {
              const genMatch = resultGenres.find(({ id }) => id === genID);
              return genMatch != undefined ? genMatch.name : "unknown";
            }),
          }),
        );

        dataComing = resultComing.map(
          ({ id, title, poster_path, genre_ids }) => ({
            id: id,
            title: title,
            poster: poster_path,
            genres: genre_ids.map((genID) => {
              const genMatch = resultGenres.find(({ id }) => id === genID);
              return genMatch != undefined ? genMatch.name : "unknown";
            }),
          }),
        );
        setAiring(dataAiring.slice(0, 4));
        setCamSoon(dataComing.slice(0, 4));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && (
        <div role="status" className="flex flex-row justify-center">
          <svg
            aria-hidden="true"
            className="h-[400px] w-[400px] animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {!isLoading && Object.keys(airing).length > 0 && (
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
            {/* [grid-template-areas:'a_c_c','b_b_d'] */}
            {/* <div className="flex flex-row gap-2 self-center">
              <div className="flex flex-col gap-2">
                <img src="./hero-item-wick.png" alt="john wick" />
                <img
                  src="./hero-item-spiderman.png"
                  alt="spiderman home coming"
                />
              </div>
              <div className="flex flex-col gap-2">
                <img src="./hero-item-lionking.png" alt="the lion king" />
                <img src="./hero-item-roblox.png" alt="roblox" />
              </div>
            </div> */}

            {/* KANAN */}
            {airing && (
              <div className="grid h-[300px] w-full grid-cols-2 grid-rows-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,2fr)] gap-2 sm:h-[360px] sm:gap-[6px] md:h-[400px] md:gap-[8px] lg:w-5/12">
                <img
                  src={`${import.meta.env.VITE_PREFIX_IMG_TMDB}/${airing[0].poster}`}
                  alt="hero-1"
                  className="col-start-1 col-end-2 row-start-1 row-end-2 h-full w-full rounded-t-[12px] object-cover object-[center_30%] sm:rounded-t-[16px] md:rounded-t-[20px]"
                />
                <img
                  src={`${import.meta.env.VITE_PREFIX_IMG_TMDB}/${airing[1].poster}`}
                  alt="hero-2"
                  className="col-start-2 col-end-3 row-start-1 row-end-3 h-full w-full rounded-t-[12px] object-cover object-top sm:rounded-t-[16px] md:rounded-t-[20px]"
                />
                <img
                  src={`${import.meta.env.VITE_PREFIX_IMG_TMDB}/${airing[2].poster}`}
                  alt="hero-3"
                  className="col-start-1 col-end-2 row-start-2 row-end-4 h-full w-full rounded-b-[12px] object-cover object-top sm:rounded-b-[16px] md:rounded-b-[20px]"
                />
                <img
                  src={`${import.meta.env.VITE_PREFIX_IMG_TMDB}/${airing[3].poster}`}
                  alt="hero-4"
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
              {" "}
              MOVIES{" "}
            </span>
            <p className="text-center text-3xl font-light">
              Exciting Movies That Should Be <br /> Watched Today
            </p>
            <div className="flex w-full flex-row gap-6 overflow-x-scroll md:ml-5 xl:justify-center">
              {airing.map((itemMovie) => {
                return <CardMovie key={itemMovie.id} itemMovie={itemMovie} />;
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
              {camSoon.map((itemMovie) => {
                return <CardMovie key={itemMovie.id} itemMovie={itemMovie} />;
              })}
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default HomePages;
