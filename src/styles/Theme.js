import { css } from "styled-components";
import "./font.css";

export const Theme = {
  fonts: {
    regular: css`
      font-family: "Pretendard";
      font-weight: 400;
      font-size: 12px;
    `,
    medium: css`
      font-family: "Pretendard";
      font-weight: 500;
      font-size: 14px;
    `,
    semiBold: css`
      font-family: "Pretendard";
      font-weight: 600;
      font-size: 16px;
    `,
    bold: css`
      font-family: "Pretendard";
      font-size: 18px;
      font-weight: 700;
    `,
    extraBold: css`
      font-family: "Pretendard";
      font-size: 24px;
      font-weight: 800;
    `,
    Nanum: css`
      font-family: "nanumsquare";
    `,
  },

  colors: {
    mainC: "#FC5833",
    subBlue: "#94C1FF",
    subOrange: "#FF8A3F",
    subBrown: "#691D1D",
    white: "#ffffff",
    gray: "#F7F8FA",
    gray2: "#BFBFBF",
    gray3: "#A3A3A3",
    black2: "#282828",
    black3: "#0C0C0C",
    btn: "linear-gradient(to right, #FF962D, #F34F43)",
    btnGray: "#A6A8AB",
    black: "#000",
  },
  breakpoints: {},
};
