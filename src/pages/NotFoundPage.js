import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/main");
  };

  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <ErrorCode>404</ErrorCode>
      <Message>페이지를 찾을 수 없습니다.</Message>
      <Description>
        요청하신 페이지가 존재하지 않거나, <br /> 주소가 잘못되었습니다.
      </Description>
      <GoHomeButton onClick={handleGoHome}>홈으로 돌아가기</GoHomeButton>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.gray};
  text-align: center;
  padding: 20px;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorCode = styled.h1`
  font-size: 96px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.mainC};
`;

const Message = styled.h2`
  font-size: 24px;
  margin: 10px 0;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const GoHomeButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.mainC};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: "#e55b2f";
  }
`;
