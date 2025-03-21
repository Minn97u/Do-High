import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg"; // 로고

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      navigate("/auth/login"); // 1초 후 로그인 페이지로 이동
    }, 1000);
  }, [navigate]);

  return isLoading ? (
    <Container
      as={motion.div}
      initial={{ opacity: 1 }} // 처음에는 완전 보이게
      animate={{ opacity: 0 }} // 점점 사라지는 효과
      transition={{ duration: 0.5, ease: "easeOut" }} // 0.5초 동안 서서히 페이드아웃
    >
      <Logo src={logo} alt="Company Logo" />
    </Container>
  ) : null;
};
