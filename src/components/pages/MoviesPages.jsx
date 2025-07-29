import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

// import "../../assets/styles/pages/home2.css";

// details : https://developer.themoviedb.org/reference/tv-series-popular-list
const options1 = {
  method: "GET",
  url: "https://api.themoviedb.org/3/tv/popular",
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODI1ZDA0YzhjNTY0YTdjYjA5NTMwNDRjYzM5YjJlZiIsIm5iZiI6MTc1MzQ1NzU3NS4xNzEsInN1YiI6IjY4ODNhM2E3Y2Y3MTI2Y2Q1YWY3N2Y5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.73DfZA71E3BQa-8f5cgdQJlHUWC0uKt_s_wx9b4gMaM",
  },
};
// details : https://developer.themoviedb.org/reference/genre-movie-list
const options2 = {
  method: "GET",
  url: "https://api.themoviedb.org/3/genre/movie/list",
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODI1ZDA0YzhjNTY0YTdjYjA5NTMwNDRjYzM5YjJlZiIsIm5iZiI6MTc1MzQ1NzU3NS4xNzEsInN1YiI6IjY4ODNhM2E3Y2Y3MTI2Y2Q1YWY3N2Y5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.73DfZA71E3BQa-8f5cgdQJlHUWC0uKt_s_wx9b4gMaM",
  },
};

function MoviesPages() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      const responMovie = await axios.request(options1);
      const responGenre = await axios.request(options2);

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
          name,
          overview,
          firts_air_date,
          backdrop_path,
          poster_path,
          genre_ids,
        }) => ({
          id: id,
          title: name,
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
        })
      );
      setData(newData);
    })();
  }, []);

  // console.log(newData);

  return (
    <Fragment>
      <header>
        <nav>
          <a href="./../index.html">
            {" "}
            <img src="./logo-blue_tickitz.svg" alt="logo blue Tickitz" />
          </a>

          <ul className="menu">
            <li>
              <a href="./../index.html"> Home </a>
            </li>
            <li>
              <a href="./home2.html">Movie</a>
            </li>
            <li>
              <a href="#"> Buy Ticket </a>
            </li>
          </ul>

          <div className="special">
            <a href="./login.html">SignIn</a>
            <a href="./register.html">Sign Up</a>
          </div>

          <div id="btn-hamburger">
            <svg
              className="img-burger"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6C4 5.73478 4.10536 5.48043 4.29289 5.29289C4.48043 5.10536 4.73478 5 5 5H19C19.2652 5 19.5196 5.10536 19.7071 5.29289C19.8946 5.48043 20 5.73478 20 6C20 6.26522 19.8946 6.51957 19.7071 6.70711C19.5196 6.89464 19.2652 7 19 7H5C4.73478 7 4.48043 6.89464 4.29289 6.70711C4.10536 6.51957 4 6.26522 4 6Z"
                fill="black"
              />
              <path
                d="M4 18C4 17.7348 4.10536 17.4804 4.29289 17.2929C4.48043 17.1054 4.73478 17 5 17H19C19.2652 17 19.5196 17.1054 19.7071 17.2929C19.8946 17.4804 20 17.7348 20 18C20 18.2652 19.8946 18.5196 19.7071 18.7071C19.5196 18.8946 19.2652 19 19 19H5C4.73478 19 4.48043 18.8946 4.29289 18.7071C4.10536 18.5196 4 18.2652 4 18Z"
                fill="black"
              />
              <path
                d="M11 11C10.7348 11 10.4804 11.1054 10.2929 11.2929C10.1054 11.4804 10 11.7348 10 12C10 12.2652 10.1054 12.5196 10.2929 12.7071C10.4804 12.8946 10.7348 13 11 13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11H11Z"
                fill="black"
              />
            </svg>
          </div>
        </nav>

        <div className="hamburger hidden" id="content-hamburger">
          <a href="./pages/register.html">Sign Up</a>
          <a href="./pages/login.html">SignIn</a>
          <a href="./index.html"> Home </a>
          <a href="./pages/home2.html">Movie</a>
          <a href="#"> Buy Ticket </a>
        </div>
      </header>

      <main>
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
          <div className="flex flex-row ">
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
            className="grid grid-cols-4 max-w-[1400px] self-center"
            id="content-area"
          >
            {/* content  */}
            {data.map((itemMovie) => {
              return (
                <div className="flex flex-col" key={itemMovie.id}>
                  <img src={itemMovie.poster} alt={itemMovie.title} />
                  <span className="text-2xl font-bold">{itemMovie.title}</span>
                  <div className="flex flex-row gap-5 flex-wrap">
                    {itemMovie.genres.map((itemGenre, idx) => {
                      return (
                        <a
                          className="inline-block px-4 py-2 rounded-md bg-[#A0A3BD1A] text-[#A0A3BD] hover:bg-blue-700 hover:text-white transition"
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

          <div className="number">
            <div> 1 </div>
            <div> 2 </div>
            <div> 3 </div>
            <div> 4 </div>
            <div> → </div>
          </div>
        </section>

        <section className="subscribe">
          <img src="../img/background/bg_subscribe.png" alt="blus_bg" />
          <form action="#">
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Email address" />
            <button>Subscibe Now</button>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer">
          <div>
            <img src="../img/icon/blue_tickitz.svg" alt="" />
            <p>
              Stop waiting in the line. Buy tickets conveniently, watch movies
              quietly.
            </p>
          </div>
          <div>
            <div>
              <h3>Explore</h3>
            </div>
            <div>Cinemas</div>
            <div>Movie List</div>
            <div>My Ticket</div>
            <div>Notifikasi</div>
          </div>
          <div>
            <div>
              <h3>Our Sponsor</h3>
            </div>
            <div>
              <img src="../img/icon/ebv_id.svg" alt="ebv_id_2" />
            </div>
            <div>
              <img src="../img/icon/CineOne21.svg" alt="" />
            </div>
            <div>
              <img src="../img/icon/hiflix2.svg" alt="" />
            </div>
          </div>
          <div>
            <div>
              <h3>Follow us</h3>
            </div>
            <div>
              <img src="../img/icon/eva_facebook-outline.svg" alt="facebook" />
              <span>Tickitz Cinema id</span>
            </div>
            <div>
              <img src="../img/icon/eva_instagram.svg" alt="instagram" />
              <span>tickitz.id</span>
            </div>
            <div>
              <img src="../img/icon/eva_twitter-outline.svg" alt="twitter" />
              <span>ickitz.id</span>
            </div>
            <div>
              <img src="../img/icon/eva_youtube.svg" alt="youtube" />
              <span>Tickitz Cinema id</span>
            </div>
          </div>
        </div>

        <div>
          <p>© 2020 Tickitz. All Rights Reserved.</p>
        </div>
      </footer>
    </Fragment>
  );
}

export default MoviesPages;
