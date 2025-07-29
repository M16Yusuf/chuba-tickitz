// import { useState } from "react";

// import Login from "./pages/LoginPage.jsx";
// import Register from "./pages/RegisterPage.jsx";
// import Movies from "./pages/MoviesPages.jsx";

// export default function Home() {
//   const [page, setPage] = useState("dom");
//   function changeHandler(event) {
//     setPage(event.target.value);
//   }
//   return (
//     <>
//       <select name="page" value={page} onChange={changeHandler}>
//         <option value="login">Login</option>
//         <option value="register">Register</option>
//         <option value="movies">Movies</option>
//       </select>
//       {page === "login" && <Login />}
//       {page === "register" && <Register />}
//       {page === "movies" && <Movies />}
//     </>
//   );
// }
