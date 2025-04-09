import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSwipeable } from "react-swipeable";
import styled, { keyframes } from "styled-components";
import { Axios } from "../api/Axios";
import { getMemberInfo } from "../api/UserApi";
import coinIcon from "../assets/coin.svg";
import info from "../assets/info.svg";
import profile from "../assets/profile.svg";
import speechBubble2 from "../assets/speechBubble2.svg";
import speechBubble3 from "../assets/speechBubble3.svg";
import useTooltipVisible from "../hooks/useTooltipVisible";

const ProfileCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [tooltipVisible, setTooltipVisible] = useState(false);
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

  const {
    visible: isSecondSlideTooltipVisible,
    setVisible: setSecondSlideTooltipVisible,
    wrapperRef: secondTooltipWrapperRef,
  } = useTooltipVisible();

  const {
    visible: isThirdSlideTooltipVisible,
    setVisible: setThirdSlideTooltipVisible,
    wrapperRef: thirdTooltipWrapperRef,
  } = useTooltipVisible();

  const handleSecondTooltipClick = () => {
    setSecondSlideTooltipVisible((prev) => !prev);
  };

  const handleThirdTooltipClick = () => {
    setThirdSlideTooltipVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await Axios.get("/member/graph1");
        if (response.data.responseType === "SUCCESS") {
          const { exp, percent, nextLevel, expForLevelUp } =
            response.data.success;
          setTotalExp(exp);
          setPercent(percent);
          setNextLevel(nextLevel);
          setRemainingExp(expForLevelUp);
        } else {
          console.error("경험치 조회 오류:", response.data.error.message);
        }
      } catch (error) {
        console.error("경험치 조회 오류:", error.message);
      }
    };

    const fetchGraph2Data = async () => {
      try {
        const response = await Axios.get("/member/graph2");
        if (response.data.responseType === "SUCCESS") {
          const { exp, percent } = response.data.success;
          setThisYearExpTotal(exp);
          setThisYearExpPercent(percent);
        } else {
          console.error(
            "올해 누적 경험치 조회 오류:",
            response.data.error.message
          );
        }
      } catch (error) {
        console.error("올해 누적 경험치 조회 오류:", error.message);
      }
    };

    const fetchGraph3Data = async () => {
      try {
        const response = await Axios.get("/member/graph3");
        if (response.data.responseType === "SUCCESS") {
          const { exp, percent } = response.data.success;
          setLastYearExpTotal(exp);
          setLastYearExpPercent(percent);
        } else {
          console.error(
            "작년 누적 경험치 조회 오류:",
            response.data.error.message
          );
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
            character: response.success.profile || profile,
          });
        } else {
          console.error("멤버 정보 조회 오류:", response.error.message);
        }
      } catch (error) {
        console.error("멤버 정보 조회 오류:", error.message);
      }
    };

    fetchGraphData();
    fetchGraph2Data();
    fetchGraph3Data();
    fetchMemberInfo();
  }, []);

  const isNewEmployee = memberInfo.level === "미평가";
  const isMaxLevel = ["F5", "G8", "B8"].includes(memberInfo.level);

  const displayTotalExp = isNewEmployee ? 0 : totalExp;
  const displayPercent = isMaxLevel ? 100 : isNewEmployee ? 0 : percent;
  const displayRemainingExp = isNewEmployee ? 0 : remainingExp;

  const slides = isNewEmployee ? [0] : isMaxLevel ? [0, 1] : [0, 1, 2];

  const handlers = useSwipeable({
    onSwipedLeft: () => changeSlide("right"),
    onSwipedRight: () => changeSlide("left"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const changeSlide = (direction) => {
    if (direction === "left") {
      setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
    } else if (direction === "right") {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1));
    }
  };

  useEffect(() => {
    let targetPercent = 0;
    if (currentSlide === 1) {
      targetPercent = thisYearExpPercent;
    } else if (!isMaxLevel && currentSlide === 2) {
      targetPercent = lastYearExpPercent;
    }
    if (currentSlide === 1 || (!isMaxLevel && currentSlide === 2)) {
      setAnimatedPercents((prev) => ({ ...prev, [currentSlide]: 0 }));
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        if (current >= targetPercent) {
          clearInterval(interval);
          current = targetPercent;
        }
        setAnimatedPercents((prev) => ({ ...prev, [currentSlide]: current }));
      }, 10);
      return () => clearInterval(interval);
    }
  }, [currentSlide, thisYearExpPercent, lastYearExpPercent, isMaxLevel]);

  // const handleInfoClick = () => {
  //   setTooltipVisible(!tooltipVisible);
  // };

  // useEffect(() => {
  //   setTooltipVisible(false); // 슬라이드 이동 시 툴팁 끄기
  // }, [currentSlide]);

  // 신규 입사자일 경우
  if (isNewEmployee) {
    return (
      <SliderContainer>
        <CardContent>
          <ProfileCardContainer>
            <ProfileHeader>
              <ProfileInfo>
                <div>
                  <h3>{memberInfo.name}</h3>
                  <p>신규입사자</p>
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
              <ExperienceValue>
                {displayTotalExp.toLocaleString()}
              </ExperienceValue>
              <ProgressBar>
                <Progress percent={displayPercent} />
                <CoinWrapper percent={displayPercent}>
                  <CoinIcon src={coinIcon} alt="coin" />
                </CoinWrapper>
              </ProgressBar>
            </ExperienceSection>
          </ProfileCardContainer>
          <Carousel />
        </CardContent>
      </SliderContainer>
    );
  }

  // 신규 입사자가 아닐 경우
  return (
    <SliderContainer {...handlers}>
      <SlidesWrapper currentSlide={currentSlide}>
        <Slide>
          <CardContent>
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
                <ExperienceValue>
                  {displayTotalExp.toLocaleString()}
                </ExperienceValue>
                <ProgressBar>
                  <Progress percent={displayPercent} />
                  <CoinWrapper percent={displayPercent}>
                    <CoinIcon src={coinIcon} alt="coin" />
                  </CoinWrapper>
                </ProgressBar>
                {!isMaxLevel && (
                  <p>
                    다음 {nextLevel}레벨까지{" "}
                    {displayRemainingExp.toLocaleString()} 남음
                  </p>
                )}
              </ExperienceSection>
            </ProfileCardContainer>
            <Carousel>
              {slides.map((_, index) => (
                <Dot
                  key={index}
                  active={index === currentSlide}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </Carousel>
          </CardContent>
        </Slide>

        <Slide>
          <CardContent>
            <ProfileCardContainer>
              <SecondThirdSlide>
                <Header>
                  <Title>
                    {thisYearExpTotal.toLocaleString()}do를 달성하셨어요!
                  </Title>
                  <InfoIconWrapper
                    onClick={handleSecondTooltipClick}
                    ref={secondTooltipWrapperRef}
                  >
                    <InfoIcon src={info} alt="info" />
                    {isSecondSlideTooltipVisible && (
                      <Tooltip>
                        <img src={speechBubble2} />
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
            <Carousel>
              {slides.map((_, index) => (
                <Dot
                  key={index}
                  active={index === currentSlide}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </Carousel>
          </CardContent>
        </Slide>

        {!isMaxLevel && (
          <Slide>
            <CardContent>
              <ProfileCardContainer>
                <SecondThirdSlide>
                  <Header>
                    <Title>
                      {lastYearExpTotal.toLocaleString()}do를 달성하셨어요!
                    </Title>
                    <InfoIconWrapper
                      onClick={handleThirdTooltipClick}
                      ref={thirdTooltipWrapperRef}
                    >
                      <InfoIcon src={info} alt="info" />
                      {isThirdSlideTooltipVisible && (
                        <Tooltip>
                          <img src={speechBubble3} />
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
              <Carousel>
                {slides.map((_, index) => (
                  <Dot
                    key={index}
                    active={index === currentSlide}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </Carousel>
            </CardContent>
          </Slide>
        )}
      </SlidesWrapper>
    </SliderContainer>
  );
};

export default ProfileCard;

const SliderContainer = styled.div`
  overflow: hidden;
  margin-bottom: 35px;
`;

const SlidesWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(-${(props) => props.currentSlide * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
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
  from { opacity: 0; }
  to { opacity: 1; }
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

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    transform: translate(-50%, -50%);
    background: transparent;
    pointer-events: auto;
  }
`;

const InfoIcon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
  z-index: 10;
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
