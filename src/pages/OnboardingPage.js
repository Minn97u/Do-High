import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const onboardingImages = [
  "/images/Frame1.png",
  "/images/Frame2.png",
  "/images/Frame3.png",
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    if (currentSlide < onboardingImages.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/main");
    }
  };

  return (
    <Container>
      <SlideWrapper>
        {onboardingImages.map((image, index) => {
          console.log(`Slide 렌더링 확인: index=${index}, image=${image}`);
          console.log(`이미지 로드 확인:`, image);
          return (
            <Slide key={index} $active={index === currentSlide}>
              <img src={image} alt={` ${index + 1}`} />
            </Slide>
          );
        })}
      </SlideWrapper>
      <Button onClick={handleNextSlide}>
        {currentSlide === onboardingImages.length - 1 ? "시작하기" : "다음"}
      </Button>
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
  position: relative;
  z-index: 1;
`;

const SlideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  opacity: ${(props) => (props.$active ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
  position: absolute;
  width: 100%;
  height: 100%;

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
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
