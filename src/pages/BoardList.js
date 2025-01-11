import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backBtn from "../assets/backBtn.svg";
import dropdownArrow from "../assets/dropdown.svg";

const BoardList = () => {
  const navigate = useNavigate();
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("최신순");

  const posts = [
    {
      id: 1,
      title: "AAA 프로젝트 신설",
      content: "AAA 프로젝트를 진행합니다. 본 프로젝트는 어떤 내용이...",
      date: "2025.2.15",
    },
    {
      id: 2,
      title: "AAA 프로젝트 신설",
      content: "AAA 프로젝트를 진행합니다. 본 프로젝트는 어떤 내용이...",
      date: "2025.2.15",
    },
    {
      id: 3,
      title: "AAA 프로젝트 신설",
      content: "AAA 프로젝트를 진행합니다. 본 프로젝트는 어떤 내용이...",
      date: "2025.2.15",
    },
    {
      id: 4,
      title: "AAA 프로젝트 신설",
      content: "AAA 프로젝트를 진행합니다. 본 프로젝트는 어떤 내용이...",
      date: "2025.2.15",
    },
  ];

  const handleSortClick = () => {
    setSortOpen((prev) => !prev);
  };

  const handleSortSelect = (option) => {
    setSortOption(option);
    setSortOpen(false);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>게시글 목록</Title>
      </Header>

      <SortBar>
        <SortButton onClick={handleSortClick}>
          <SortText>{sortOption}</SortText>
          <SortIcon src={dropdownArrow} alt="정렬" />
        </SortButton>
        {sortOpen && (
          <DropDownMenu>
            <DropDownItem onClick={() => handleSortSelect("최신순")}>
              최신순
            </DropDownItem>
            <DropDownItem onClick={() => handleSortSelect("오래된순")}>
              오래된순
            </DropDownItem>
          </DropDownMenu>
        )}
      </SortBar>

      <ListContainer>
        {posts.map((post) => (
          <ListItem
            key={post.id}
            onClick={() => navigate("/boardList/:boardId")}
          >
            <ItemTitle>{post.title}</ItemTitle>
            <ItemContent>{post.content}</ItemContent>
            <ItemDate>작성일 {post.date}</ItemDate>
          </ListItem>
        ))}
      </ListContainer>
    </Container>
  );
};

export default BoardList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.gray};
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
  margin: 0;
`;

const SortBar = styled.div`
  height: 48px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 20px;
`;

const SortButton = styled.button`
  background: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SortText = styled.span`
  ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.gray2};
`;

const SortIcon = styled.img`
  margin-left: 8px;
  width: 12px;
  height: 6px;
`;

const DropDownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 15px;
  background-color: ${(props) => props.theme.colors.gray};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 10;
`;

const DropDownItem = styled.div`
  padding: 8px 8px;
  ${(props) => props.theme.fonts.regular};
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray3};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray2};
  }
`;

const ListContainer = styled.div`
  width: 100%;
`;

const ListItem = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 20px;
  padding-top: 24px;
  margin-bottom: 8px;
`;

const ItemTitle = styled.h2`
  ${(props) => props.theme.fonts.semiBold};
  margin-bottom: 8px;
`;

const ItemContent = styled.p`
  ${(props) => props.theme.fonts.regular};
  font-size: 14px;
  color: ${(props) => props.theme.colors.black2};
  margin-bottom: 27px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemDate = styled.p`
  ${(props) => props.theme.fonts.regular};
  font-size: 14px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.gray2};
`;
