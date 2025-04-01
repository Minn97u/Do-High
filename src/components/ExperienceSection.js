import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getRecentExp } from "../api/ExpApi";
import { getQuests } from "../api/QuestApi";
import { getMemberInfo } from "../api/UserApi";
import backBtn from "../assets/mainArrow.svg";

const coinMap = {
  S: require("../assets/coin/S.svg").default,
  A: require("../assets/coin/A.svg").default,
  B: require("../assets/coin/B.svg").default,
  C: require("../assets/coin/C.svg").default,
  D: require("../assets/coin/D.svg").default,
  MAX: require("../assets/coin/GoldDo.svg").default,
  MED: require("../assets/coin/SilverDo.svg").default,
};

const ExperienceSection = () => {
  const navigate = useNavigate();
  const [recentExp, setRecentExp] = useState(null);
  const [memberName, setMemberName] = useState("");
  const [quests, setQuests] = useState([]);

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

    const fetchQuests = async () => {
      try {
        const data = await getQuests();
        if (data.responseType === "SUCCESS") {
          setQuests(data.success);
        } else {
          console.error("퀘스트 데이터 로드 실패:", data.error.message);
        }
      } catch (error) {
        console.error("API 호출 오류:", error.message);
      }
    };

    fetchRecentExp();
    fetchMemberInfo();
    fetchQuests();
  }, []);

  function formatDate(dateString) {
    if (!dateString) return "";
    return dateString.replace(/-/g, ".");
  }

  const handleExpClick = () => {
    if (recentExp) {
      navigate(`/exp?tab=${encodeURIComponent(recentExp.expName)}`);
    } else {
      navigate("/exp");
    }
  };

  return (
    <ExperienceSectionContainer>
      <SectionHeader
        onClick={() => {
          navigate("/exp?tab=전체");
        }}
      >
        <SectionTitle>최근에 {memberName}님이 받은 do예요!</SectionTitle>
        <ArrowIcon src={backBtn} alt="More" />
      </SectionHeader>
      {recentExp ? (
        <RecentDoCard onClick={handleExpClick}>
          <CardContent>
            <CardDate>{formatDate(recentExp.date)}</CardDate>
            <CardTitle>{recentExp.expName}</CardTitle>
          </CardContent>
          <CardValue>
            <CoinIcon
              src={coinMap[recentExp.coin] || coinMap["MAX"]}
              alt={`${recentExp.coin || "MAX"} Coin`}
            />
            {recentExp.exp.toLocaleString()}
          </CardValue>
        </RecentDoCard>
      ) : (
        <EmptyMessage>최근 경험치가 없습니다.</EmptyMessage>
      )}

      <SectionHeader onClick={() => navigate("/quest")}>
        <SectionTitle>{memberName}님이 수행한 퀘스트예요!</SectionTitle>
        <ArrowIcon src={backBtn} alt="More" />
      </SectionHeader>
      {quests && quests.length > 0 ? (
        <QuestList>
          {quests.map((quest, index) => {
            const coinType = quest.coin || "MAX";
            return (
              <QuestCard
                key={index}
                onClick={() =>
                  navigate(
                    `/quest?tab=${quest.description}&year=${quest.year}&month=${quest.month}`
                  )
                }
              >
                <QuestTitle>{quest.expName}</QuestTitle>
                <DottedLine />
                <QuestIcon
                  src={coinMap[coinType] || coinMap["MAX"]}
                  alt={`${coinType} Coin`}
                />
                <QuestSubtitle
                  color={
                    coinType === "MED"
                      ? "#BBC5CE"
                      : coinType === "MAX"
                        ? "#FBB62C"
                        : "#000"
                  }
                >
                  {quest.questName}
                </QuestSubtitle>
              </QuestCard>
            );
          })}
        </QuestList>
      ) : (
        <EmptyMessage>수행한 퀘스트가 없습니다.</EmptyMessage>
      )}
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
  cursor: pointer;
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
  width: 90%;
  margin: auto;
  color: ${(props) => props.color};
`;

const EmptyMessage = styled.div`
  text-align: center;
  margin: 20px 0;
  ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.gray2};
`;
