import React from "react";
import styled from "styled-components";
import defaultCoin from "../assets/coin.svg";
import goldCoin from "../assets/coin/GoldDo.svg";
import silverCoin from "../assets/coin/SilverDo.svg";
import NoCoin from "../assets/coin/noCoin.svg";

function getCoinIcon(coin) {
  if (coin === "MAX") return goldCoin;
  if (coin === "MED") return silverCoin;
  if (coin === null) return NoCoin;
  return defaultCoin;
}

const FlippableCardWithMonth = ({ weeksData = [] }) => {
  const achievedCount = weeksData.filter((w) => w.coin).length;
  const totalWeeks = weeksData.length;

  return (
    <CardWrapper>
      <Card>
        <WeekGrid>
          {weeksData.map((item, i) => (
            <Week key={i} achieved={!!item.coin}>
              <WeekText>{item.week}주</WeekText>
              <Icon2
                src={getCoinIcon(item.coin)}
                alt="coin"
                achieved={!!item.coin}
              />
            </Week>
          ))}
        </WeekGrid>
        <TotalEarned>
          {achievedCount} / {totalWeeks}주
        </TotalEarned>
      </Card>
    </CardWrapper>
  );
};

export default FlippableCardWithMonth;

const CardWrapper = styled.div`
  width: 310px;
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-align: center;
`;

const Card = styled.div`
  width: 310px;
  height: 210px;
  background: white;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
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
`;

const TotalEarned = styled.div`
  font-size: 14px;
  padding: 4px 0;
  text-align: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainC};
  border-radius: 0 0 18px 18px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;
