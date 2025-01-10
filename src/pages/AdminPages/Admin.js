import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Title>어드민</Title>
      </Header>
      <ButtonContainer>
        <ActionButton onClick={() => navigate("/admin/create")}>
          새로운 계정 생성
        </ActionButton>
        <ActionButton onClick={() => navigate("/admin/manage")}>
          기존 계정 설정
        </ActionButton>
        <ActionButton onClick={() => navigate("/admin/boardpost")}>
          게시글 작성
        </ActionButton>
        <Logout>
          <LogoutText onClick={() => navigate("/logout")}>로그아웃</LogoutText>
        </Logout>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Title = styled.h1`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  text-align: center;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;
  padding: 0 20px;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 16px 0px;
  ${(props) => props.theme.fonts.semiBold};
  font-size: 16px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.btn};
  border-radius: 10px;
  cursor: pointer;
`;

const Logout = styled.div`
  margin-top: 8px;
`;

const LogoutText = styled.span`
  ${(props) => props.theme.fonts.medium};
  text-decoration: underline;
  color: ${(props) => props.theme.colors.gray2};
  cursor: pointer;
`;

export default Admin;
