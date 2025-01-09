import { css } from "styled-components";
import "./font.css";

export const Theme = {
  fonts: {
    default: css`
      font-family: "Pretendard";
      font-weight: 400;
      font-size: 14px;
    `,
    medium: css`
      font-family: "Pretendard";
      font-weight: 500;
      font-size: 16px;
    `,
    smallTitle: css`
      font-family: "Pretendard";
      font-weight: 600;
      font-size: 18px;
    `,
    subTitle: css`
      font-family: "Pretendard";
      font-size: 22px;
      font-weight: 800;
    `,
    title: css`
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
    gray: "#F5F5F5",
    gray2: "#BFBFBF",
    gray3: "#A3A3A3",
    black2: "#282828",
    black3: "#0C0C0C",
    black: "#000",
  },
  breakpoints: {},
};
