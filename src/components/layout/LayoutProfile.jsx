// outlet
import { Outlet } from "react-router";
import NavbarProfile from "/src/components/organism/NavbarProfile.jsx";

function LayoutProfile() {
  return (
    <>
      <NavbarProfile />
      <Outlet />
    </>
  );
}

export default LayoutProfile;
