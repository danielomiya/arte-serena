import { Typography } from "antd";
import { Divider, Toast, Card, Image } from "antd-mobile";
import { BottomNavBar } from "../shared/BottomNavBar";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import type { ToastHandler } from "antd-mobile/es/components/toast";
import tsuruPng from '../../assets/tsuru-com-post-it.png';

const Header = styled.header`
  margin: 5px;
`;

const { Paragraph, Title } = Typography;

export const BookmarksPage = () => {
  const handler = useRef<ToastHandler>();

  useEffect(() => {
    handler.current = Toast.show({
      icon: "loading",
      duration: 0,
      content: (
        <Paragraph color="secondary">
          Oops, as funcionalidades dessa página ainda não foram implementadas!
        </Paragraph>
      ),
    });

    return () => handler?.current?.close();
  });

  return (
    <>
      <Header>
        <Title level={3}>Salvos anteriormente</Title>
        <Paragraph type="secondary">
          Sua playlist de favoritos
        </Paragraph>
      </Header>
      <Divider />
      <Card title="Tsuru"><Image src={tsuruPng} /></Card>
      <BottomNavBar />
    </>
  );
};
