import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import notificationIcon from "../assets/notification.svg";
import ExperienceSection from "../components/ExperienceSection";
import ProfileCard from "../components/ProfileCard";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase";

const Main = () => {
  const navigate = useNavigate();

  // 포그라운드 메시지 수신
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      if (payload?.notification) {
        // 브라우저의 Notification API를 사용해 알림 표시
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: payload.notification.icon || "../public/dohigh.png",
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="logo" />
        <NotificationContainer onClick={() => navigate("/alarm")}>
          <NotificationIcon src={notificationIcon} alt="notification" />
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

const Content = styled.div`
  margin-top: 50px;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
