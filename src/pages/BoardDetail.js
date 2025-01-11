import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backBtn from "../assets/backBtn.svg";

const BoardDetail = () => {
  const navigate = useNavigate();

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

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>게시글 상세</HeaderTitle>
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
