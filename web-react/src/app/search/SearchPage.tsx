import { BottomNavBar } from "../shared/BottomNavBar";
import { Form, SearchBar, NavBar, Button } from "antd-mobile";
import { SearchOutlined } from "@ant-design/icons";

export const SearchPage = () => {
  const handleSearch = () => {};

  return (
    <>
      <Form>
        <NavBar
          backArrow={false}
          right={
            <Button color="primary" onClick={handleSearch}>
              Buscar
            </Button>
          }
        >
          <SearchBar placeholder="Digite algo para buscar" icon={<SearchOutlined />} onSearch={handleSearch} />
        </NavBar>
      </Form>
      {/* TODO: implement fetch results */}
      <BottomNavBar />
    </>
  );
};
