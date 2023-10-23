import Cookies from "js-cookie";
import { isLoggedInVar } from "../auth/checkAuthStatus";
import { Link, useNavigate } from "react-router-dom";
import { PageRoutes } from "../../conf/Global";
import { useReactiveVar } from "@apollo/client";
import { Global } from "../../conf";
import { useEffect } from "react";

export const LandingPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // analytics.event({ type: EventType.LogOutEvent });
    isLoggedInVar(false);
    Cookies.remove(Global.CLIENT_AUTH_COOKIE);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(PageRoutes.HOME);
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <h1>Arte Serena</h1>
      <p>
        Novo aqui? <Link to={PageRoutes.SIGN_UP}>Registre-se agora!</Link>
      </p>
      <p>
        Já tem uma conta? <Link to={PageRoutes.LOG_IN}>Entre aqui!</Link>
      </p>
      <hr />
      <h2>Debug:</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};
