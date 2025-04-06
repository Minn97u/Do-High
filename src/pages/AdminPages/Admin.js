import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoutModal from "../../components/Modal";
import { Axios } from "../../api/Axios";

const Admin = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await logoutMember();

      if (response.responseType === "SUCCESS") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("refreshToken");
        navigate("/auth/login", { replace: true });
      } else {
        console.error("로그아웃 실패:", response.error.message);
      }
    } catch (error) {
      console.error("로그아웃 요청 오류:", error);
    }
  };

  return (
    <Container>
      <Header>
        <Title>어드민</Title>
      </Header>
      <ButtonContainer>
        <ActionButton onClick={() => navigate("/boardlist")}>
          게시글 작성
        </ActionButton>
        <LogoutButton onClick={() => setModalOpen(true)}>로그아웃</LogoutButton>
      </ButtonContainer>

      <LogoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          handleLogout();
          setModalOpen(false);
        }}
        title="로그아웃 하시겠습니까?"
        subtitle="로그아웃 시 로그인 화면으로 이동합니다."
      />
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
  text-align: center;
`;

const LogoutButton = styled.div`
  width: 100%;
  padding: 16px 0px;
  ${(props) => props.theme.fonts.semiBold};
  font-size: 16px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.gray3};
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
`;

export default Admin;
