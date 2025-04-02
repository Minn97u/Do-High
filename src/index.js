import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import GlobalStyle from "./styles/GlobalStyle";
import { Theme } from "./styles/Theme";

// 알림 클릭 후 서비스워커가 보낸 메시지 수신 처리
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker 등록 성공:", registration);
    })
    .catch((err) => {
      console.error("Service Worker 등록 실패:", err);
    });

  navigator.serviceWorker.addEventListener("message", (event) => {
    const { type, redirectPath } = event.data || {};

    if (type === "REDIRECT" && redirectPath) {
      console.log("리디렉션 요청 수신:", redirectPath);
      window.location.href = redirectPath;
    }
  });
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
