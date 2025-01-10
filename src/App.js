import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Main";
import Login from "./pages/Login";
import Admin from "./pages/AdminPages/Admin";
import CreateAccount from "./pages/AdminPages/CreateAccount";
import CreateAccountNext from "./pages/AdminPages/CreateAccountNext";
import ManageAccount from "./pages/AdminPages/ManageAccount";
import BoardPost from "./pages/AdminPages/BoardPost";
import Alarm from "./pages/Alarm";
import MyPage from "./pages/MyPage";
import PwChange from "./pages/PwChange";
import NotFoundPage from "./pages/NotFoundPage";
import BoardList from "./pages/BoardList";
import BoardDetail from "./pages/BoardDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create" element={<CreateAccount />} />
        <Route path="/admin/create-next" element={<CreateAccountNext />} />
        <Route path="/admin/manage" element={<ManageAccount />} />
        <Route path="/alarm" element={<Alarm />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/pwchange" element={<PwChange />} />
        <Route path="/boardPost" element={<BoardPost />} />
        <Route path="/BoardList" element={<BoardList />} />
        <Route path="/BoardList/:boardId" element={<BoardDetail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
