import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Axios } from "../api/Axios";
import { getNotificationList } from "../api/NotificationApi";
import backBtn from "../assets/backBtn.svg";
import coin from "../assets/coin.svg";
import flagIcon from "../assets/flag.svg";
import levelUpIcon from "../assets/levelUp.svg";
import speakerIcon from "../assets/speaker.svg";

const Alarm = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryIcons = {
    EXP: coin,
    LEVELUP: levelUpIcon,
    MQUEST: flagIcon,
    POST: speakerIcon,
    WQUEST: flagIcon,
  };

  const handleNotificationClick = async (id, redirectPath) => {
    try {
      await Axios.patch(`/push/${id}`);

      const data = await getNotificationList();
      console.log("알림 목록:", data);
      setNotifications(data);

      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate("/alarm");
      }
    } catch (err) {
      console.error("알림 읽음 처리 실패:", err);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotificationList();
        setNotifications(data);
      } catch (err) {
        setError("알림을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <LoadingMessage>알림을 불러오는 중...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>알림</Title>
      </Header>
      <NotificationList>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            onClick={() =>
              handleNotificationClick(
                notification.id,
                notification.redirectPath
              )
            }
            read={notification.read}
          >
            <Icon>
              <img
                src={categoryIcons[notification.category] || flagIcon}
                alt={`${notification.category} 아이콘`}
              />
            </Icon>
            <Content>
              <Type>{notification.title}</Type>
              <Message>{notification.content}</Message>
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
  height: 92vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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
  left: 20px;
  top: 12px;
`;

const Title = styled.h1`
  ${(props) => props.theme.fonts.semiBold};
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
  background-color: ${(props) =>
    props.read ? props.theme.colors.gray : "#e3edfb"};
  height: 110px;
  padding: 0 25px;
  padding-top: 15px;
  cursor: pointer;
`;

const Icon = styled.div`
  width: 26px;
  height: 26px;
  margin-right: 10px;
  img {
    width: 26px;
    height: 26px;
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

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
  color: red;
`;
