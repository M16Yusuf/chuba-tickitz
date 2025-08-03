import { BrowserRouter, Route, Routes } from "react-router";

// component pages stand alone without layout
import Login from "./components/pages/LoginPage.jsx";
import Register from "./components/pages/RegisterPage.jsx";

// component pages need layout
import Home from "./components/pages/HomePages.jsx";
import Movies from "./components/pages/MoviesPages.jsx";
import BuyTicket from "./components/pages/BuyTicket.jsx";
import MovieDetails from "./components/pages/MovieDetails.jsx";

// component layout
import LayoutHome from "./components/layout/LayoutHome.jsx";
import LayoutMovie from "./components/layout/LayoutMovie.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Home />}></Route> */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* main route layoutHome for home, movie, and buy ticket */}
        <Route path="/" element={<LayoutHome />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="buyticket" element={<BuyTicket />} />
        </Route>

        {/* route for layoutMovie for, movie details, seat, payment, ticket */}
        <Route path="movies" element={<LayoutMovie />}>
          <Route path=":movieId" element={<MovieDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
