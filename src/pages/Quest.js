import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Axios } from "../api/Axios";
import infoIcon from "../assets/info.svg";
import expListInfo from "../assets/questInfo.svg";
import arrowIcon from "../assets/dropdown.svg";

import defaultCoin from "../assets/coin.svg";
import goldCoin from "../assets/coin/GoldDo.svg";
import silverCoin from "../assets/coin/SilverDo.svg";
import noCoin from "../assets/coin/noCoin.svg";

import FlippableCard from "../components/FlippableCard";
import FlippableCardWithMonth from "../components/FlippableCardWithMonth";

const getCoinImage = (coin) => {
  if (coin === "MAX") return goldCoin;
  if (coin === "MED") return silverCoin;
  if (coin === null) return noCoin;
  return defaultCoin;
};

const Quest = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTab = searchParams.get("tab") || "default";
  const initialYear =
    searchParams.get("year") || String(new Date().getFullYear());
  const initialMonth =
    Number(searchParams.get("month")) || new Date().getMonth() + 1;

  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [questType, setQuestType] = useState("월");
  const [apiData, setApiData] = useState(null);
  const [monthsData, setMonthsData] = useState(
    Array.from({ length: 12 }, (_, i) => ({ month: i + 1, coin: null }))
  );
  const [weeksData, setWeeksData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [weekInfo, setWeekInfo] = useState([]);
  const [questList, setQuestList] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const cardContainerRef = React.useRef(null);

  useEffect(() => {
    setSearchParams({
      tab: selectedTab,
      year: selectedYear,
      month: selectedMonth,
    });
  }, [selectedTab, selectedYear, selectedMonth, setSearchParams]);

  useEffect(() => {
    const fetchQuestList = async () => {
      try {
        const res = await Axios.get("/member/quest/list");
        if (res.data.responseType === "SUCCESS") {
          const list = res.data.success;
          setQuestList(list);
          const found = list.find(
            (item) => item.questName.toLowerCase() === selectedTab.toLowerCase()
          );
          if (found) {
            setSelectedQuest(found);
          } else if (list.length > 0) {
            setSelectedQuest(list[0]);
            setSelectedTab(list[0].questName);
          }
        } else {
          console.error("QuestList API 에러:", res.data.error?.message);
        }
      } catch (err) {
        console.error("QuestList API 호출 오류:", err);
      }
    };
    fetchQuestList();
  }, [selectedTab]);

  useEffect(() => {
    const fetchWeekInfo = async () => {
      try {
        const res = await Axios.get(`/member/week/info?year=${selectedYear}`);
        if (res.data.responseType === "SUCCESS") {
          setWeekInfo(res.data.success);
        } else {
          console.error("WeekInfo API 에러:", res.data.error?.message);
        }
      } catch (err) {
        console.error("WeekInfo API 호출 오류:", err);
      }
    };

    fetchWeekInfo();
  }, [selectedYear]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleMenuSelect = (item) => {
    setSelectedQuest(item);
    setMenuOpen(false);
    setSelectedTab(item.questName);
  };

  useEffect(() => {
    if (selectedQuest) {
      fetchQuestData(selectedYear, selectedQuest.questName);
    }
  }, [selectedYear, selectedQuest]);

  const fetchQuestData = async (year, questNameParam) => {
    try {
      const res = await Axios.get(
        `/member/quest?year=${year}&questName=${questNameParam}`
      );
      if (res.data.responseType === "SUCCESS") {
        const successObj = res.data.success;
        setApiData(successObj.data);
        setQuestType(successObj.type);
      } else {
        console.error("API 에러:", res.data.error?.message);
        setApiData(null);
      }
    } catch (err) {
      console.error("API 호출 오류:", err);
      setApiData(null);
    }
  };

  useEffect(() => {
    if (!apiData) {
      setMonthsData((prev) => prev.map((m) => ({ ...m, coin: null })));
      setWeeksData([]);
      setActivities([]);
      return;
    }
    if (questType === "월") {
      parseYearData(apiData);
    } else {
      if (weekInfo.length > 0) {
        parseMonthData(apiData, selectedMonth);
      }
    }
  }, [apiData, questType, selectedMonth, weekInfo]);

  const parseYearData = (yearData) => {
    const newMonths = [];
    const newActs = [];
    for (let m = 1; m <= 12; m++) {
      const monthKey = String(m);
      const monthObj = yearData[monthKey];
      if (!monthObj || !monthObj.quests) {
        newMonths.push({ month: m, coin: null });
      } else {
        const firstQuest = monthObj.quests[0];
        newMonths.push({ month: m, coin: firstQuest.coin || null });
        monthObj.quests.forEach((q) => {
          newActs.push({
            month: m,
            week: q.week,
            text: q.questName,
            exp: q.exp,
            coin: q.coin,
          });
        });
      }
    }
    setMonthsData(newMonths);
    setActivities(newActs);
    setWeeksData([]);
  };

  const parseMonthData = (data, currentMonth) => {
    const monthKey = String(currentMonth);
    const monthObj = data[monthKey];
    const quests = monthObj && monthObj.quests ? monthObj.quests : [];

    const weekInfoForMonth = weekInfo.find(
      (info) =>
        info.year === selectedYear && info.month === String(currentMonth)
    );

    let newWeeks = [];
    if (weekInfoForMonth) {
      const availableWeeks = weekInfoForMonth.week.map(Number);
      newWeeks = availableWeeks.map((weekNum) => {
        const questForWeek = quests.find((q) => Number(q.week) === weekNum);
        return {
          week: weekNum,
          coin: questForWeek ? questForWeek.coin : null,
        };
      });
    } else {
      newWeeks = quests.map((q) => ({
        week: Number(q.week),
        coin: q.coin,
      }));
    }

    const newActs = quests.map((q) => ({
      month: currentMonth,
      week: q.week,
      text: q.questName,
      exp: q.exp,
      coin: q.coin,
    }));

    setWeeksData(newWeeks);
    setActivities(newActs);
    setMonthsData([]);
  };

  const handleYearChange = (direction) => {
    const yearNum = Number(selectedYear);
    if (
      direction === 1 &&
      questType === "월" &&
      yearNum >= new Date().getFullYear()
    )
      return;
    const newYear = String(yearNum + direction);
    setSelectedYear(newYear);
  };

  const handleWeekModeMonthChange = (direction) => {
    let newMonth = selectedMonth + direction;
    let newYear = Number(selectedYear);
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    if (newYear > new Date().getFullYear()) return;
    setSelectedYear(String(newYear));
    setSelectedMonth(newMonth);
  };

  useEffect(() => {
    if (cardContainerRef.current && cardContainerRef.current.firstChild) {
      const cardWidth = cardContainerRef.current.firstChild.offsetWidth;
      cardContainerRef.current.scrollTo({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  }, [selectedYear, questType, selectedMonth]);

  return (
    <Container>
      <Header>
        <DropDownButton onClick={toggleMenu}>
          <DropDownText>
            {selectedQuest ? selectedQuest.description : "퀘스트"}
          </DropDownText>
          <ArrowImg src={arrowIcon} alt="화살표" isOpen={menuOpen} />
        </DropDownButton>
        {menuOpen && (
          <DropDownList>
            {questList
              .filter(
                (item) =>
                  item.description !==
                  (selectedQuest && selectedQuest.description)
              )
              .map((item) => (
                <DropDownItem
                  key={item.questName}
                  onClick={() => handleMenuSelect(item)}
                >
                  {item.description}
                </DropDownItem>
              ))}
          </DropDownList>
        )}
      </Header>

      <SubContainer>
        {questType === "월" ? (
          <Selector>
            <Arrow onClick={() => handleYearChange(-1)}>&lt;</Arrow>
            <Year>{selectedYear}년</Year>
            <Arrow
              onClick={() => handleYearChange(1)}
              disabled={Number(selectedYear) >= new Date().getFullYear()}
            >
              &gt;
            </Arrow>
            <InfoIconWrapper>
              <InfoIcon
                src={infoIcon}
                alt="정보"
                onClick={() => setInfoOpen((prev) => !prev)}
              />
              {infoOpen && <InfoImage src={expListInfo} alt="정보 설명" />}
            </InfoIconWrapper>
          </Selector>
        ) : (
          <Selector>
            <Arrow onClick={() => handleWeekModeMonthChange(-1)}>&lt;</Arrow>
            <Year>
              {selectedYear}년 {selectedMonth}월
            </Year>
            <Arrow onClick={() => handleWeekModeMonthChange(1)}>&gt;</Arrow>
            <InfoIconWrapper>
              <InfoIcon
                src={infoIcon}
                alt="정보"
                onClick={() => setInfoOpen((prev) => !prev)}
              />
              {infoOpen && <InfoImage src={expListInfo} alt="정보 설명" />}
            </InfoIconWrapper>
          </Selector>
        )}

        <CardContainer ref={cardContainerRef}>
          {questType === "월" ? (
            <FlippableCard monthsData={monthsData} />
          ) : (
            <FlippableCardWithMonth weeksData={weeksData} />
          )}
        </CardContainer>

        <BottomContainer>
          <ActivityList>
            {activities.map((item, idx) => (
              <ActivityItem key={idx}>
                <CoinIcon src={getCoinImage(item.coin)} alt="coin" />
                <div>
                  <ActivityTitle>
                    {questType === "월"
                      ? `${item.month}월 ${item.text}`
                      : `${item.week}주 ${item.text}`}
                  </ActivityTitle>
                  <ActivityDo>{item.exp}do 획득</ActivityDo>
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

const DropDownButton = styled.div`
  flex: 1;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropDownText = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
`;

const ArrowImg = styled.img`
  position: absolute;
  right: 20px;
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropDownList = styled.ul`
  position: absolute;
  top: 58px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.colors.gray};
  z-index: 999;
  width: 100%;
`;

const DropDownItem = styled.li`
  ${(props) => props.theme.fonts.medium};
  font-size: 18px;
  text-align: center;
  padding: 20px;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 1px solid #e6e7e8;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray};
  }
`;

const SubContainer = styled.div`
  flex: 1;
`;

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
  cursor: pointer;

  &:disabled {
    color: #ccc;
    cursor: default;
  }
`;

const Year = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  margin: 0 30px;
  color: ${(props) => props.theme.colors.black2};
`;

const InfoIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  position: absolute;
  right: 40px;
  width: 20px;
  height: 20px;

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
  cursor: pointer;
  width: 20px;
  height: 20px;
  z-index: 10;
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
  align-items: center;
  justify-content: center;
`;

const BottomContainer = styled.div`
  margin-top: 31px;
  padding: 0 28px;
  border-radius: 10px;
  max-height: 420px;
  overflow-y: auto;
  padding-bottom: 50px;
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
