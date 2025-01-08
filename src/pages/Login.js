import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";

const Login = () => {
  const [userType, setUserType] = useState("general");

  return (
    <Container>
      <img src={logo} alt="logo" />
      <TabContainer>
        <Tab
          active={userType === "general"}
          onClick={() => setUserType("general")}
        >
          일반 사원
        </Tab>
        <Tab active={userType === "admin"} onClick={() => setUserType("admin")}>
          관리자
        </Tab>
      </TabContainer>
      <InputContainer>
        <Input type="text" placeholder="아이디" />
        <Input type="password" placeholder="비밀번호" />
      </InputContainer>
      <LoginButton>로그인</LoginButton>
      <Inquiry>관리자에게 찾기 문의하기</Inquiry>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const TabContainer = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: space-around;
  width: 89%;
  border-bottom: 1px solid #ddd;
  margin-bottom: 26px;
`;

const Tab = styled.div`
  font-size: 16px;
  padding: 12px 0;
  cursor: pointer;
  flex: 1;
  text-align: center;
  font-weight: 500;
  color: ${(props) => (props.active ? "black" : props.theme.colors.gray2)};
  border-bottom: ${(props) => (props.active ? "3px solid #94C1FF" : "none")};
`;

const InputContainer = styled.div`
  width: 89%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 60px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: 10px;
  padding-left: 20px;
  outline: none;

  ::placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }
  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }
`;

const LoginButton = styled.button`
  width: 89%;
  height: 48px;
  font-size: 16px;
  color: white;
  background: linear-gradient(to right, #ff6d3a, #ff4c3a);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-bottom: 22px;
`;

const Inquiry = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray2};
  cursor: pointer;
  text-decoration: underline;
`;
