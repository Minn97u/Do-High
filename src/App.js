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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Home />} />
        <Route path="/alarm" element={<Alarm />} />
        <Route path="/auth/login" element={<Login />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create" element={<CreateAccount />} />
        <Route path="/admin/create-next" element={<CreateAccountNext />} />
        <Route path="/admin/search" element={<SearchAccount />} />
        <Route path="/admin/manage" element={<ManageAccount />} />
        <Route path="/admin/manage/name" element={<ManageName />} />
        <Route path="/admin/manage/workplace" element={<ManageWorkplace />} />
        <Route path="/admin/manage/number" element={<ManageNum />} />
        <Route path="/admin/manage/level" element={<ManageLV />} />
        <Route path="/admin/manage/date" element={<ManageDate />} />
        <Route path="/admin/manage/account" element={<ManageIdPw />} />

        <Route path="/mypage-entry" element={<MypageEntry />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/pwchange" element={<PwChange />} />

        <Route path="/boardPost" element={<BoardPost />} />
        <Route path="/boardEdit" element={<BoardEdit />} />
        <Route path="/boardPost" element={<BoardPost />} />
        <Route path="/BoardList" element={<BoardList />} />
        <Route path="/BoardList/:boardId" element={<BoardDetail />} />

        <Route path="/quest" element={<Quest />} />
        <Route path="/exp" element={<ExpList />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
