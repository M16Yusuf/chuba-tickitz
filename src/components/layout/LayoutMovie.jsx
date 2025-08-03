// component organism
import { Outlet } from "react-router";
import Navbar from "/src/components/organism/Navbar.jsx";
import Footer from "/src/components/organism/Footer.jsx";

function layoutMovie() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default layoutMovie;
