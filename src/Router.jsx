import { BrowserRouter, Route, Routes } from "react-router";

// component pages stand alone without layout
import Login from "./components/pages/LoginPage.jsx";
import Register from "./components/pages/RegisterPage.jsx";

// component pages need layout
import Home from "./components/pages/HomePages.jsx";
import Movies from "./components/pages/MoviesPages.jsx";
import BuyTicket from "./components/pages/BuyTicket.jsx";
import MovieDetails from "./components/pages/MovieDetails.jsx";
import ProfileHome from "./components/pages/profile/Profile.jsx";

// component layout
import LayoutHome from "./components/layout/LayoutHome.jsx";
import LayoutMovie from "./components/layout/LayoutMovie.jsx";
import LayoutProfile from "./components/layout/LayoutProfile.jsx";
import PrivateRoute from "./components/Auth/PrivateRoute.jsx";

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
          <Route path="details/:movieId" element={<MovieDetails />} />
        </Route>

        {/* route for layout profile */}
        <Route path="profile" element={<LayoutProfile />}>
          <Route
            index
            element={
              <PrivateRoute redirectTo="/login">
                <ProfileHome />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
