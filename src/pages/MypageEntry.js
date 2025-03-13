import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getExpStatus } from "../api/ExpApi";
import { getMemberInfo } from "../api/UserApi";
import coin from "../assets/coin.svg";
import dropdownArrow from "../assets/dropdown.svg";
import notification from "../assets/notification.svg";
import profile from "../assets/profile.svg";
import LogoutModal from "../components/Modal";

const MypageEntry = () => {
  const [memberInfo, setMemberInfo] = useState({
    name: "",
    identificationNumber: "",
    team: "",
    level: "",
    character: profile,
  });
  const [totalExp, setTotalExp] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const hasNotification = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberResponse = await getMemberInfo();
        if (memberResponse.responseType === "SUCCESS") {
          setMemberInfo({
            name: memberResponse.success.name,
            identificationNumber: memberResponse.success.identificationNumber,
            team: memberResponse.success.team,
            level: memberResponse.success.level,
            character: memberResponse.success.profile || profile,
          });
        } else {
          console.error("멤버 정보 조회 오류:", memberResponse.error.message);
        }

        const expResponse = await getExpStatus();
        if (expResponse.responseType === "SUCCESS") {
          setTotalExp(expResponse.success.exp);
        } else {
          console.error("경험치 정보 조회 오류:", expResponse.error.message);
        }
      } catch (error) {
        console.error("API 호출 오류:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleProfileClick = () => {
    navigate("/mypage");
  };

  const handleLVClick = () => {
    navigate("/main");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAdmin");
    navigate("/auth/login");
  };

  return (
    <Container>
      <Header>
        <Title>마이페이지</Title>
        <NotificationContainer onClick={() => navigate("/alarm")}>
          <NotificationIcon src={notification} alt="notification" />
          {hasNotification && <NotificationBadge />}
        </NotificationContainer>
      </Header>
      <Content>
        <Section>
          <Row onClick={handleProfileClick}>
            <ProfileImage src={memberInfo.character} alt="profile" />
            <Info>
              <Name>{memberInfo.name}</Name>
              <SubInfo>
                <p>{memberInfo.identificationNumber}</p>
                {memberInfo.team}
              </SubInfo>
            </Info>
            <ArrowIcon src={dropdownArrow} alt="arrow" />
          </Row>
        </Section>
        <Section>
          <Row onClick={handleLVClick}>
            <CoinImage src={coin} alt="coin" />
            <Info>
              <Name>
                {memberInfo.name}님은 {memberInfo.level} 레벨 입니다
              </Name>
              <SubInfo>
                총 누적 경험치 <p>{totalExp}</p>
              </SubInfo>
            </Info>
            <ArrowIcon src={dropdownArrow} alt="arrow" />
          </Row>
        </Section>
        <ServiceInfo>
          <ServiceItem onClick={() => setModalOpen(true)}>
            로그아웃
            <ArrowIcon src={dropdownArrow} alt="arrow" />
          </ServiceItem>
        </ServiceInfo>
      </Content>
      <LogoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          handleLogout();
          setModalOpen(false);
        }}
        title="로그아웃 하시겠습니까?"
        subtitle="로그아웃 시 로그인 화면으로 이동합니다"
      />
    </Container>
  );
};

export default MypageEntry;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${(props) => props.theme.colors.gray};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  position: relative;
`;

const Title = styled.h1`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  text-align: center;
`;

const NotificationContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
`;

const NotificationIcon = styled.img`
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 4px;
  height: 4px;
  background-color: ${(props) => props.theme.colors.mainC};
  border-radius: 50%;
`;
const Content = styled.div`
  padding: 20px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Section = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileImage = styled.img`
  width: 54px;
  height: 54px;
`;

const CoinImage = styled.img`
  width: 54px;
  height: 54px;
`;

const Info = styled.div`
  flex: 1;
  margin-left: 15px;
`;

const Name = styled.div`
  ${(props) => props.theme.fonts.bold};
  font-size: 16px;
`;

const SubInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  ${(props) => props.theme.fonts.medium};
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray2};
  p {
    ${(props) => props.theme.fonts.Nanum};
    font-weight: bold;
    color: ${(props) => props.theme.colors.gray2};
    font-size: 14px;
    padding-top: 2px;
  }
`;

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
  transform: rotate(-90deg);
`;

const ServiceInfo = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 15px 20px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  ${(props) => props.theme.fonts.semiBold};
  font-size: 16px;
`;
