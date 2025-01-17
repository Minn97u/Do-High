import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import profile from "../assets/profile.svg";
import coinIcon from "../assets/coin.svg";
import speechBubble from "../assets/speechBubble.svg";
import speechBubble2 from "../assets/speechBubble2.svg";
import speechBubble3 from "../assets/speechBubble3.svg";
import info from "../assets/info.svg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getExpStatus, getThisYearExp, getLastYearExp } from "../api/ExpApi";
import { getMemberInfo } from "../api/UserApi";
import { useSwipeable } from "react-swipeable";

const ProfileCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [totalExp, setTotalExp] = useState(0);
  const [remainingExp, setRemainingExp] = useState(0);
  const [nextLevel, setNextLevel] = useState("");
  const [percent, setPercent] = useState(0);
  const [thisYearExpPercent, setThisYearExpPercent] = useState(0);
  const [thisYearExpTotal, setThisYearExpTotal] = useState(0);
  const [lastYearExpPercent, setLastYearExpPercent] = useState(0);
  const [lastYearExpTotal, setLastYearExpTotal] = useState(0);
  const [animatedPercents, setAnimatedPercents] = useState({
    1: 0,
    2: 0,
  });
  const [memberInfo, setMemberInfo] = useState({
    name: "",
    level: "",
    team: "",
    identificationNumber: "",
    character: profile,
  });

  const slides = [0, 1, 2];

  useEffect(() => {
    const fetchExpStatus = async () => {
      try {
        const response = await getExpStatus();
        if (response.responseType === "SUCCESS") {
          setTotalExp(response.success.totalExp);
          setRemainingExp(response.success.remainingExp);
          setNextLevel(response.success.nextLevel);
          setPercent(response.success.percent);
        } else {
          console.error("경험치 현황 조회 오류:", response.error.message);
        }
      } catch (error) {
        console.error("경험치 현황 조회 오류:", error.message);
      }
    };

    const fetchThisYearExp = async () => {
      try {
        const response = await getThisYearExp();
        if (response.responseType === "SUCCESS") {
          setThisYearExpPercent(response.success.percent);
          setThisYearExpTotal(response.success.totalExp);
        } else {
          console.error("올해 누적 경험치 조회 오류:", response.error.message);
        }
      } catch (error) {
        console.error("올해 누적 경험치 조회 오류:", error.message);
      }
    };

    const fetchLastYearExp = async () => {
      try {
        const response = await getLastYearExp();
        if (response.responseType === "SUCCESS") {
          setLastYearExpPercent(response.success.percent);
          setLastYearExpTotal(response.success.totalExp);
        } else {
          console.error("작년 누적 경험치 조회 오류:", response.error.message);
        }
      } catch (error) {
        console.error("작년 누적 경험치 조회 오류:", error.message);
      }
    };

    const fetchMemberInfo = async () => {
      try {
        const response = await getMemberInfo();
        if (response.responseType === "SUCCESS") {
          setMemberInfo({
            name: response.success.name,
            level: response.success.level,
            team: response.success.team,
            identificationNumber: response.success.identificationNumber,
            character: response.success.character || profile,
          });
        } else {
          console.error("멤버 정보 조회 오류:", response.error.message);
        }
      } catch (error) {
        console.error("멤버 정보 조회 오류:", error.message);
      }
    };

    fetchExpStatus();
    fetchThisYearExp();
    fetchLastYearExp();
    fetchMemberInfo();
  }, []);

  useEffect(() => {
    const targetPercent =
      currentSlide === 1 ? thisYearExpPercent : lastYearExpPercent;

    if (currentSlide === 1 || currentSlide === 2) {
      setAnimatedPercents((prev) => ({
        ...prev,
        [currentSlide]: 0,
      }));

      let current = 0;

      const interval = setInterval(() => {
        current += 1;
        if (current >= targetPercent) {
          clearInterval(interval);
          current = targetPercent;
        }
        setAnimatedPercents((prev) => ({
          ...prev,
          [currentSlide]: current,
        }));
      }, 10);

      return () => clearInterval(interval);
    }
  }, [currentSlide, thisYearExpPercent, lastYearExpPercent]);

  // const handleDotClick = (index) => {
  //   setCurrentSlide(index);
  // };

  const handleInfoClick = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const changeSlide = (direction) => {
    if (direction === "left") {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    } else if (direction === "right") {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => changeSlide("right"),
    onSwipedRight: () => changeSlide("left"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Container currentSlide={currentSlide} {...handlers}>
      {currentSlide === 0 && (
        <ProfileCardContainer>
          <ProfileHeader>
            <ProfileInfo>
              <div>
                <h3>{memberInfo.name}</h3>
                <p>LV. {memberInfo.level}</p>
              </div>
              <p>{memberInfo.team}</p>
              <p>{memberInfo.identificationNumber}</p>
            </ProfileInfo>
            <ProfileImageWrapper>
              <ProfileImage src={memberInfo.character} alt="profile" />
            </ProfileImageWrapper>
          </ProfileHeader>
          <ExperienceSection>
            <h4>총 누적 경험치</h4>
            <ExperienceValue>{totalExp.toLocaleString()}</ExperienceValue>
            <ProgressBar>
              <Progress percent={percent} />
              <CoinWrapper percent={percent}>
                <CoinIcon src={coinIcon} alt="coin" />
              </CoinWrapper>
              {percent >= 55 && percent <= 90 && (
                <SpeechBubble
                  percent={percent}
                  src={speechBubble}
                  alt="speech bubble"
                />
              )}
            </ProgressBar>
            <p>
              다음 {nextLevel}레벨까지 {remainingExp.toLocaleString()} 남음
            </p>
          </ExperienceSection>
        </ProfileCardContainer>
      )}
      {currentSlide === 1 && (
        <ProfileCardContainer>
          <SecondThirdSlide>
            <Header>
              <Title>
                {thisYearExpTotal.toLocaleString()}do를 달성하셨어요!
              </Title>
              <InfoIconWrapper onClick={handleInfoClick}>
                <InfoIcon src={info} alt="info" />
                {tooltipVisible && (
                  <Tooltip>
                    <img src={speechBubble2} alt="speech bubble" />
                  </Tooltip>
                )}
              </InfoIconWrapper>
            </Header>
            <ProgressContainer>
              <CircularProgressbar
                value={animatedPercents[1]}
                styles={buildStyles({
                  rotation: 0,
                  strokeLinecap: "round",
                  trailColor: "#E6E6E6",
                  pathColor: "#FC5833",
                })}
              />
              <ProgressTextContainer>
                <SlideText>올해 획득 경험치</SlideText>
                <Percentage>{thisYearExpPercent}%</Percentage>
              </ProgressTextContainer>
            </ProgressContainer>
          </SecondThirdSlide>
        </ProfileCardContainer>
      )}
      {currentSlide === 2 && (
        <ProfileCardContainer>
          <SecondThirdSlide>
            <Header>
              <Title>
                {lastYearExpTotal.toLocaleString()}do를 달성하셨어요!
              </Title>
              <InfoIconWrapper onClick={handleInfoClick}>
                <InfoIcon src={info} alt="info" />
                {tooltipVisible && (
                  <Tooltip>
                    <img src={speechBubble3} alt="speech bubble" />
                  </Tooltip>
                )}
              </InfoIconWrapper>
            </Header>
            <ProgressContainer>
              <CircularProgressbar
                value={animatedPercents[2]}
                styles={buildStyles({
                  rotation: 0,
                  strokeLinecap: "round",
                  trailColor: "#E6E6E6",
                  pathColor: "#FC5833",
                })}
              />
              <ProgressTextContainer>
                <SlideText>작년 누적 경험치</SlideText>
                <Percentage>{lastYearExpPercent}%</Percentage>
              </ProgressTextContainer>
            </ProgressContainer>
          </SecondThirdSlide>
        </ProfileCardContainer>
      )}

      <Carousel>
        {slides.map((_, index) => (
          <Dot
            key={index}
            active={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </Carousel>
    </Container>
  );
};

export default ProfileCard;

const Container = styled.div`
  margin-bottom: 35px;
`;

const ProfileCardContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  margin: 16px;
  padding: 28px 24px;
  border-radius: 20px 20px 0 0;
  margin-bottom: 0px;
  /* padding-bottom: 0px; */
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
    text-decoration: none;
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
  width: ${(props) => props.percent}%;
  background-color: ${(props) => props.theme.colors.mainC};
  height: 100%;
  border-radius: 20px;
  transition: width 0.3s ease;
`;

const CoinWrapper = styled.div`
  position: absolute;
  top: -10px;
  left: ${({ percent }) => (percent < 8 ? 8 : percent)}%;
  transform: translateX(-98%);
  transition: left 0.3s ease;
`;

const CoinIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SpeechBubble = styled.img`
  position: absolute;
  top: -43px;
  left: ${(props) => props.percent}%;
  transform: translateX(-67%);
  width: 100px;
  height: auto;
  z-index: 10;
  animation: ${fadeIn} 1.1s ease-in-out;
  opacity: 1;
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
