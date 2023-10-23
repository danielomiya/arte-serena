import { useCallback, useState } from "react";
import { Form, Input, Button } from "antd-mobile";
import { message } from "antd";
import QueryString from "query-string";
import { isLoggedInVar } from "./checkAuthStatus";
import { useReactiveVar } from "@apollo/client";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Message } from "../shared/Message";
import { PageRoutes } from "../../conf/Global";

type FormValues = {
  username: string;
  password: string;
};

export const LogIn = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const location = useLocation();
  const params = QueryString.parse(location.search);

  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback((values: FormValues) => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    };
    fetch('/auth/logIn', requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        isLoggedInVar(true);
        // refreshContext();
        // analytics.event({ type: EventType.LogInEvent });
        return Promise.resolve();
      })
      .catch((_) => {
        message.error("Falha ao entrar! Ocorreu um erro inesperado.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (isLoggedIn) {
    const maybeRedirectUri = params.redirectUri;
    return (
      <Navigate
        to={
          (maybeRedirectUri &&
            decodeURIComponent(maybeRedirectUri as string)) ||
          "/"
        }
      />
    );
  }

  return (
    <Form onFinish={handleLogin} layout="vertical">
      <Form.Header>Entre novamente</Form.Header>
      {loading && <Message type="loading" content="Entrando..." />}
      <Form.Item name="username" label={<label>Usuário</label>}>
        <Input data-testid="username" type="email" />
      </Form.Item>
      <Form.Item name="password" label={<label>Senha</label>}>
        <Input data-testid="password" type="password" />
      </Form.Item>
      <Form.Item style={{ marginBottom: "0px" }} shouldUpdate>
        {({ getFieldsValue }) => {
          const { username, password } = getFieldsValue();
          const formIsComplete = !!username && !!password;
          return (
            <><Button
              block
              type="submit"
              color="primary"
              size="large"
              disabled={!formIsComplete}
            >
              Continuar
            </Button>
            Ou <Link to={PageRoutes.SIGN_UP}>cadastre-se agora!</Link>
            </>
          );
        }}
      </Form.Item>
    </Form>
  );
};
