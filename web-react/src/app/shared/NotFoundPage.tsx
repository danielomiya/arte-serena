import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../../conf/Global";
import { Button } from "antd-mobile";
import { Result } from "antd";
import { BottomNavBar } from "./BottomNavBar";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate(PageRoutes.ROOT, { replace: true });

  return (
    <>
      <Result
        status={404}
        title="Não encontrado!"
        subTitle="Oops, parece que você está perdido"
        extra={[
          <Button color="default" onClick={goToHome} key="go-to-home">
            Voltar ao início
          </Button>,
        ]}
      />
      <BottomNavBar />
    </>
  );
};
