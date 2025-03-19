import { Navigate, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
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
    </>
  );
}

export default App;
