import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import CardMovie from "./../organism/CardMovie";

function HomePages() {
  const [airing, setAiring] = useState([]);
  const [camSoon, setCamSoon] = useState([]);

  useEffect(() => {
    (async function () {
      try {
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
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <main className="w-full p-3 md:max-w-[1440px] md:justify-self-center md:p-20">
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
        <div className="flex flex-row gap-2 self-center">
          <div className="flex flex-col gap-2">
            <img src="./hero-item-wick.png" alt="john wick" />
            <img src="./hero-item-spiderman.png" alt="spiderman home coming" />
          </div>
          <div className="flex flex-col gap-2">
            <img src="./hero-item-lionking.png" alt="the lion king" />
            <img src="./hero-item-roblox.png" alt="roblox" />
          </div>
          {/* [grid-area:d] */}
          <div className=""></div>
        </div>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos alias
              tempora quo repellat. Totam hic veniam id fugiat recusandae cumque
              nobis tempore, nam possimus alias facilis molestiae nulla officia
              commodi.
            </p>
          </div>
          <div className="flex flex-col items-center gap-5 md:max-w-[340px] md:items-start">
            <img src="/icon-blue_check.svg" alt="blue_check" />
            <span className="text-lg font-bold"> Affordable </span>
            <p className="text-center text-shadow-gray-600 md:text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos alias
              tempora quo repellat. Totam hic veniam id fugiat recusandae cumque
              nobis tempore, nam possimus alias facilis molestiae nulla officia
              commodi.
            </p>
          </div>
          <div className="flex flex-col items-center gap-5 md:max-w-[340px] md:items-start">
            <img src="/icon-blue_discus.svg" alt="blue_discus" />
            <span className="text-lg font-bold"> 24/7 Customer Support </span>
            <p className="text-center text-shadow-gray-600 md:text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos alias
              tempora quo repellat. Totam hic veniam id fugiat recusandae cumque
              nobis tempore, nam possimus alias facilis molestiae nulla officia
              commodi.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-5">
        <span className="text-blue-primary text-base font-bold"> MOVIES </span>
        <p className="text-center text-3xl font-light">
          Exciting Movies That Should Be <br /> Watched Today
        </p>
        <div className="flex w-full flex-row gap-6 overflow-x-scroll md:justify-center">
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

        <div className="flex w-full flex-row gap-6 overflow-x-scroll md:justify-center">
          {camSoon.map((itemMovie) => {
            return <CardMovie key={itemMovie.id} itemMovie={itemMovie} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default HomePages;
