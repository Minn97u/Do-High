import React, { useState } from "react";
import styled from "styled-components";
import coinIcon from "../assets/coin.svg";

const FlippableCardWithMonth = ({ quest }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardWrapper onClick={handleFlip}>
      <Card isFlipped={isFlipped}>
        <FrontContainer>
          <CardHeader>
            <CardLeft>
              <Status>{quest.status}</Status>
              <Icon src={coinIcon} alt="coin" />
            </CardLeft>
            <CardContent>
              <CardTitle>{quest.title}</CardTitle>
              <DottedLine />
              <Description>{quest.description}</Description>
              <Description>{quest.maxPoints}</Description>
            </CardContent>
          </CardHeader>
          <CardFooter>{quest.earnedPoints}</CardFooter>
        </FrontContainer>
        <CardBack>
          <WeekGrid>
            {Array.from({ length: 5 }, (_, i) => (
              <Week key={i} achieved={i < 2}>
                <WeekText>{32 + i}주</WeekText>
                <Icon2 src={coinIcon} alt="coin" />
              </Week>
            ))}
          </WeekGrid>
          <TotalEarned>2 / 5주</TotalEarned>
        </CardBack>
      </Card>
    </CardWrapper>
  );
};

export default FlippableCardWithMonth;

// Styled Components
const CardWrapper = styled.div`
  perspective: 1000px;
  width: 310px;
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`;

const Card = styled.div`
  width: 310px;
  height: 210px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(180deg)" : "rotateY(0)"};
`;

const FrontContainer = styled.div`
  background: white;
  border-radius: 18px;
  scroll-snap-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 18px;
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 35px 25px 0 25px;
  margin-bottom: 47px;
`;

const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 29px;
`;

const Icon = styled.img`
  width: 68px;
  height: 68px;
`;

const Status = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  margin-bottom: 4px;
`;

const CardContent = styled.div`
  margin-top: 12px;
`;

const CardTitle = styled.h2`
  ${(props) => props.theme.fonts.semiBold};
  margin-bottom: 4px;
`;

const DottedLine = styled.div`
  border-top: 1px dashed ${(props) => props.theme.colors.gray2};
  opacity: 0.5;
  margin-bottom: 10px;
`;

const Description = styled.p`
  ${(props) => props.theme.fonts.medium};
  margin-bottom: 2px;
  color: ${(props) => props.theme.colors.gray2};
`;

const CardFooter = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  padding: 4px 0;
  text-align: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainC};
  border-radius: 0 0 18px 18px;
  margin-top: 17px;
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  padding: 65px 20px;
  padding-bottom: 45px;
`;

const Week = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({ achieved }) => (achieved ? "1" : "0.5")};
`;

const WeekText = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Icon2 = styled.img`
  width: 38px;
  height: 38px;
  margin-bottom: 5px;
  filter: ${({ achieved }) => (achieved ? "none" : "grayscale(100%)")};
`;

const TotalEarned = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  padding: 4px 0;
  text-align: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainC};
  border-radius: 0 0 18px 18px;
`;
