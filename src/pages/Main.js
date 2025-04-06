import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import notificationIcon from "../assets/notification.svg";
import ExperienceSection from "../components/ExperienceSection";
import ProfileCard from "../components/ProfileCard";
import { getUnreadNotificationCount } from "../api/NotificationApi";

const Main = () => {
  const navigate = useNavigate();
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      const response = await getUnreadNotificationCount();
      if (response.responseType === "SUCCESS" && response.success > 0) {
        setHasNotification(true);
      } else {
        setHasNotification(false);
      }
    };

    fetchNotification();
  }, []);

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="logo" />
        <NotificationContainer onClick={() => navigate("/alarm")}>
          <NotificationIcon src={notificationIcon} alt="notification" />
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
  padding: 15px 20px;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.gray};
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
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
