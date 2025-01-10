import React, { useState } from "react";
import styled from "styled-components";
import backBtn from "../assets/backBtn.svg";
import { IoEye, IoEyeOff } from "react-icons/io5";

const PwChange = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Container>
      <Header>
        <BackButton>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>비밀번호 변경</Title>
      </Header>
      <Content>
        <InputContainer>
          <Label>기존 비밀번호</Label>
          <PasswordContainer>
            <Input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="기존 비밀번호 입력"
            />
            <ToggleButton
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <IoEye /> : <IoEyeOff />}
            </ToggleButton>
          </PasswordContainer>
        </InputContainer>

        <InputContainer>
          <Label>신규 비밀번호</Label>
          <PasswordContainer>
            <Input
              type={showNewPassword ? "text" : "password"}
              placeholder="영문, 숫자 포함 8자 이상"
            />
            <ToggleButton onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? <IoEye /> : <IoEyeOff />}
            </ToggleButton>
          </PasswordContainer>
        </InputContainer>

        <InputContainer>
          <Label>신규 비밀번호 확인</Label>
          <PasswordContainer>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="신규 비밀번호 입력"
            />
            <ToggleButton
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
            </ToggleButton>
          </PasswordContainer>
        </InputContainer>

        <SaveButton disabled>변경하기</SaveButton>
      </Content>
    </Container>
  );
};

export default PwChange;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.white};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  position: relative;
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
  text-align: center;
  flex: 1;
`;

const Content = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  gap: 24px;
  flex: 1;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 360px;
`;

const Label = styled.div`
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray2};
  margin-bottom: 6px;
  margin-left: 4px;
`;

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  font-size: 14px;
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: 10px;

  ::placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }
  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }
  &:focus {
    outline-color: ${(props) => props.theme.colors.mainC};
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 57%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.gray2};
  font-size: 25px;
`;

const SaveButton = styled.button`
  width: 100%;
  max-width: 350px;
  padding: 14px;
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  border-radius: 50px;
  background: #a6a8ab;
  color: #d3d3d5;
  cursor: not-allowed;
  margin-top: auto;
  margin-bottom: 73px;
`;
