import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Admin from "./pages/AdminPages/Admin";
import BoardEdit from "./pages/AdminPages/BoardEdit";
import BoardPost from "./pages/AdminPages/BoardPost";
import Alarm from "./pages/Alarm";
import BoardDetail from "./pages/BoardDetail";
import BoardList from "./pages/BoardList";
import ExpList from "./pages/ExpList";
import Login from "./pages/Login";
import Home from "./pages/Main";
import MyPage from "./pages/MyPage";
import MypageEntry from "./pages/MypageEntry";
import NotFoundPage from "./pages/NotFoundPage";
import OnboardingPage from "./pages/OnboardingPage";
import PwChange from "./pages/PwChange";
import Quest from "./pages/Quest";
import SplashScreen from "./pages/SplashScreen";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  // 알림 클릭 시 동작 처리
  useEffect(() => {
    if (!navigator.serviceWorker) return;

    const handler = (event) => {
      if (event.data?.type === "REDIRECT" && event.data.redirectPath) {
        console.log("📨 REDIRECT 수신:", event.data.redirectPath);
        navigate(event.data.redirectPath);
      }
    };

    navigator.serviceWorker.addEventListener("message", handler);

    return () => {
      navigator.serviceWorker.removeEventListener("message", handler);
    };
  }, [navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/splash" />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/admin" element={<Admin />} />

          <Route
            path="/main"
            element={
              <Layout hasNavBar>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/alarm"
            element={
              <Layout hasNavBar>
                <Alarm />
              </Layout>
            }
          />

          <Route
            path="/mypage-entry"
            element={
              <Layout hasNavBar>
                <MypageEntry />
              </Layout>
            }
          />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/pwchange" element={<PwChange />} />
          <Route
            path="/boardlist"
            element={
              <Layout hasNavBar>
                <BoardList />
              </Layout>
            }
          />
          <Route path="/boardPost" element={<BoardPost />} />
          <Route path="/boardlist/:boardId" element={<BoardDetail />} />
          <Route path="/boardedit/:boardId" element={<BoardEdit />} />
          <Route
            path="/quest"
            element={
              <Layout hasNavBar>
                <Quest />
              </Layout>
            }
          />
          <Route
            path="/exp"
            element={
              <Layout hasNavBar>
                <ExpList />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout hasNavBar>
                <NotFoundPage />
              </Layout>
            }
          />
        </Routes>
        <ScrollToTop />
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    </QueryClientProvider>
  );
}

export default App;
