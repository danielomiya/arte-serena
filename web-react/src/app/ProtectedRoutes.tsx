import { Navigate } from "react-router-dom";
import { PageRoutes } from "../conf/Global";

type ProtectedRouteProps = {
  isLoggedIn: boolean;
  element: JSX.Element;
};

export const ProtectedRoute = ({
  isLoggedIn,
  element,
}: ProtectedRouteProps) => {
  const currentPath = window.location.pathname + window.location.search;

  if (!isLoggedIn)
    return (
      <Navigate
        replace
        to={`${PageRoutes.AUTHENTICATE}?redirectUri=${encodeURIComponent(
          currentPath
        )}`}
      />
    );

  return element;
};
