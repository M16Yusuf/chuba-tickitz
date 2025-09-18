import { BrowserRouter, Route, Routes } from "react-router";

// component pages stand alone without layout
import Login from "./components/pages/LoginPage.jsx";
import Register from "./components/pages/RegisterPage.jsx";

// component pages need layout
import Home from "./components/pages/HomePages.jsx";
import Movies from "./components/pages/MoviesPages.jsx";
// import BuyTicket from "./components/pages/BuyTicket.jsx";
// movies order
import MovieDetails from "./components/pages/MovieDetails.jsx";
import OrderPages from "./components/pages/OrderPages.jsx";
import PaymentPages from "./components/pages/Payment.jsx";
import TicketPage from "./components/pages/TicketPage.jsx";
// profile page
import ProfileHome from "./components/pages/profile/Profile.jsx";
// admin page
import DashboardPage from "./components/pages/admin/DashboardPage.jsx";
import AddMoviePage from "./components/pages/admin/AddMovie.jsx";

// component layout
import LayoutHome from "./components/layout/LayoutHome.jsx";
import LayoutMovie from "./components/layout/LayoutMovie.jsx";
import LayoutAuth from "./components/layout/LayoutAuth.jsx";

// private route
import {
  PrivateRoute,
  PublicRoute,
  AdminRoute,
} from "./components/Auth/PrivateRoute.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="login"
          element={
            <PublicRoute redirectTo="/profile">
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute redirectTo="/profile">
              <Register />
            </PublicRoute>
          }
        />

        {/* main route layoutHome for home, movie, and buy ticket */}
        <Route path="/" element={<LayoutHome />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          {/* <Route path="buyticket" element={<BuyTicket />} /> */}
        </Route>

        {/* route for layoutMovie for, movie details, seat, payment, ticket */}
        <Route path="movies" element={<LayoutMovie />}>
          <Route path="details/:movieId" element={<MovieDetails />} />
          <Route path="order" element={<OrderPages />} />
          <Route path="payment" element={<PaymentPages />} />
          <Route path="ticket" element={<TicketPage />} />
        </Route>

        {/* route for layout profile */}
        <Route path="profile" element={<LayoutAuth />}>
          <Route
            index
            element={
              <PrivateRoute redirectTo="/login">
                <ProfileHome />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="admin"
          element={
            <AdminRoute redirectTo={"/profile"}>
              <LayoutAuth />
            </AdminRoute>
          }
        >
          <Route index path="dashboard" element={<DashboardPage />} />
          <Route path="addmovie" element={<AddMoviePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
