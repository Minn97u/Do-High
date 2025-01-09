import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import notification from "../assets/notification.svg";
import ProfileCard from "../components/ProfileCard";
import ExperienceSection from "../components/ExperienceSection";

const Main = () => {
  const hasNotification = true;

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="logo" />
        <NotificationContainer>
          <NotificationIcon src={notification} alt="notification" />
          {hasNotification && <NotificationBadge />}
        </NotificationContainer>
      </Header>
      <Content>
        <ProfileCard />
        <ExperienceSection />
      </Content>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray};
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* height: 50px; */
  padding: 15px 20px;
  z-index: 10;
`;

const Logo = styled.img`
  width: 93px;
  height: auto;
`;

const NotificationContainer = styled.div`
  position: relative;
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
  margin-top: 50px;
  flex: 1;
  overflow-y: auto;
`;
