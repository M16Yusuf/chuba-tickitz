// outlet
import { Outlet } from "react-router";
import Navbar from "/src/components/organism/Navbar";

function LayoutAuth() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default LayoutAuth;
