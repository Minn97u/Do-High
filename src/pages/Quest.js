import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import backBtn from "../assets/backBtn.svg";
import { useNavigate } from "react-router-dom";
import FlippableCard from "../components/FlippableCard";
import FlippableCardWithMonth from "../components/FlippableCardWithMonth";

const Quest = () => {
  const navigate = useNavigate();
  const cardContainerRef = useRef(null);
  const monthContainerRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState("직무 퀘스트");
  const [selectedYear, setSelectedYear] = useState("2025년");
  const [selectedMonth, setSelectedMonth] = useState(1);

  const questData = {
    "직무 퀘스트": {
      "2024년": {
        id: 1,
        status: "Max 달성",
        title: "2024년 월특근",
        description: "음성 1센터 1",
        maxPoints: "연 최대 1,000 do 획득 가능",
        earnedPoints: "총 누적 800 do 획득",
      },
      "2025년": {
        id: 2,
        status: "Med 달성",
        title: "2025년 월특근",
        description: "음성 1센터 2",
        maxPoints: "연 최대 1,200 do 획득 가능",
        earnedPoints: "총 누적 900 do 획득",
      },
      "2026년": {
        id: 3,
        status: "Max 달성",
        title: "2026년 월특근",
        description: "음성 1센터 3",
        maxPoints: "연 최대 1,500 do 획득 가능",
        earnedPoints: "총 누적 1,200 do 획득",
      },
    },
    "리더 퀘스트": {
      "2024년": {
        id: 4,
        status: "Med 달성",
        title: "2024년 리더 프로젝트",
        description: "음성 1센터 리더",
        maxPoints: "연 최대 800 do 획득 가능",
        earnedPoints: "총 누적 500 do 획득",
      },
      "2025년": {
        id: 5,
        status: "Max 달성",
        title: "2025년 리더 프로젝트",
        description: "음성 2센터 리더",
        maxPoints: "연 최대 1,000 do 획득 가능",
        earnedPoints: "총 누적 900 do 획득",
      },
      "2026년": {
        id: 6,
        status: "Max 달성",
        title: "2026년 리더 프로젝트",
        description: "음성 3센터 리더",
        maxPoints: "연 최대 1,200 do 획득 가능",
        earnedPoints: "총 누적 1,000 do 획득",
      },
    },
  };

  const years = Object.keys(questData[selectedTab]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    const years = Object.keys(questData[tab]);
    setSelectedYear(years[0]);
    setSelectedMonth(1); // 월 초기화
  };

  const handleYearChange = (direction) => {
    const years = Object.keys(questData[selectedTab]);
    const currentIndex = years.indexOf(selectedYear);
    const newIndex = (currentIndex + direction + years.length) % years.length;
    setSelectedYear(years[newIndex]);

    if (cardContainerRef.current) {
      const cardWidth = cardContainerRef.current.firstChild.offsetWidth;
      cardContainerRef.current.scrollTo({
        left: cardWidth * newIndex,
        behavior: "smooth",
      });
    }
  };

  const handleMonthChange = (direction) => {
    const newMonth = ((selectedMonth + direction + 12 - 1) % 12) + 1; // 월 범위: 1 ~ 12
    setSelectedMonth(newMonth);

    if (monthContainerRef.current) {
      const monthWidth = monthContainerRef.current.firstChild.offsetWidth;
      monthContainerRef.current.scrollTo({
        left: monthWidth * (newMonth - 1),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const index = years.indexOf(selectedYear);
    if (cardContainerRef.current) {
      const cardWidth = cardContainerRef.current.firstChild.offsetWidth;
      cardContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  }, [selectedYear, selectedTab, years]);

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/")}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>퀘스트</Title>
      </Header>

      <TabBar>
        {Object.keys(questData).map((tab) => (
          <Tab
            key={tab}
            selected={selectedTab === tab}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabBar>

      <Selector>
        <Arrow onClick={() => handleYearChange(-1)}>{"<"}</Arrow>
        <Year>{selectedYear}</Year>
        <Arrow onClick={() => handleYearChange(1)}>{">"}</Arrow>
      </Selector>

      <CardContainer ref={cardContainerRef}>
        {Object.entries(questData[selectedTab]).map(([year, quest]) => (
          <CardWrapper key={quest.id}>
            <FlippableCard quest={quest} />
          </CardWrapper>
        ))}
      </CardContainer>

      <CriteriaContainer>
        Max 기준: 4회 이상, 월 100 do 획득
        <br />
        Med 기준: 2회 이상, 월 50 do 획득
      </CriteriaContainer>

      <Selector>
        <Arrow onClick={() => handleMonthChange(-1)}>{"<"}</Arrow>
        <Year>{selectedMonth}월</Year>
        <Arrow onClick={() => handleMonthChange(1)}>{">"}</Arrow>
      </Selector>

      <CardContainer ref={monthContainerRef}>
        {Array.from({ length: 12 }, (_, index) => (
          <CardWrapper key={index}>
            <FlippableCardWithMonth
              quest={{
                ...questData[selectedTab][selectedYear],
                title: `${index + 1}월 작업`,
              }}
            />
          </CardWrapper>
        ))}
      </CardContainer>

      <CriteriaContainer>
        Max 기준: 업무프로세스 개선 리드자, 월 67 do 획득
        <br />
        Med 기준: 업무프로세스 개선 참여자, 월 33 do 획득
      </CriteriaContainer>
    </Container>
  );
};

export default Quest;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.gray};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  left: 20px;
`;

const Title = styled.h1`
  text-align: center;
  flex: 1;
  font-size: 18px;
`;

const TabBar = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #e6e7e8;
`;

const Tab = styled.button`
  ${(props) => props.theme.fonts.semiBold};
  width: 50%;
  border: none;
  background: none;
  font-size: 16px;
  padding: 10px 0;
  color: ${(props) =>
    props.selected ? props.theme.colors.black3 : props.theme.colors.gray2};
  border-bottom: ${(props) => (props.selected ? "3px solid  #FC5833" : "none")};
`;

const Selector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 36px;
  margin-bottom: 18px;
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

const CriteriaContainer = styled.div`
  ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.gray2};
  padding: 0 44px;
`;
