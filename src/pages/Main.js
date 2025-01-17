// import React, { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import notification from "../assets/notification.svg";
import ProfileCard from "../components/ProfileCard";
import ExperienceSection from "../components/ExperienceSection";
import { useNavigate } from "react-router-dom";
import levelUpIcon from "../assets/levelUp.svg";
import Celebration from "../components/Celebration";

const Main = () => {
  const navigate = useNavigate();
  // const [hasNotification, setHasNotification] = useState(false);
  // const [notificationList, setNotificationList] = useState([]);

  //   useEffect(() => {
  //     // Service Worker 메시지 수신 핸들러
  //     const handleServiceWorkerMessage = (event) => {
  //       if (event.data.type === "NOTIFICATION_RECEIVED") {
  //         console.log(event.data.payload);

  //         setNotificationList((prev) => [
  //           ...prev,
  //           {
  //             id: new Date().getTime(),
  //             title: event.data.payload.title,
  //             content: event.data.payload.body,
  //           },
  //         ]);
  //         setHasNotification(true);
  //       }
  //     };

  //     navigator.serviceWorker.addEventListener(
  //       "message",
  //       handleServiceWorkerMessage
  //     );

  //     return () => {
  //       navigator.serviceWorker.removeEventListener(
  //         "message",
  //         handleServiceWorkerMessage
  //       );
  //     };
  //   }, []);

  // useEffect(() => {
  //   if (Notification.permission !== "granted") {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === "granted") {
  //         console.log("알림 권한이 허용되었습니다.");
  //       } else {
  //         console.log("알림 권한이 거부되었습니다.");
  //       }
  //     });
  //   }
  // }, []);

  return (
    <Container>
      <Celebration />
      <Header>
        <Logo src={logo} alt="logo" />
        <NotificationContainer onClick={() => navigate("/alarm")}>
          <NotificationIcon src={notification} alt="notification" />
          {/* {hasNotification && <NotificationBadge />} */}
        </NotificationContainer>
      </Header>
      <Content>
        <Alarm>
          <img src={levelUpIcon} alt="levelUpIcon"></img>
          F1-II로 레벨업 했어요! 🚀 축하드려요!
        </Alarm>
        <ProfileCard />
        <ExperienceSection />
        {/* <NotificationSection>
          {notificationList.map((notif) => (
            <NotificationCard key={notif.id}>
              <Title>{notif.title}</Title>
              <Message>{notif.content}</Message>
            </NotificationCard>
          ))}
        </NotificationSection> */}
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

// const NotificationBadge = styled.div`
//   position: absolute;
//   top: -3px;
//   right: -3px;
//   width: 4px;
//   height: 4px;
//   background-color: ${(props) => props.theme.colors.mainC};
//   border-radius: 50%;
// `;

const Content = styled.div`
  margin-top: 50px;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Alarm = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  margin: 16px;
  padding: 12px 24px;
  border-radius: 20px;
  img {
    margin-right: 9px;
  }
`;

// const NotificationSection = styled.div`
//   margin-top: 20px;
//   padding: 0 20px;
// `;

// const NotificationCard = styled.div`
//   background: #f9f9f9;
//   padding: 10px 15px;
//   margin-bottom: 10px;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const Title = styled.div`
//   font-weight: bold;
//   margin-bottom: 5px;
// `;

// const Message = styled.div`
//   font-size: 14px;
//   color: ${(props) => props.theme.colors.gray3};
// `;
