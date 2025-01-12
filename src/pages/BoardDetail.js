import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backBtn from "../assets/backBtn.svg";
import menu from "../assets/menu.svg";

const BoardDetail = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const post = {
    id: 1,
    title: "AAA 프로젝트 신설",
    date: "2025.01.07. 17:00",
    content: `
      임시 본문입니다. 팀미션인증 채널 > 팀별 첫 모임 보고에 1월 10일 금요일 자정까지 업로드 부탁드립니다.
      임시 본문입니다. 팀미션인증 채널 > 팀별 첫 모임 보고에 1월 10일 금요일 자정까지 업로드 부탁드립니다.
      임시 본문입니다. 팀미션인증 채널 > 팀별 첫 모임 보고에 1월 10일 금요일 자정까지 업로드 부탁드립니다.
    `,
  };

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    navigate(`/boardEdit/${post.id}`);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      alert("삭제되었습니다.");
      navigate(-1);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>게시글 상세</HeaderTitle>

        {isAdmin && (
          <MenuButton onClick={handleMenuToggle}>
            <img src={menu} alt="메뉴" />
          </MenuButton>
        )}

        {menuOpen && (
          <DropdownMenu>
            <DropdownItem onClick={handleEdit}>수정하기</DropdownItem>
            <DropdownItem onClick={handleDelete}>삭제하기</DropdownItem>
          </DropdownMenu>
        )}
      </Header>

      <DetailContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostDate>작성일 {post.date}</PostDate>
        <PostContent>{post.content}</PostContent>
      </DetailContainer>
    </Container>
  );
};

export default BoardDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
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

const HeaderTitle = styled.h1`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  text-align: center;
  flex: 1;
  margin: 0;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 28px;
  top: 11px;
  font-size: 24px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  width: 150px;
  text-align: center;
  top: 50px;
  right: 20px;
  background-color: ${(props) => props.theme.colors.gray};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 16px 0;
  ${(props) => props.theme.fonts.medium};
  cursor: pointer;
  border-bottom: solid 1px #eaebed;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const DetailContainer = styled.div`
  padding: 0 20px;
  margin-top: 30px;
`;

const PostTitle = styled.h2`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 20px;
  margin-bottom: 4px;
`;

const PostDate = styled.p`
  ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.gray2};
  margin-bottom: 22px;
`;

const PostContent = styled.div`
  ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  color: ${(props) => props.theme.colors.black2};
  white-space: pre-line;
`;
