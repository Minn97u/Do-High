import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";

const onboardingImages = [
  "/images/Frame1.png",
  "/images/Frame2.png",
  "/images/Frame3.png",
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%", // 오른쪽으로 이동 (다음 슬라이드)
    opacity: 0,
  }),
  center: {
    x: "0%", // 👉 화면 중앙 정렬
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%", // 왼쪽으로 이동 (이전 슬라이드)
    opacity: 0,
  }),
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextSlide(), // 왼쪽으로 스와이프하면 다음 슬라이드
    onSwipedRight: () => handlePrevSlide(), // 오른쪽으로 스와이프하면 이전 슬라이드
    trackMouse: true, // 마우스 드래그도 허용
  });

  const handleNextSlide = () => {
    if (currentSlide < onboardingImages.length - 1) {
      setDirection(1); // 오른쪽
      setCurrentSlide((prev) => prev + 1);
    } else {
      navigate("/main");
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1); // 왼쪽
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <Container {...handlers}>
      <SlideWrapper>
        <AnimatePresence initial={false} custom={direction}>
          <Slide
            key={currentSlide}
            custom={direction}
            variants={slideVariants} // variants 사용하여 방향 지정
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }} 
          >
            <img
              src={onboardingImages[currentSlide]}
              alt={`Onboarding ${currentSlide + 1}`}
            />
          </Slide>
        </AnimatePresence>
      </SlideWrapper>

      {currentSlide === onboardingImages.length - 1 && (
        <Button onClick={handleNextSlide}>시작하기 </Button>
      )}
    </Container>
  );
};

export default Onboarding;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  touch-action: pan-y;
`;

const SlideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Slide = styled(motion.div)`
  flex: 0 0 100%;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.$active ? "1" : "0")};

  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;

const Button = styled.button`
  position: absolute;
  bottom: 20px;
  padding: 10px 20px;
  background-color: #fc5833;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
