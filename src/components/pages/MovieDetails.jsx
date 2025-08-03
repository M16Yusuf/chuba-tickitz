import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function MovieDetails() {
  const { movieId } = useParams();
  const [detailMovie, setDetailMovie] = useState({});
  const [detailCrew, setDetailCrew] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const urlDetails = `${import.meta.env.VITE_TMDB_API_URL}/movie/${movieId}`;
        const urlCredit = `${import.meta.env.VITE_TMDB_API_URL}/movie/${movieId}/credits`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
        };

        const responDetails = await axios.get(urlDetails, options);
        const responCredit = await axios.get(urlCredit, options);
        const { data: resultDetails } = responDetails;
        const { data: Credit } = responCredit;
        const findDirector = Credit.crew.find(
          (dataDir) => dataDir.job === "Director",
        );
        const resultCredit = {};
        resultCredit.director = findDirector.original_name;
        resultCredit.cast = Credit.cast.slice(0, 4).map((data) => {
          return data.original_name;
        });

        setDetailMovie(resultDetails);
        setDetailCrew(resultCredit);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [movieId]);

  return (
    <main className="md:max-w-custom-max-main w-full md:justify-self-center">
      {isLoading && <p>Loading...</p>}
      {!isLoading && Object.keys(detailMovie).length > 0 && (
        <>
          <section className="h-[450px] w-full justify-self-center">
            <img
              className="h-full w-full object-cover"
              src={`${import.meta.env.VITE_PREFIX_IMG_TMDB}${detailMovie.backdrop_path}`}
              alt={`${detailMovie.title} backdrop`}
            />
          </section>
          <section className="p-5 md:justify-self-center md:p-20">
            <section className="relative top-[-260px] left-0 flex w-fit flex-col gap-10">
              <div className="flex flex-col gap-5 md:flex-row md:items-end">
                <img
                  className="h-auto w-[300px] self-center"
                  src={`${import.meta.env.VITE_PREFIX_IMG_TMDB}${detailMovie.poster_path}`}
                  alt={detailMovie.title}
                />

                <div className="details">
                  <span className="flex justify-self-center text-xl font-bold md:justify-self-start md:text-[32px]">
                    {detailMovie.title}
                  </span>
                  <div className="flex flex-row justify-center md:justify-start">
                    {detailMovie.genres.map((movie, idx) => {
                      return (
                        <span
                          className="bg-label-genre m-1 rounded-lg p-1.5"
                          key={idx}
                        >
                          {movie.name}
                        </span>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label> Release Date </label>
                      <br />
                      <span>{detailMovie.release_date}</span>
                    </div>
                    <div>
                      <label> Directed by </label>
                      <br />
                      <span>{detailCrew.director}</span>
                    </div>
                    <div>
                      <label> Duration </label>
                      <br />
                      <span>{`${detailMovie.runtime} minutes`}</span>
                    </div>
                    <div>
                      <label> cast </label>
                      <br />
                      {detailCrew.cast.map((data, idx) => {
                        return (
                          <span className="p-1.5" key={idx}>
                            {`${data}, `}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4>Synopsis</h4>
                <p className="max-w-[800px]">{detailMovie.overview}</p>
              </div>
            </section>

            <section className="mt-[-220px] mb-2.5">
              <span className="text-[32px] font-normal"> Book Ticket </span>
              <div className="flex flex-col gap-2.5 md:flex-row md:flex-wrap">
                <div className="book-item">
                  <label className="hidden md:block" htmlFor="date-book">
                    Choose date
                  </label>
                  <br />
                  <input
                    className="bg-label-input h-12 w-full rounded-md md:w-[240px]"
                    type="date"
                    id="date-book"
                  />
                </div>
                <div className="book-item">
                  <label className="hidden md:block" htmlFor="time-book">
                    Choose Time
                  </label>
                  <br />
                  <input
                    className="bg-label-input h-12 w-full rounded-md md:w-[240px]"
                    type="time"
                    id="time-book"
                  />
                </div>
                <div className="book-item">
                  <label className="hidden md:block" htmlFor="location-book">
                    Choose Location
                  </label>
                  <br />
                  <input
                    className="bg-label-input h-12 w-full rounded-md md:w-[240px]"
                    type="text"
                    name=""
                    id="location-book"
                    placeholder="Purwakarta"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <button className="bg-blue-primary flex h-12 w-full items-center justify-center rounded-md text-white md:w-[240px]">
                    Filter
                  </button>
                </div>
              </div>
            </section>

            <section className="cinema flex flex-col gap-3">
              <div>
                <span className="hidden md:inline">Choose Cinema </span>
                <span className="text-label text-[16px] font-bold">
                  39 Result
                </span>
              </div>
              <div className="flex flex-col gap-5 md:flex-row md:self-center">
                <div>
                  <input
                    className="peer sr-only"
                    type="radio"
                    name="cinema"
                    id="ibv"
                  />
                  <label
                    className="peer-checked:bg-blue-primary block rounded-md border-2 border-gray-200 p-2.5"
                    htmlFor="ibv"
                  >
                    <img className="h-14" src="/logo-ebv_id.svg" alt="" />
                  </label>
                </div>

                <div>
                  <input
                    className="peer sr-only"
                    type="radio"
                    name="cinema"
                    id="hiflix"
                  />
                  <label
                    className="peer-checked:bg-blue-primary block rounded-md border-2 border-gray-200 p-2.5"
                    htmlFor="hiflix"
                  >
                    <img className="h-14" src="/logo-hiflix2.svg" alt="" />
                  </label>
                </div>

                <div>
                  <input
                    className="peer sr-only"
                    type="radio"
                    name="cinema"
                    id="cinema"
                  />
                  <label
                    className="peer-checked:bg-blue-primary block rounded-md border-2 border-gray-200 p-2.5"
                    htmlFor="cinema"
                  >
                    <img className="h-14" src="/logo-CineOne21.svg" alt="" />
                  </label>
                </div>

                <div>
                  <input
                    className="peer sr-only"
                    type="radio"
                    name="cinema"
                    id="ibv2"
                  />
                  <label
                    className="peer-checked:bg-blue-primary block rounded-md border-2 border-gray-200 p-2.5"
                    htmlFor="ibv2"
                  >
                    <img className="h-14" src="/logo-ebv_id.svg" alt="" />
                  </label>
                </div>
              </div>
              <div className="flex self-center">
                <span className="rounded-md border border-gray-100 p-2.5">
                  1
                </span>
                <span className="rounded-md border border-gray-100 p-2.5">
                  2
                </span>
                <span className="rounded-md border border-gray-100 p-2.5">
                  3
                </span>
                <span className="rounded-md border border-gray-100 p-2.5">
                  4
                </span>
              </div>
              <span className="bg-blue-primary flex h-14 w-full items-center justify-center self-center rounded-md text-white md:w-48">
                Book Now
              </span>
            </section>
          </section>
        </>
      )}
    </main>
  );
}

export default MovieDetails;
