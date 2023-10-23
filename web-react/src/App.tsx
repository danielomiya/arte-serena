import Cookies from "js-cookie";
import { message } from "antd";
import { ConfigProvider as AntdProvider } from "antd-mobile";
import defaultThemeConfig from "./conf/theme/light.config.json";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./app/Routes";
import {
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  ServerError,
} from "@apollo/client";
import { isLoggedInVar } from "./app/auth/checkAuthStatus";
import { onError } from "@apollo/client/link/error";
import { ThemeProvider } from "styled-components";
import { Theme } from "./conf/theme/types";
import { useEffect, useState } from "react";
import { Global } from "./conf";
import { PageRoutes } from "./conf/Global";
import { GlobalStyle } from "./GlobalStyles";
import ptBR from "./antdLocale";

const httpLink = createHttpLink({ uri: "/api/v1/graphql" });

const errorLink = onError((error) => {
  const { networkError, graphQLErrors } = error;
  if (networkError) {
    const serverError = networkError as ServerError;
    if (serverError.statusCode === 401) {
      isLoggedInVar(false);
      Cookies.remove(Global.CLIENT_AUTH_COOKIE);
      const currentPath = window.location.pathname + window.location.search;
      window.location.replace(
        `${PageRoutes.AUTHENTICATE}?redirect_uri=${encodeURIComponent(
          currentPath
        )}`
      );
    }
  }
  if (graphQLErrors && graphQLErrors.length) {
    const firstError = graphQLErrors[0];
    const { extensions } = firstError;
    const errorCode = extensions && (extensions.code as number);
    // Fallback in case the calling component does not handle.
    message.error(`${firstError.message} (code ${errorCode})`, 3);
  }
});

const client = new ApolloClient({
  connectToDevTools: true,
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "include",
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export const App = () => {
  const [dynamicThemeConfig, setDynamicThemeConfig] =
    useState<Theme>(defaultThemeConfig);

  useEffect(() => {
    import(
      `./conf/theme/${import.meta.env.VITE_THEME_CONFIG}.config.json`
    ).then((theme) => {
      setDynamicThemeConfig(theme);
    });
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider theme={dynamicThemeConfig}>
        <AntdProvider locale={ptBR}>
          <GlobalStyle />
          <Router>
            <Helmet>
              <title>{dynamicThemeConfig.content.title}</title>
            </Helmet>
            <ApolloProvider client={client}>
              <Routes />
            </ApolloProvider>
          </Router>
        </AntdProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};
