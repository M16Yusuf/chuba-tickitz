import { Link } from "react-router";

function CardMovie({ itemMovie }) {
  return (
    <div className="flex max-w-[264px] flex-col gap-4" key={itemMovie.id}>
      <div className="group relative w-[240px] md:w-[264px]">
        <img
          className="h-[369px] rounded-md bg-cover md:h-[405px]"
          src={`${import.meta.env.VITE_PREFIX_IMG_TMDB}/${itemMovie.poster}`}
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
        className="text-lg font-bold md:text-2xl"
      >
        {itemMovie.title}
      </Link>
      <div className="flex flex-row flex-wrap gap-1">
        {itemMovie.genres.map((itemGenre, idx) => {
          return (
            <a
              className="bg-label-genre text-secondary p-1.1 block rounded-[20px]"
              key={idx}
            >
              {itemGenre}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default CardMovie;
