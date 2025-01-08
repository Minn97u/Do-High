import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Alarm from "./pages/ Alarm";
import MyPage from "./pages/MyPage";
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
        <Route path="/alarm" element={<Alarm />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/BoardList" element={<BoardList />} />
        <Route path="/BoardList/:boardId" element={<BoardDetail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
