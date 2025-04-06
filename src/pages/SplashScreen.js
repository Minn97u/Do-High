import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Axios } from "../api/Axios";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const isAdmin = localStorage.getItem("isAdmin") === "true";

      await new Promise((res) => setTimeout(res, 1500)); // 애니메이션용 delay
      setIsFading(false);

      // 1. accessToken이 있으면 바로 이동
      if (accessToken) {
        navigate(isAdmin ? "/admin" : "/main");
        return;
      }

      // 2. refreshToken이 있으면 재발급 시도
      if (refreshToken) {
        try {
          const res = await Axios.post("/auth/refresh", { refreshToken });
          const newAccessToken = res.data.success.accessToken;
          localStorage.setItem("accessToken", newAccessToken);
          navigate(isAdmin ? "/admin" : "/main");
        } catch (err) {
          console.error("리프레시 실패 → 로그인으로 이동:", err);
          localStorage.clear();
          navigate("/auth/login");
        }
        return;
      }

      // 3. 둘 다 없으면 로그인
      navigate("/auth/login");
    };

    handleAuth();
  }, [navigate]);

  return isFading ? (
    <Container
      as={motion.div}
      initial={{ opacity: 1 }} // 처음에는 완전 보이게
      animate={{ opacity: 0 }} // 점점 사라지는 효과
      transition={{ duration: 1.5, ease: "easeIn" }} // 1.5초 동안 서서히 페이드아웃
    >
      <Logo src={logo} alt="Company Logo" />
    </Container>
  ) : null;
};

export default SplashScreen;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
`;

const Logo = styled.img`
  width: 150px;
`;
