import { useSelector } from "react-redux";
import { Navigate } from "react-router";

/**
 * @param {Object} props
 * @param {string} props.redirectTo
 * @param {JSX.Element} props.children
 * @returns
 */
function PrivateRoute({ redirectTo, children }) {
  const authState = useSelector((state) => state.auth);
  // if there is no auth data, navigate to login
  if (!authState.user || Object.keys(authState.user).length === 0) {
    return <Navigate to={redirectTo} replace />;
  }
  // if there is auth and it is admin, redirect ke dashboard admin
  if (authState.user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }
  // if there is auth, u can go the direction
  return children;
}

/**
 * @param {Object} props
 * @param {string} props.redirectTo
 * @param {JSX.Element} props.children
 * @returns
 */
function PublicRoute({ redirectTo, children }) {
  const authState = useSelector((state) => state.auth);
  if (authState.user && Object.keys(authState.user).length > 0) {
    return <Navigate to={redirectTo} replace />;
  }
  // if logged in, u cant naivate
  return children;
}

/**
 * @param {Object} props
 * @param {string} props.redirectTo
 * @param {JSX.Element} props.children
 * @returns
 */
function AdminRoute({ redirectTo, children }) {
  const authState = useSelector((state) => state.auth);
  console.log(authState.user.role);
  if (authState.user.role != "admin") {
    return <Navigate to={redirectTo} replace />;
  }
  // if login as admin, u cant naivate
  return children;
}

export { PrivateRoute, PublicRoute, AdminRoute };
