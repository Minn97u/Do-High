import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { getPosts } from "../api/BoardApi";
import backBtn from "../assets/backBtn.svg";
import dropdownArrow from "../assets/dropdown.svg";
import writeIcon from "../assets/write.svg";
import { useNavigate } from "react-router-dom";

const BoardList = () => {
  const navigate = useNavigate();

  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("최신순");

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const size = 10;
  const [totalPages, setTotalPages] = useState(1);
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const observerTarget = useRef(null);

  // 정렬 옵션을 "createdAt,DESC" or "createdAt,ASC"로 변환
  const getSortParam = () =>
    sortOption === "최신순" ? "createdAt,DESC" : "createdAt,ASC";

  // 게시글 목록 불러오기 (page 증가 시마다 호출)
  const fetchPosts = useCallback(
    async (pageNum) => {
      try {
        const sortParam = getSortParam();
        const data = await getPosts(pageNum, size, sortParam);
        // data: { totalPostCount, totalPages, currentPage, posts: [...] }

        // 기존 목록 + 새로 불러온 목록 누적
        setPosts((prev) => [...prev, ...data.posts]);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("게시글 조회 실패:", error.message);
      }
    },
    [sortOption]
  );

  // 초기 로드 + sort 변경 시 page=1부터 다시 불러오기
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setTotalPages(1);
  }, [sortOption]);

  // page 변경 시 fetchPosts 호출
  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  // Intersection Observer 로 마지막 요소 관찰
  // 마지막 요소가 보이면 page+1 (다음 페이지) 요청
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, []);

  // 페이지가 totalPages를 초과하면 더 이상 요청 X
  useEffect(() => {
    if (page > totalPages) {
      // observerTarget disconnect or unobserve
      // 혹은 observerTarget.current를 숨겨도 됨
    }
  }, [page, totalPages]);

  const handleSortClick = () => {
    setSortOpen((prev) => !prev);
  };

  const handleSortSelect = (option) => {
    setSortOption(option);
    setSortOpen(false);
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format("YYYY.MM.DD. HH:mm");
  };

  return (
    <Container isAdmin={isAdmin}>
      <HeaderAndSortWrapper>
        <Header>
          <Title>게시글 목록</Title>
          {isAdmin && (
            <BackButton onClick={() => navigate("/admin")}>
              <img src={backBtn} alt="뒤로가기" />
            </BackButton>
          )}
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
      </HeaderAndSortWrapper>

      <ListContainer>
        {posts.map((post, idx) => (
          <ListItem
            key={post.id + "-" + idx}
            onClick={() => navigate(`/boardList/${post.id}`)}
          >
            <ItemTitle>{post.title}</ItemTitle>
            <ItemContent>{post.content}</ItemContent>
            <ItemDate>작성일 {formatDate(post.createdAt)}</ItemDate>
          </ListItem>
        ))}
        {page <= totalPages && <ObserverTarget ref={observerTarget} />}
      </ListContainer>

      {isAdmin && (
        <WriteButton onClick={() => navigate("/boardPost")}>
          <img src={writeIcon} alt="게시글 작성" />
        </WriteButton>
      )}
    </Container>
  );
};

export default BoardList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${(props) => (props.isAdmin ? "100vh" : "93vh")};
  background-color: ${(props) => props.theme.colors.gray};
`;

const HeaderAndSortWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: ${(props) => props.theme.colors.gray};
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
  margin: 0;
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
  right: 10px;
  background-color: ${(props) => props.theme.colors.gray};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 10;
  padding: 8px 0;
`;

const DropDownItem = styled.div`
  padding: 12px 14px;
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
  flex: 1;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const ListItem = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 20px;
  padding-top: 24px;
  margin-bottom: 8px;
  cursor: pointer;
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
  font-size: 12px;
  color: ${(props) => props.theme.colors.gray2};
`;

const WriteButton = styled.button`
  position: fixed;
  bottom: 60px;
  right: 20px;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.mainC};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 31px;
    height: 31px;
  }
`;

const ObserverTarget = styled.div`
  width: 100%;
  height: 30px;
`;