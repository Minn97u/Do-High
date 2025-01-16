import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getRecentExp } from "../api/ExpApi";
import { getMemberInfo } from "../api/UserApi";
import coinIcon from "../assets/coin/GoldDo.svg";
import silverCoinIcon from "../assets/coin/SilverDo.svg";
import bronzeCoinIcon from "../assets//coin/BronzeDo.svg";
import backBtn from "../assets/mainArrow.svg";

const coinMap = {
  S: require("../assets/coin/S.svg").default,
  A: require("../assets/coin/A.svg").default,
  B: require("../assets/coin/B.svg").default,
  C: require("../assets/coin/C.svg").default,
  D: require("../assets/coin/D.svg").default,
  BronzeDo: require("../assets/coin/BronzeDo.svg").default,
  GoldDo: require("../assets/coin/GoldDo.svg").default,
  SilverDo: require("../assets/coin/SilverDo.svg").default,
};

const ExperienceSection = () => {
  const navigate = useNavigate();
  const [recentExp, setRecentExp] = useState(null);
  const [memberName, setMemberName] = useState("");

  const quests = [
    { title: "8월 직무 퀘스트", subtitle: "생산성 증진", coinType: "gold" },
    { title: "32주 리더 퀘스트", subtitle: "월특근", coinType: "silver" },
    { title: "32주 리더 퀘스트", subtitle: "업무 효율", coinType: "bronze" },
  ];

  useEffect(() => {
    const fetchRecentExp = async () => {
      try {
        const data = await getRecentExp();
        if (data.responseType === "SUCCESS") {
          setRecentExp(data.success);
        } else {
          console.error("최근 경험치 데이터 로드 실패:", data.error.message);
        }
      } catch (error) {
        console.error("API 호출 오류:", error.message);
      }
    };

    const fetchMemberInfo = async () => {
      try {
        const data = await getMemberInfo();
        if (data.responseType === "SUCCESS") {
          setMemberName(data.success.name);
        } else {
          console.error("멤버 정보 로드 실패:", data.error.message);
        }
      } catch (error) {
        console.error("API 호출 오류:", error.message);
      }
    };

    fetchRecentExp();
    fetchMemberInfo();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR").replace(/\./g, ".");
  };

  const handleExpClick = () => {
    navigate("/exp");
  };

  const handleQuestClick = () => {
    navigate("/quest");
  };

  return (
    <ExperienceSectionContainer>
      <SectionHeader onClick={handleExpClick}>
        <SectionTitle>최근에 {memberName}님이 받은 do예요!</SectionTitle>
        <ArrowIcon src={backBtn} alt="More" onClick={handleExpClick} />
      </SectionHeader>
      {recentExp && (
        <RecentDoCard onClick={handleExpClick}>
          <CardContent>
            <CardDate>{formatDate(recentExp.date)}</CardDate>
            <CardTitle>{recentExp.content}</CardTitle>
          </CardContent>
          <CardValue>
            <CoinIcon
              src={coinMap[recentExp.coin] || coinMap["BronzeDo"]}
              alt={`${recentExp.coin} Coin`}
            />
            {recentExp.exp.toLocaleString()}
          </CardValue>
        </RecentDoCard>
      )}
      <SectionHeader onClick={handleQuestClick}>
        <SectionTitle>{memberName}님이 수행한 퀘스트예요!</SectionTitle>
        <ArrowIcon src={backBtn} alt="More" onClick={handleQuestClick} />
      </SectionHeader>
      <QuestList>
        {quests.map((quest, index) => (
          <QuestCard key={index}>
            <QuestTitle>{quest.title}</QuestTitle>
            <DottedLine />
            <QuestIcon
              src={
                quest.coinType === "gold"
                  ? coinIcon
                  : quest.coinType === "silver"
                  ? silverCoinIcon
                  : bronzeCoinIcon
              }
              alt={`${quest.coinType} Coin`}
            />
            <QuestSubtitle
              color={
                quest.coinType === "gold"
                  ? "#FBB62C"
                  : quest.coinType === "silver"
                  ? "#BBC5CE"
                  : "#BD8B51"
              }
            >
              {quest.subtitle}
            </QuestSubtitle>
          </QuestCard>
        ))}
      </QuestList>
    </ExperienceSectionContainer>
  );
};

export default ExperienceSection;

const ExperienceSectionContainer = styled.div`
  padding: 16px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 13px;
`;

const SectionTitle = styled.h4`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  color: ${(props) => props.theme.colors.black2};
  margin-left: 6px;
`;

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const RecentDoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 23px 28px;
  border-radius: 18px;
  background-color: ${(props) => props.theme.colors.white};
  margin-bottom: 35px;
`;

const CardContent = styled.div``;

const CardDate = styled.div`
  ${(props) => props.theme.fonts.regular};
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray2};
`;

const CardTitle = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  color: ${(props) => props.theme.colors.black2};
`;

const CardValue = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  color: ${(props) => props.theme.colors.black2};
  display: flex;
  align-items: center;
`;

const CoinIcon = styled.img`
  width: 26px;
  height: 26px;
  margin-right: 5px;
`;

const QuestList = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const QuestCard = styled.div`
  flex: 0 0 145px;
  width: 145px;
  padding: 20px 14px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.white};
  text-align: center;
`;

const QuestTitle = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.black2};
`;

const DottedLine = styled.div`
  border-top: 1px dashed ${(props) => props.theme.colors.gray2};
  opacity: 0.5;
  margin-bottom: 13px;
`;

const QuestIcon = styled.img`
  width: 58px;
  height: 58px;
  margin-bottom: 8px;
`;

const QuestSubtitle = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  color: ${(props) => props.color};
`;
