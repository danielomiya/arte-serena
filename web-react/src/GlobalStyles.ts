import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  :root:root {
    --adm-color-primary: ${(props) => props.theme.styles["primary-color"]};
    // --adm-color-success: #00b578;
    // --adm-color-warning: #ff8f1f;
    // --adm-color-danger: #ff3141;
  
    // --adm-color-white: #ffffff;
    // --adm-color-text: ${(props) => props.theme.styles["text-color"]};
    // --adm-color-text-secondary: ${(props) =>
      props.theme.styles["text-color-secondary"]};
    // --adm-color-weak: #999999;
    // --adm-color-light: ${(props) =>
      props.theme.styles["primary-color-light"]};
    // --adm-color-border: ${(props) =>
      props.theme.styles["border-color-base"]};
    // --adm-color-box: #f5f5f5;
    // --adm-color-background: ${(props) =>
      props.theme.styles["background-color-light"]};
  }
`;
