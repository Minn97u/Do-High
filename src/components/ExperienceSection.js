import React from "react";
import styled from "styled-components";
import coinIcon from "../assets/coin.svg";
import silverCoinIcon from "../assets/silverCoin.svg";
import bronzeCoinIcon from "../assets/bronzeCoin.svg";
import backBtn from "../assets/mainArrow.svg";

const ExperienceSection = () => {
  const quests = [
    { title: "8월 직무 퀘스트", subtitle: "생산성 증진", coinType: "gold" },
    { title: "32주 리더 퀘스트", subtitle: "월특근", coinType: "silver" },
    { title: "32주 리더 퀘스트", subtitle: "업무 효율", coinType: "bronze" },
  ];

  return (
    <ExperienceSectionContainer>
      <SectionHeader>
        <SectionTitle>최근에 재민님이 받은 do예요!</SectionTitle>
        <ArrowIcon src={backBtn} alt="More" />
      </SectionHeader>
      <RecentDoCard>
        <CardContent>
          <CardDate>24.01.02</CardDate>
          <CardTitle>인사평가 C등급</CardTitle>
        </CardContent>
        <CardValue>
          <CoinIcon src={coinIcon} alt="Coin" />
          1,500
        </CardValue>
      </RecentDoCard>
      <SectionHeader>
        <SectionTitle>재민님이 수행한 퀘스트예요!</SectionTitle>
        <ArrowIcon src={backBtn} alt="More" />
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
