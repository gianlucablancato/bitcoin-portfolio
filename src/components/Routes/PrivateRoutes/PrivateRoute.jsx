import { useLocation, Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const isUserLogged = !!sessionStorage.getItem("userLogged");
  return isUserLogged;
};

const PrivateRoute = () => {
  const isAuth = useAuth();
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
