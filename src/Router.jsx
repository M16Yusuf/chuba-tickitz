import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import Login from "./components/pages/LoginPage.jsx";
import Register from "./components/pages/RegisterPage.jsx";

import Home from "./components/pages/HomePages.jsx";
import Movies from "./components/pages/MoviesPages.jsx";
import BuyTicket from "./components/pages/BuyTicket.jsx";

import Navbar from "./components/organism/Navbar/Navbar.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Home />}></Route> */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Routelayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="movie" element={<Movies />} />
          <Route path="buyticket" element={<BuyTicket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Routelayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Router;
