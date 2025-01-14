import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import backBtn from "../assets/backBtn.svg";
import menu from "../assets/menu.svg";
import dayjs from "dayjs";

import { getPostById, deletePostById } from "../api/BoardApi";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [post, setPost] = useState({
    id: null,
    title: "",
    content: "",
    author: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const postId = Number(boardId);
        const data = await getPostById(postId);

        setPost(data);
      } catch (error) {
        console.error("게시글 상세 조회 실패:", error.message);
      }
    };

    if (boardId) {
      fetchPostDetail();
    }
  }, [boardId]);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    navigate(`/boardEdit/${post.id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await deletePostById(post.id);
        alert("삭제되었습니다.");
        navigate(-1);
      } catch (error) {
        console.error("게시글 삭제 실패:", error.message);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format("YYYY.MM.DD. HH:mm");
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/boardlist")}>
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
        <PostDate>작성일 {formatDate(post.createdAt)}</PostDate>
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
