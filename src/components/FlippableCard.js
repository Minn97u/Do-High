import React from "react";
import styled from "styled-components";
import goldCoin from "../assets/coin/GoldDo.svg";
import silverCoin from "../assets/coin/SilverDo.svg";
import bronzeCoin from "../assets/coin/noCoin.svg";

function getCoinIcon(coin) {
  if (coin === "MAX") return goldCoin;
  if (coin === "MED") return silverCoin;
  return bronzeCoin;
}

const FlippableCard = ({
  monthsData = [],
  selectedYear,
  currentYear,
  selectedMonth,
}) => {
  return (
    <CardWrapper>
      <Card>
        <MonthGrid>
          {monthsData.map(({ month, coin }) => (
            <Month key={month}>
              <MonthText
                isFuture={selectedYear === currentYear && month > selectedMonth}
              >
                {month}월
              </MonthText>
              <Icon2 src={getCoinIcon(coin)} alt="coin" />
            </Month>
          ))}
        </MonthGrid>
        <TotalEarned>
          {monthsData.filter((m) => m.coin !== null).length} / 12월
        </TotalEarned>
      </Card>
    </CardWrapper>
  );
};

export default FlippableCard;

const CardWrapper = styled.div`
  width: 310px;
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 310px;
  height: 210px;
  background: white;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  padding: 20px;
  padding-bottom: 12px;
`;

const Month = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MonthText = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
  color: ${({ isFuture, theme }) =>
    isFuture ? theme.colors.gray2 : theme.colors.black};
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
  color: white;
  background-color: ${(props) => props.theme.colors.mainC};
  border-radius: 0 0 18px 18px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;
