// component organism
import { Outlet } from "react-router";
import Navbar from "/src/components/organism/Navbar.jsx";
import Footer from "/src/components/organism/Footer.jsx";
import Subscribe from "/src/components/organism/SectionSubscribe.jsx";

function LayoutHome() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Subscribe />
      <Footer />
    </>
  );
}
export default LayoutHome;
