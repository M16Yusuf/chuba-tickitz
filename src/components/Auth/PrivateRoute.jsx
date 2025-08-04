import { Navigate } from "react-router";

/**
 * @param {Object} props
 * @param {string} props.redirectTo
 * @param {JSX.Element} props.children
 * @returns
 */
function PrivateRoute({ redirectTo, children }) {
  if (localStorage.getItem("koda3:login") == null) {
    return <Navigate to={redirectTo} replace />;
  }
  // if logged, u can navigate
  return children;
}

export default PrivateRoute;
