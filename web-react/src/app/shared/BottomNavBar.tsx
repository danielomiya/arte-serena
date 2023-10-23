import { TabBar } from "antd-mobile";
import {
  SearchOutlined,
  UserOutlined,
  HomeOutlined,
  BookOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { PageRoutes } from "../../conf/Global";
import styled from "styled-components";

const Wrapper = styled.div`
  border-top: solid 1px var(--adm-color-border);
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

export const BottomNavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const setRouteActive = (to: string) => navigate(to, { replace: false });

  const tabs = [
    {
      key: PageRoutes.HOME,
      title: "Home",
      icon: <HomeOutlined />,
    },
    {
      key: PageRoutes.SEARCH,
      title: "Search",
      icon: <SearchOutlined />,
    },
    {
      key: `${PageRoutes.COMPOSE}/post`,
      title: "Home",
      icon: <PlusOutlined />,
    },
    {
      key: PageRoutes.BOOKMARKS,
      title: "Bookmarks",
      icon: <BookOutlined />,
    },
    {
      key: PageRoutes.USER,
      title: "Me",
      icon: <UserOutlined />,
    },
  ];

  return (
    <Wrapper>
      <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
    </Wrapper>
  );
};
