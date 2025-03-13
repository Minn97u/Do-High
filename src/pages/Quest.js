import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import silverCoin from "../assets/coin/SilverDo.svg";
import infoIcon from "../assets/info.svg";
import expListInfo from "../assets/questInfo.svg";
import FlippableCard from "../components/FlippableCard";

const monthlyActivities = [
  { month: 1, text: "생산성 증진", doPoint: 100 },
  { month: 2, text: "생산성 증진", doPoint: 40 },
  { month: 3, text: "생산성 증진", doPoint: 40 },
  { month: 3, text: "생산성 증진", doPoint: 40 },
  { month: 3, text: "생산성 증진", doPoint: 40 },
  { month: 3, text: "생산성 증진", doPoint: 40 },
];

const Quest = () => {
  const cardContainerRef = useRef(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2025년");

  const dummyQuest = {
    year: "2025년",
    title: "2025 직무 퀘스트",
    description: "2025년 직무 퀘스트 전체 요약",
    coin: "med",
    status: "Med 달성",
    exp: 2200,
  };

  const handleYearChange = () => {
    setSelectedYear((prev) => (prev === "2025년" ? "2024년" : "2025년"));
  };

  useEffect(() => {
    if (cardContainerRef.current && cardContainerRef.current.firstChild) {
      const cardWidth = cardContainerRef.current.firstChild.offsetWidth;
      cardContainerRef.current.scrollTo({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  }, [selectedYear]);

  return (
    <Container>
      <Header>
        <Title>퀘스트</Title>
      </Header>

      <SubContainer>
        <Selector>
          <Arrow onClick={handleYearChange}>{"<"}</Arrow>
          <Year>{selectedYear}</Year>
          <Arrow onClick={handleYearChange}>{">"}</Arrow>
          <InfoIconWrapper>
            <InfoIcon
              src={infoIcon}
              alt="정보"
              onClick={() => setInfoOpen((prev) => !prev)}
            />
            {infoOpen && <InfoImage src={expListInfo} alt="정보 설명" />}
          </InfoIconWrapper>
        </Selector>

        <CardContainer ref={cardContainerRef}>
          <CardWrapper>
            <FlippableCard quest={dummyQuest} />
          </CardWrapper>
        </CardContainer>

        <BottomContainer>
          <ActivityList>
            {monthlyActivities.map((item) => (
              <ActivityItem key={item.month}>
                <CoinIcon src={silverCoin} alt="coin" />
                <div>
                  <ActivityTitle>
                    {item.month}월 {item.text}
                  </ActivityTitle>
                  <ActivityDo>{item.doPoint}do 획득</ActivityDo>
                </div>
              </ActivityItem>
            ))}
          </ActivityList>
        </BottomContainer>
      </SubContainer>
    </Container>
  );
};

export default Quest;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  background-color: ${(props) => props.theme.colors.gray};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  position: relative;
  border-bottom: 1px solid #e6e7e8;
`;

const Title = styled.h1`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  text-align: center;
  flex: 1;
`;

const SubContainer = styled.div``;

const Selector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 38px;
  margin-bottom: 22px;
  position: relative;
`;

const Arrow = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: ${(props) => props.theme.colors.gray3};
`;

const Year = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  margin: 0 30px;
  color: ${(props) => props.theme.colors.black2};
  position: relative;
`;

const InfoIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  position: absolute;
  right: 40px;
`;

const InfoIcon = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const InfoImage = styled.img`
  position: absolute;
  top: 25px;
  right: -24px;
  width: 250px;
  z-index: 100;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  gap: 10px;
  padding: 0 40px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardWrapper = styled.div`
  flex-shrink: 0;
  width: 310px;
  scroll-snap-align: center;
`;

const BottomContainer = styled.div`
  margin-top: 31px;
  padding: 0 28px;
  border-radius: 10px;
  max-height: 420px;
  overflow-y: auto;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 16px 0;
`;

const CoinIcon = styled.img`
  width: 68px;
  height: 68px;
  margin-right: 31px;
`;

const ActivityTitle = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  margin-bottom: 4px;
`;

const ActivityDo = styled.div`
  ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.gray3};
`;
