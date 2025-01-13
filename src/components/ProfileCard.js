import React, { useState } from "react";
import styled from "styled-components";
import profile from "../assets/profile.svg";
import coinIcon from "../assets/coin.svg";
import speechBubble from "../assets/speechBubble.svg";
import speechBubble2 from "../assets/speechBubble2.svg";
import speechBubble3 from "../assets/speechBubble3.svg";
import info from "../assets/info.svg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProfileCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const percentage = currentSlide === 1 ? 22 : 83;
  const slides = [0, 1, 2];

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleInfoClick = () => {
    setTooltipVisible(!tooltipVisible);
  };

  // const calculateCoinPosition = (percentage) => {
  //   const angle = (percentage / 100) * 360 - 90;
  //   const radius = 70;
  //   const x = radius * Math.cos((angle * Math.PI) / 180);
  //   const y = radius * Math.sin((angle * Math.PI) / 180);
  //   return { x, y };
  // };

  // const { x, y } = calculateCoinPosition(percentage);

  return (
    <Container>
      {currentSlide === 0 ? (
        <ProfileCardContainer>
          <ProfileHeader>
            <ProfileInfo>
              <div>
                <h3>허재민</h3>
                <p>LV. F1-I</p>
              </div>
              <p>음성 2센터</p>
              <p>2022080101</p>
            </ProfileInfo>
            <ProfileImageWrapper>
              <ProfileImage src={profile} alt="profile" />
            </ProfileImageWrapper>
          </ProfileHeader>
          <ExperienceSection>
            <h4>총 누적 경험치</h4>
            <ExperienceValue>10,500</ExperienceValue>
            <ProgressBar>
              <Progress />
              <CoinWrapper>
                <CoinIcon src={coinIcon} alt="coin" />
              </CoinWrapper>
              <SpeechBubble src={speechBubble} alt="speech bubble" />
            </ProgressBar>
            <ProgressText>
              <span>잘하고 있어요!</span>
            </ProgressText>
            <p>다음 F1-II 레벨까지 3,000 남음</p>
          </ExperienceSection>
        </ProfileCardContainer>
      ) : (
        <ProfileCardContainer>
          <SecondThirdSlide>
            <Header>
              <Title>
                {currentSlide === 1
                  ? "3,000do를 달성하셨어요!"
                  : "7,500do를 달성하셨어요!"}
              </Title>
              <InfoIconWrapper onClick={handleInfoClick}>
                <InfoIcon src={info} alt="info" />
                {tooltipVisible && (
                  <Tooltip>
                    <img
                      src={currentSlide === 1 ? speechBubble2 : speechBubble3}
                      alt="speech bubble"
                    />
                  </Tooltip>
                )}
              </InfoIconWrapper>
            </Header>
            <ProgressContainer>
              <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                  rotation: 0,
                  strokeLinecap: "round",
                  trailColor: "#E6E6E6",
                  pathColor: "#FC5833",
                })}
              />
              <ProgressTextContainer>
                <SlideText>
                  {currentSlide === 1
                    ? "올해 획득 경험치"
                    : "작년까지 누적 경험치"}
                </SlideText>
                <Percentage>{percentage}%</Percentage>
              </ProgressTextContainer>
              {/* <Coin
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <img src={coinIcon} alt="coin" />
              </Coin> */}
            </ProgressContainer>
          </SecondThirdSlide>
        </ProfileCardContainer>
      )}

      <Carousel>
        {slides.map((_, index) => (
          <Dot
            key={index}
            active={index === currentSlide}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </Carousel>
    </Container>
  );
};

export default ProfileCard;

const Container = styled.div``;

const ProfileCardContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  margin: 16px;
  padding: 28px 24px;
  border-radius: 20px 20px 0 0;
  margin-bottom: 0px;
  padding-bottom: 0px;
  height: 310px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 43px;
`;

const ProfileInfo = styled.div`
  margin-left: 5px;
  h3 {
    ${(props) => props.theme.fonts.bold};
  }
  div {
    margin-bottom: 17px;
    p {
      color: ${(props) => props.theme.colors.black3};
    }
  }

  p {
    font-size: 14px;
    color: ${(props) => props.theme.colors.gray2};
    ${(props) => props.theme.fonts.Nanum};
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 104px;
  margin-right: 7px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ExperienceSection = styled.div`
  text-align: left;

  h4 {
    ${(props) => props.theme.fonts.bold};
    font-size: 14px;
    color: ${(props) => props.theme.colors.black2};
    margin-left: 2px;
  }

  p {
    ${(props) => props.theme.fonts.Nanum};
    font-weight: 300;
    font-size: 14px;
    margin-top: 16px;
    color: ${(props) => props.theme.colors.gray3};
    text-align: right;
  }
`;

const ExperienceValue = styled.div`
  font-size: 32px;
  ${(props) => props.theme.fonts.Nanum};
  font-weight: 800;
  color: ${(props) => props.theme.colors.mainC};
  margin-left: 1px;
`;

const ProgressBar = styled.div`
  background-color: #eaeaea;
  border-radius: 20px;
  height: 14px;
  margin-top: 10px;
  position: relative;
`;

const Progress = styled.div`
  width: 70%;
  background-color: ${(props) => props.theme.colors.mainC};
  height: 100%;
  border-radius: 20px;
`;

const CoinWrapper = styled.div`
  position: absolute;
  top: -10px;
  left: calc(70% - 10px);
  transform: translateX(-50%);
`;

const CoinIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const SpeechBubble = styled.img`
  position: absolute;
  top: -43px;
  left: calc(70% - 13px);
  transform: translateX(-50%);
  width: 100px;
  height: auto;
  z-index: 10;
`;

const ProgressText = styled.div`
  position: absolute;
  top: -43px;
  left: calc(70% - 13px);
  transform: translateX(-50%);
  z-index: 10;
  span {
    background-color: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
    padding: 4px 8px;
    border-radius: 20px;
    font-size: 12px;
    white-space: nowrap;
  }
`;

const SecondThirdSlide = styled.div`
  text-align: center;
`;

const Title = styled.h4`
  ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.black2};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const InfoIconWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  display: inline-block;
`;

const InfoIcon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const Tooltip = styled.div`
  position: absolute;
  top: 20px;
  right: -10px;
  z-index: 10;

  img {
    width: 210px;
    height: auto;
  }
`;

const ProgressContainer = styled.div`
  position: relative;
  width: 210px;
  height: 210px;
  margin: 20px auto;
  text-align: center;
`;

const ProgressTextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SlideText = styled.div`
  ${(props) => props.theme.fonts.bold};
  font-size: 14px;
  color: ${(props) => props.theme.colors.black2};
  width: 210px;
`;

const Percentage = styled.div`
  ${(props) => props.theme.fonts.extraBold};
  font-size: 32px;
  color: ${(props) => props.theme.colors.mainC};
  margin-top: 4px;
`;

// const Coin = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   img {
//     width: 34px;
//     height: 34px;
//   }
// `;

const Carousel = styled.div`
  border-radius: 50px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  margin: 0 16px;
  padding: 20px;
  border-radius: 0 0 20px 20px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  margin: 0 5px;
  background-color: ${(props) =>
    props.active ? props.theme.colors.black2 : props.theme.colors.gray2};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
`;
