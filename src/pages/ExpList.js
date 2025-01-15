import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backBtn from "../assets/backBtn.svg";
import dropdownArrow from "../assets/dropdown.svg";
import coinIcon from "../assets/coin.svg";
import infoIcon from "../assets/info.svg";
import expListInfo from "../assets/expListInfo.svg";

const ExpList = () => {
  const navigate = useNavigate();
  const [sortOpen, setSortOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [sortOption, setSortOption] = useState("최신순");
  const [selectedTab, setSelectedTab] = useState("전체");

  const expData = {
    전체: [
      {
        id: 1,
        date: "2025.01.02",
        type: "인사평가",
        grade: "C등급",
        points: 1500,
      },
      {
        id: 2,
        date: "2025.01.02",
        type: "직무 퀘스트",
        grade: "생산성 증진",
        points: 80,
      },
      {
        id: 3,
        date: "2025.01.02",
        type: "리더 퀘스트",
        grade: "월특근",
        points: 40,
      },
    ],
    인사평가: [
      {
        id: 1,
        date: "2025.01.02",
        type: "인사평가",
        grade: "C등급",
        points: 1500,
      },
    ],
    "직무 퀘스트": [
      {
        id: 2,
        date: "2025.01.02",
        type: "직무 퀘스트",
        grade: "생산성 증진",
        points: 80,
      },
    ],
    "리더 퀘스트": [
      {
        id: 3,
        date: "2025.01.02",
        type: "리더 퀘스트",
        grade: "월특근",
        points: 40,
      },
    ],
    "전사 프로젝트": [
      {
        id: 4,
        date: "2025.01.02",
        type: "전사 프로젝트",
        grade: "A등급",
        points: 2000,
      },
    ],
  };

  const handleSortClick = () => {
    setSortOpen((prev) => !prev);
  };

  const handleSortSelect = (option) => {
    setSortOption(option);
    setSortOpen(false);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/")}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>경험치 내역</Title>
      </Header>

      <TabBar>
        {[
          "전체",
          "인사평가",
          "직무 퀘스트",
          "리더 퀘스트",
          "전사 프로젝트",
        ].map((tab) => (
          <Tab
            key={tab}
            selected={selectedTab === tab}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabBar>
      {selectedTab === "인사평가" && (
        <Description>
          <div>
            <p>
              <span>S등급 6,500</span> <span>A등급 4,500 </span>
              <span>B등급 3,000</span>
            </p>
            <p>
              <span>C등급 1,500</span> <span>D등급 0</span>
            </p>
          </div>
        </Description>
      )}

      <SortBar>
        {selectedTab !== "인사평가" && selectedTab !== "전사 프로젝트" && (
          <InfoIconWrapper>
            <InfoIcon
              src={infoIcon}
              alt="정보"
              onClick={() => setInfoOpen(!infoOpen)}
            />
            {infoOpen && <InfoImage src={expListInfo} alt="정보 설명" />}
          </InfoIconWrapper>
        )}
        <SortButton onClick={handleSortClick}>
          <SortText>{sortOption}</SortText>
          <SortIcon src={dropdownArrow} alt="정렬" />
        </SortButton>
        {sortOpen && (
          <DropDownMenu>
            <DropDownItem onClick={() => handleSortSelect("최신순")}>
              최신순
            </DropDownItem>
            <DropDownItem onClick={() => handleSortSelect("오래된순")}>
              오래된순
            </DropDownItem>
          </DropDownMenu>
        )}
      </SortBar>

      <ListContainer>
        {expData[selectedTab].map((item) => (
          <ListItem key={item.id}>
            <ItemLeft>
              <ItemIcon src={coinIcon} alt="코인 아이콘" />
              <ItemInfo>
                <ItemDate>{item.date}</ItemDate>
                <ItemType>{item.type}</ItemType>
              </ItemInfo>
            </ItemLeft>
            <ItemRight>
              <ItemGrade>{item.grade}</ItemGrade>
              <ItemPoints>{item.points.toLocaleString()}</ItemPoints>
            </ItemRight>
          </ListItem>
        ))}
      </ListContainer>
    </Container>
  );
};

export default ExpList;

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
  width: 100%;
  padding: 15px 0;
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 12px;
`;

const Title = styled.h1`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  text-align: center;
  flex: 1;
`;

const TabBar = styled.div`
  display: flex;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e7e8;
  height: 40px;
  align-items: center;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button`
  ${(props) => props.theme.fonts.semiBold};
  padding: 13px 0;
  font-size: 16px;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: ${(props) => (props.selected ? "4px solid #FC5833" : "none")};
  color: ${(props) =>
    props.selected ? props.theme.colors.black3 : props.theme.colors.gray2};
  min-width: 110px;
`;

const SortBar = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  position: relative;
  display: flex;
  justify-content: ${(props) =>
    props.hasInfoIcon ? "space-between" : "flex-end"};
  align-items: center;
  padding: 9px 20px;
  border-bottom: 2px solid #e6e7e8;
  padding-top: 19px;
`;

const InfoIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const InfoIcon = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const InfoImage = styled.img`
  position: absolute;
  top: 45px;
  left: 5px;
  width: 250px;
  z-index: 100;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const SortButton = styled.button`
  background: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SortText = styled.span`
  ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.gray2};
`;

const SortIcon = styled.img`
  margin-left: 8px;
  width: 13px;
  height: 7px;
`;

const DropDownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 15px;
  background-color: ${(props) => props.theme.colors.gray};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 10;
`;

const DropDownItem = styled.div`
  padding: 8px 8px;
  ${(props) => props.theme.fonts.regular};
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray3};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray2};
  }
`;

const Description = styled.div`
  padding: 34px 20px 0 20px;

  background-color: ${(props) => props.theme.colors.white};

  div {
    background-color: ${(props) => props.theme.colors.gray};
    border-radius: 14px;
    padding: 16px 29px;
    padding: 16px 15px 16px 29px;
  }

  span {
    font-size: 16px;
    color: #636364;
    margin-right: 16px;
  }
`;

const ListContainer = styled.div``;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 20px;
  border-bottom: 1px solid #e3e3e3;
  background-color: ${(props) => props.theme.colors.white};
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
`;

const ItemIcon = styled.img`
  width: 42px;
  height: 42px;
  margin-right: 17px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemDate = styled.p`
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray2};
`;

const ItemType = styled.p`
  ${(props) => props.theme.fonts.semiBold};
  color: ${(props) => props.theme.colors.black};
`;

const ItemRight = styled.div`
  text-align: right;
`;

const ItemGrade = styled.div`
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray3};
`;

const ItemPoints = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 24px;
  color: ${(props) => props.theme.colors.mainC};
`;
