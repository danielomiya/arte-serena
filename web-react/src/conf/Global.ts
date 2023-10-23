export enum PageRoutes {
  // root
  ROOT = "/",

  // authentication flow
  AUTHENTICATE = "/auth/authenticate",
  LOG_IN = "/login",
  SIGN_UP = "/signup",

  // static files
  ASSETS = "/assets",

  // app
  HOME = "/home",
  SEARCH = "/search",
  BOOKMARKS = "/bookmarks",
  COMPOSE = "/compose",

  USER = "/profile",
  POST = "/post",

  // user settings?
  SETTINGS = "/settings",
}

export const CLIENT_AUTH_COOKIE = "actor";
