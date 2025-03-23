import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      navigate("/auth/login"); // 로그인 페이지로 이동
    }, 1000);
  }, [navigate]);

  return isLoading ? (
    <Container
      as={motion.div}
      initial={{ opacity: 1 }} // 처음에는 완전 보이게
      animate={{ opacity: 0 }} // 점점 사라지는 효과
      transition={{ duration: 1, ease: "easeIn" }} // 1초 동안 서서히 페이드아웃
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
