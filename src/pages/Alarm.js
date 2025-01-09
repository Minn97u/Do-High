import React from "react";
import styled from "styled-components";
import backBtn from "../assets/backBtn.svg";
import flagIcon from "../assets/flag.svg";
import coinIcon from "../assets/coin.svg";
import speakerIcon from "../assets/speaker.svg";

const notifications = [
  {
    id: 1,
    type: "경험치",
    icon: coinIcon,
    message: "새로운 경험치를 획득했어요",
    time: "1시간 전",
  },
  {
    id: 2,
    type: "게시판",
    icon: speakerIcon,
    message: "새로운 글이 올라왔어요.",
    time: "3시간 전",
  },
  {
    id: 3,
    type: "퀘스트",
    icon: flagIcon,
    message: "월별 퀘스트를 수행했어요.",
    time: "24. 1. 21",
  },
];

const Alarm = () => {
  return (
    <PageContainer>
      <Header>
        <BackButton>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>알림</Title>
      </Header>
      <NotificationList>
        {notifications.map((notification) => (
          <NotificationCard key={notification.id}>
            <Icon>
              <img
                src={notification.icon}
                alt={`${notification.type} 아이콘`}
              />
            </Icon>
            <Content>
              <Type>{notification.type}</Type>
              <Message>{notification.message}</Message>
            </Content>
            <Time>{notification.time}</Time>
          </NotificationCard>
        ))}
      </NotificationList>
    </PageContainer>
  );
};

export default Alarm;

const PageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.gray};
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  /* height: 50px; */
  margin-bottom: 10px;
  padding: 15px 0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  left: 22px;
  top: 12px;
`;

const Title = styled.h1`
  ${(props) => props.theme.fonts.semibold};
  font-size: 18px;
  margin: 0;
  text-align: center;
  flex: 1;
`;

const NotificationList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const NotificationCard = styled.div`
  display: flex;
  background-color: #e3edfb;
  height: 110px;
  padding: 0 25px;
  padding-top: 15px;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Type = styled.div`
  margin-bottom: 10px;
  ${(props) => props.theme.fonts.regular};
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray3};
`;

const Message = styled.div`
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
`;

const Time = styled.div`
  ${(props) => props.theme.fonts.regular};
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray3};
`;
