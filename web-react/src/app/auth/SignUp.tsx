import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { Input, Button, Form } from "antd-mobile";
import { PageRoutes } from "../../conf/Global";
import { useNavigate, Link } from "react-router-dom";
import { isLoggedInVar } from "./checkAuthStatus";
import { useReactiveVar } from "@apollo/client";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const navigate = useNavigate();

  const handleSignUp = useCallback((values: FormValues) => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      }),
    };
    fetch('/auth/signUp', requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        isLoggedInVar(true);
        // refreshContext();
        // analytics.event({ type: EventType.SignUpEvent, title: values.title });
        return Promise.resolve();
      })
      .catch((_) => {
        message.error(`Falha ao cadastrar-se! Ocorreu um erro inesperado.`);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isLoggedIn && !loading) {
      navigate(PageRoutes.ROOT);
    }
  });

  return (
    <Form onFinish={handleSignUp} layout="vertical">
      <Form.Header>Cadastre-se</Form.Header>
      <Form.Item
        rules={[{ required: true, message: "Por favor, preencha o seu nome." }]}
        name="fullName"
        label={<label>Nome</label>}
      >
        <Input data-testid="name" />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "" }]}
        name="email"
        label={<label>Email</label>}
      >
        <Input data-testid="email" />
      </Form.Item>
      <Form.Item
        rules={[
          { required: true, message: "Por favor, preencha a sua senha." },
          ({ getFieldValue }) => ({
            validator() {
              if (getFieldValue("password").length < 8) {
                return Promise.reject(
                  new Error("Sua senha tem menos de 8 caracteres.")
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
        name="password"
        label={<label>Senha</label>}
      >
        <Input type="password" data-testid="password" />
      </Form.Item>
      <Form.Item
        rules={[
          { required: true, message: "Por favor, confirme a sua senha." },
          ({ getFieldValue }) => ({
            validator() {
              if (
                getFieldValue("confirmPassword") !== getFieldValue("password")
              ) {
                return Promise.reject(new Error("As senhas não coincidem."));
              }
              return Promise.resolve();
            },
          }),
        ]}
        name="confirmPassword"
        label={<label>Confirmar senha</label>}
      >
        <Input type="password" data-testid="confirmPassword" />
      </Form.Item>
      <Form.Item shouldUpdate>
        {({ getFieldsValue }) => {
          const { fullName, email, password, confirmPassword } =
            getFieldsValue() as {
              fullName: string;
              email: string;
              password: string;
              confirmPassword: string;
            };
          const fieldsAreNotEmpty =
            !!fullName && !!email && !!password && !!confirmPassword;
          const passwordsMatch = password === confirmPassword;
          const formIsComplete = fieldsAreNotEmpty && passwordsMatch;
          return (
            <>
            <Button
              block
              type="submit"
              color="primary"
              size="large"
              disabled={!formIsComplete}
            >
              Continuar
            </Button>
            Já tem uma conta? <Link to={PageRoutes.LOG_IN}>Entre aqui!</Link>
            </>
          );
        }}
      </Form.Item>
    </Form>
  );
};
