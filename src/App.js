import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Main";
import Login from "./pages/Login";
import Admin from "./pages/AdminPages/Admin";
import CreateAccount from "./pages/AdminPages/CreateAccount";
import CreateAccountNext from "./pages/AdminPages/CreateAccountNext";
import SearchAccount from "./pages/AdminPages/SearchAccount";
import ManageAccount from "./pages/AdminPages/ManageAccount";
import ManageName from "./pages/AdminPages/ManagePages/ManageName";
import ManageWorkplace from "./pages/AdminPages/ManagePages/ManageWorkplace";
import ManageNum from "./pages/AdminPages/ManagePages/ManageNum";
import ManageLV from "./pages/AdminPages/ManagePages/ManageLV";
import ManageDate from "./pages/AdminPages/ManagePages/ManageDate";
import ManageIdPw from "./pages/AdminPages/ManagePages/ManageIdPw";
import BoardPost from "./pages/AdminPages/BoardPost";
import BoardEdit from "./pages/AdminPages/BoardEdit";
import Alarm from "./pages/Alarm";
import MypageEntry from "./pages/MypageEntry";
import MyPage from "./pages/MyPage";
import PwChange from "./pages/PwChange";
import NotFoundPage from "./pages/NotFoundPage";
import BoardList from "./pages/BoardList";
import BoardDetail from "./pages/BoardDetail";
import Quest from "./pages/Quest";
import ExpList from "./pages/ExpList";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
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
        <Route path="/auth/login" element={<Login />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create" element={<CreateAccount />} />
        <Route path="/admin/create-next" element={<CreateAccountNext />} />
        <Route path="/admin/search" element={<SearchAccount />} />
        <Route path="/admin/manage/:number" element={<ManageAccount />} />
        <Route path="/admin/manage/name/:id" element={<ManageName />} />
        <Route
          path="/admin/manage/workplace/:id"
          element={<ManageWorkplace />}
        />
        <Route path="/admin/manage/number/:id" element={<ManageNum />} />
        <Route path="/admin/manage/level/:id" element={<ManageLV />} />
        <Route path="/admin/manage/date/:id" element={<ManageDate />} />
        <Route path="/admin/manage/account/:id" element={<ManageIdPw />} />

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
