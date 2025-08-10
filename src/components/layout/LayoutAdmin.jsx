import { Outlet } from "react-router";
import NavbarAdmin from "/src/components/organism/NavbarAdmin.jsx";

function LayoutAdmin() {
  return (
    <>
      <NavbarAdmin />
      <Outlet />
    </>
  );
}

export default LayoutAdmin;
