import { useState, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/pages/index.css";
import App from "./App.jsx";

// import Home from "./components/Home.jsx";

import Login from "./components/pages/LoginPage.jsx";
import Register from "./components/pages/RegisterPage.jsx";
import Movies from "./components/pages/MoviesPages.jsx";

export default function Home() {
  const [page, setPage] = useState("dom");
  function changeHandler(event) {
    setPage(event.target.value);
  }
  return (
    <>
      <select name="page" value={page} onChange={changeHandler}>
        <option value="login">Login</option>
        <option value="register">Register</option>
        <option value="movies">Movies</option>
      </select>
      {page === "login" && <Login />}
      {page === "register" && <Register />}
      {page === "movies" && <Movies />}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Home />
  </StrictMode>
  // <Login />
  // <Register />
  // <Movies />
);
