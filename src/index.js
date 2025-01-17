import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { Theme } from "./styles/Theme";
import { BrowserRouter } from "react-router-dom";
// import { handleAllowNotification } from "./NotificationFunc";

// 서비스 워커 등록 함수
// const registerServiceWorker = async () => {
//   if ("serviceWorker" in navigator) {
//     try {
//       const registration = await navigator.serviceWorker.register(
//         "../firebase-messaging-sw.js"
//       );
//       console.log("Service Worker registered with scope:", registration.scope);
//     } catch (error) {
//       console.error("Service Worker registration failed:", error);
//     }
//   }
// };

// handleAllowNotification();
// registerServiceWorker();

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
