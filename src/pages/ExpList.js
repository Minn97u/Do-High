import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  getCpExp,
  getExpList,
  getJqExp,
  getLqExp,
  getPfExp,
} from "../api/ExpApi";
import dropdownArrow from "../assets/dropdown.svg";
import expListInfo1 from "../assets/expListInfo1.svg";
import expListInfo2 from "../assets/expListInfo2.svg";
import expListInfo3 from "../assets/expListInfo3.svg";
import infoIcon from "../assets/info.svg";

const orderMap = {
  최신순: "desc",
  오래된순: "asc",
};

const coinMap = {
  S: require("../assets/coin/S.svg").default,
  A: require("../assets/coin/A.svg").default,
  B: require("../assets/coin/B.svg").default,
  C: require("../assets/coin/C.svg").default,
  D: require("../assets/coin/D.svg").default,
  BronzeDo: require("../assets/coin/BronzeDo.svg").default,
  MAX: require("../assets/coin/GoldDo.svg").default,
  MED: require("../assets/coin/SilverDo.svg").default,
};

const tabList = [
  "전체",
  "인사평가",
  "직무 퀘스트",
  "리더 퀘스트",
  "전사 프로젝트",
];

const ExpList = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [sortOption, setSortOption] = useState("최신순");
  const [selectedTab, setSelectedTab] = useState("전체");
  const [expList, setExpList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExpList = useCallback(async () => {
    setLoading(true);
    try {
      const order = orderMap[sortOption];
      let data;
      if (selectedTab === "전체") {
        data = await getExpList(order);
      } else if (selectedTab === "인사평가") {
        data = await getPfExp(order);
      } else if (selectedTab === "직무 퀘스트") {
        data = await getJqExp(order);
      } else if (selectedTab === "리더 퀘스트") {
        data = await getLqExp(order);
      } else if (selectedTab === "전사 프로젝트") {
        data = await getCpExp(order);
      }

      if (data.responseType === "SUCCESS") {
        setExpList(data.success);
      } else {
        console.error("데이터 로드 실패:", data.error?.message);
        setExpList([]);
      }
    } catch (error) {
      console.error("API 호출 오류:", error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedTab, sortOption]);

  useEffect(() => {
    fetchExpList();
  }, [fetchExpList]);

  const handleSortClick = () => {
    setSortOpen((prev) => !prev);
  };

  const handleSortSelect = (option) => {
    setSortOption(option);
    setSortOpen(false);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setInfoOpen(false);
  };

  const handleInfoClick = () => {
    setInfoOpen((prev) => !prev);
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format("YYYY.MM.DD");
  };

  const getInfoImage = () => {
    switch (selectedTab) {
      case "직무 퀘스트":
        return expListInfo1;
      case "인사평가":
        return expListInfo2;
      case "리더 퀘스트":
      case "전사 프로젝트":
        return expListInfo3;
      default:
        return null;
    }
  };

  return (
    <Container>
      <TopContainer>
        <Header>
          <Title>경험치 내역</Title>
        </Header>

        <TabBar>
          {tabList.map((tab) => (
            <Tab
              key={tab}
              selected={selectedTab === tab}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </Tab>
          ))}
        </TabBar>

        <SortBar hasInfoIcon={selectedTab !== "전체"}>
          {selectedTab !== "전체" && (
            <InfoIconWrapper>
              <InfoIcon src={infoIcon} alt="정보" onClick={handleInfoClick} />
              {infoOpen && <InfoImage src={getInfoImage()} alt="정보 설명" />}
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
      </TopContainer>

      {loading ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : (
        <ListContainer>
          {expList.map((item, index) => (
            <ListItem key={index}>
              <ItemLeft>
                <ItemIcon
                  src={coinMap[item.coin] || coinMap["BronzeDo"]}
                  alt={`${item.coin} 아이콘`}
                />
                <ItemInfo>
                  <ItemDate>{formatDate(item.date)}</ItemDate>
                  <ItemType>{item.questName}</ItemType>
                </ItemInfo>
              </ItemLeft>
              <ItemRight>
                <ItemGrade>{item.expName}</ItemGrade>
                <ItemPoints>{item.exp?.toLocaleString() ?? "0"}</ItemPoints>
              </ItemRight>
            </ListItem>
          ))}
        </ListContainer>
      )}
    </Container>
  );
};

export default ExpList;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.gray2};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.gray};
`;

const TopContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${(props) => props.theme.colors.gray};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  position: relative;
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
  border-bottom: ${(props) => (props.selected ? "5px solid #FC5833" : "none")};
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
  padding: 9px 28px;
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
  left: 15px;
  z-index: 100;
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
  right: 23px;
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

const ListContainer = styled.div`
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

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
  max-width: 200px;
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
