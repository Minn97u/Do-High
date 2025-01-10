import React, { useState } from "react";
import styled from "styled-components";
import { IoEye, IoEyeOff } from "react-icons/io5";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("general");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    navigate("/");
  };

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
        <PasswordContainer>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
          />
          <ToggleButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <IoEye /> : <IoEyeOff />}
          </ToggleButton>
        </PasswordContainer>
      </InputContainer>
      <LoginButton onClick={handleLogin}>로그인</LoginButton>
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
  border-bottom: ${(props) =>
    props.active ? `3px solid ${props.theme.colors.subBlue}` : "none"};
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
  background: ${(props) => props.theme.colors.btn};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-bottom: 22px;
`;

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleButton = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-40%);
  cursor: pointer;
  font-size: 25px;
  color: ${(props) => props.theme.colors.gray2};
  user-select: none;
`;

const Inquiry = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray2};
  cursor: pointer;
  text-decoration: underline;
`;
