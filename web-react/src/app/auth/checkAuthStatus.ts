import Cookies from "js-cookie";
import { makeVar } from "@apollo/client";
import { Global } from "../../conf";
// import analytics from '../analytics';

export const checkAuthStatus = (): boolean => {
  const isAuthenticated = !!Cookies.get(Global.CLIENT_AUTH_COOKIE);
  // if (isAuthenticated) {
  //     analytics.identify(Cookies.get(Global.CLIENT_AUTH_COOKIE) as string);
  // }
  return isAuthenticated;
};

export const isLoggedInVar = makeVar(checkAuthStatus());
