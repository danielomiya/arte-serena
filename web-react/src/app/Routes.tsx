import Cookie from "js-cookie";
import { useRoutes, Outlet } from "react-router-dom";
import { LogIn } from "./auth/LogIn";
import { SignUp } from "./auth/SignUp";
import { PageRoutes } from "../conf/Global";
import { isLoggedInVar } from "./auth/checkAuthStatus";
import { useReactiveVar } from "@apollo/client";
import { LandingPage } from "./landing/LandingPage";
import { HomePage } from "./home/HomePage";
import { ComposePostPage } from "./compose/ComposePostPage";
import { ComposeCommentPage } from "./compose/ComposeCommentPage";
import { SearchPage } from "./search/SearchPage";
import { ProtectedRoute } from "./ProtectedRoutes";
import { BookmarksPage } from "./bookmarks/BookmarksPage";
import { NotFoundPage } from "./shared/NotFoundPage";
import { UserPage } from "./user/UserPage";
import { Global } from "../conf";
import { Navigate } from "react-router-dom";

const LogOut = () => {
  Cookie.remove(Global.CLIENT_AUTH_COOKIE);
  return <Navigate to={PageRoutes.ROOT} replace={false} />;
};

export const Routes = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return useRoutes([
    {
      path: PageRoutes.LOG_IN,
      element: <LogIn />,
    },
    {
      path: PageRoutes.SIGN_UP,
      element: <SignUp />,
    },
    {
      path: "/logout",
      element: <LogOut />,
    },
    {
      path: PageRoutes.ROOT,
      element: <LandingPage />,
    },
    {
      path: PageRoutes.HOME,
      element: (
        <ProtectedRoute isLoggedIn={isLoggedIn} element={<HomePage />} />
      ),
    },
    {
      path: PageRoutes.COMPOSE,
      element: <ProtectedRoute isLoggedIn={isLoggedIn} element={<Outlet />} />,
      children: [
        {
          path: "post",
          element: <ComposePostPage />,
        },
        {
          path: "comment/:postId",
          element: <ComposeCommentPage />,
        },
      ],
    },
    {
      path: PageRoutes.SEARCH,
      element: (
        <ProtectedRoute isLoggedIn={isLoggedIn} element={<SearchPage />} />
      ),
    },
    {
      path: PageRoutes.BOOKMARKS,
      element: (
        <ProtectedRoute isLoggedIn={isLoggedIn} element={<BookmarksPage />} />
      ),
    },
    {
      path: `${PageRoutes.USER}/:userId`,
      element: (
        <ProtectedRoute isLoggedIn={isLoggedIn} element={<UserPage />} />
      ),
    },
    {
      path: `${PageRoutes.POST}/:postId`,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
};
