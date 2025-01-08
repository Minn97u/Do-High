import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./font.css";

const GlobalStyle = createGlobalStyle`
  ${reset};

  html, body, div, span, h1, h2, h3, h4, h5, h6, p,
  a, dl, dt, dd, ol, ul, li, form, label, table, input, textarea, button {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: 'Pretendard';
    font-weight: 400;
    text-decoration: none;
    box-sizing: border-box;
    line-height: 1.5em;
    &:visited {
      text-decoration: none;
      color: black;
    }
  }
  body {
    margin: 0;
    padding: 0;
  }
  ol, ul {
    list-style: none;
  }
  button {
    border: 0;
    cursor: pointer;
    outline: none;
  }
`;

export default GlobalStyle;
