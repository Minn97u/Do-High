import React from "react";
import styled from "styled-components";
import profile from "../assets/profile.svg";
import coin from "../assets/coin.svg";
import dropdownArrow from "../assets/dropdown.svg";
import notification from "../assets/notification.svg";
import { useNavigate } from "react-router-dom";

const MypageEntry = () => {
  const hasNotification = true;
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/mypage");
  };

  return (
    <Container>
      <Header>
        <Title>마이페이지</Title>
        <NotificationContainer>
          <NotificationIcon src={notification} alt="notification" />
          {hasNotification && <NotificationBadge />}
        </NotificationContainer>
      </Header>
      <Content>
        <Section>
          <Row onClick={handleProfileClick}>
            <ProfileImage src={profile} alt="profile" />
            <Info>
              <Name>허재민</Name>
              <SubInfo>
                <p>2022080101 </p> 음성 2센터 1
              </SubInfo>
            </Info>
            <ArrowIcon src={dropdownArrow} alt="arrow" />
          </Row>
        </Section>
        <Section>
          <Row>
            <CoinImage src={coin} alt="coin" />
            <Info>
              <Name>재민님은 F1-I 레벨 입니다</Name>
              <SubInfo>
                총 누적 경험치 <p>10,500</p>
              </SubInfo>
            </Info>
            <ArrowIcon src={dropdownArrow} alt="arrow" />
          </Row>
        </Section>
        <ServiceInfo>
          <ServiceTitle>서비스 정보</ServiceTitle>
          <ServiceItem>
            공지사항
            <ArrowIcon src={dropdownArrow} alt="arrow" />
          </ServiceItem>
          <ServiceItem>
            관리자 문의하기
            <ArrowIcon src={dropdownArrow} alt="arrow" />
          </ServiceItem>
          <ServiceItem>
            로그아웃
            <ArrowIcon src={dropdownArrow} alt="arrow" />
          </ServiceItem>
        </ServiceInfo>
      </Content>
    </Container>
  );
};

export default MypageEntry;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
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
  height: 212px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ServiceTitle = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.gray2};
`;

const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  ${(props) => props.theme.fonts.semiBold};
  font-size: 16px;
`;
