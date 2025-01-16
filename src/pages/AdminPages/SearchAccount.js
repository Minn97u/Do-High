import React, { useState, useEffect } from "react";
import styled from "styled-components";
import backBtn from "../../assets/backBtn.svg";
import searchIcon from "../../assets/search.svg";
import dropdownArrow from "../../assets/dropdown.svg";
import { useNavigate } from "react-router-dom";
import {
  fetchTeamList,
  searchMembers,
  searchMembersByTeam,
} from "../../api/AdminApi";

const SearchAccount = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAffiliation, setSelectedAffiliation] = useState("");
  const [displayResults, setDisplayResults] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetchTeamList();
        if (response.responseType === "SUCCESS") {
          setTeamList(response.success);
        } else {
          console.error("소속 목록 조회 실패:", response.error.message);
        }
      } catch (error) {
        console.error("소속 목록 조회 중 오류 발생:", error);
      }
    };
    fetchTeams();
  }, []);

  const handleSearchQuery = async () => {
    if (!searchQuery.trim()) {
      setDisplayResults([]);
      setHasError(true);
      return;
    }
    setHasError(false);
    try {
      const response = await searchMembers(searchQuery.trim());
      if (response.responseType === "SUCCESS") {
        setDisplayResults(response.success);
      } else {
        console.error("검색 실패:", response.error.message);
        setDisplayResults([]);
      }
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setDisplayResults([]);
    }
  };

  const handleAffiliationSelect = async (team) => {
    setSelectedAffiliation(team);
    setIsDropdownOpen(false);
    try {
      const response = await searchMembersByTeam(team);
      if (response.responseType === "SUCCESS") {
        setDisplayResults(response.success);
      } else {
        console.error("팀별 구성원 검색 실패:", response.error.message);
        setDisplayResults([]);
      }
    } catch (error) {
      console.error("팀별 구성원 검색 중 오류 발생:", error);
      setDisplayResults([]);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/admin")}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>기존 계정 설정</Title>
      </Header>
      <Content>
        <InputContainer>
          <SearchBar hasError={hasError} isFocused={isFocused}>
            <SearchInput
              type="text"
              placeholder="구성원의 이름이나 사번을 입력하세요"
              value={searchQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton onClick={handleSearchQuery}>
              <img src={searchIcon} alt="검색" />
            </SearchButton>
          </SearchBar>
          {hasError && <ErrorMessage>검색어를 입력해주세요.</ErrorMessage>}
        </InputContainer>

        <InputContainer>
          <DropdownContainer>
            <DropdownHeader
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              isOpen={isDropdownOpen}
              hasSelected={!!selectedAffiliation}
            >
              {selectedAffiliation || "소속 선택"}
              <DropdownArrow src={dropdownArrow} alt="드롭다운 화살표" />
            </DropdownHeader>
            {isDropdownOpen && (
              <DropdownList>
                {teamList.map((team, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => handleAffiliationSelect(team)}
                  >
                    {team}
                  </DropdownItem>
                ))}
              </DropdownList>
            )}
          </DropdownContainer>
        </InputContainer>

        <ResultsContainer>
          {displayResults.length > 0 && (
            <>
              <ResultsLabel>검색 결과</ResultsLabel>
              <ResultsList>
                {displayResults.map((result) => (
                  <ResultItem
                    key={result.memberId}
                    onClick={() =>
                      navigate(`/admin/manage/${result.identificationNumber}`)
                    }
                  >
                    <Name>{result.name}</Name>
                    <Details>{result.team}</Details>
                    <Details>{result.identificationNumber}</Details>
                    <ArrowIcon src={dropdownArrow} alt="화살표" />
                  </ResultItem>
                ))}
              </ResultsList>
            </>
          )}
        </ResultsContainer>
      </Content>
    </Container>
  );
};

export default SearchAccount;

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
  cursor: pointer;
  position: absolute;
  left: 20px;
`;

const Title = styled.h1`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  text-align: center;
  flex: 1;
`;

const Content = styled.div`
  padding: 20px;
  flex: 1;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  padding: 14px 8px 14px 14px;
  height: 48px;
  border: 2px solid
    ${(props) =>
      props.hasError
        ? "#FF4500"
        : props.isFocused
        ? props.theme.colors.mainC
        : "transparent"};
`;

const SearchInput = styled.input`
  flex: 1;
  background: none;
  ${(props) => props.theme.fonts.medium};
  font-size: 14px;
  outline: none;

  ::placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }
  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }
`;

const SearchButton = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.mainC};
  font-size: 12px;
  margin-top: 6px;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownHeader = styled.div`
  padding: 14px;
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  color: ${(props) =>
    props.hasSelected ? props.theme.colors.black3 : props.theme.colors.gray2};
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: 2px solid
    ${(props) => (props.isOpen ? props.theme.colors.mainC : "transparent")};
`;

const DropdownArrow = styled.img`
  width: 14px;
  height: 14px;
  color: ${(props) => props.theme.colors.gray3};
`;

const DropdownList = styled.ul`
  height: 240px;
  max-height: 240px;
  overflow-y: auto;
  position: absolute;
  padding: 10px 12px;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.gray2};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.gray};
  }
`;

const DropdownItem = styled.li`
  padding: 14px;
  border-radius: 10px;
  ${(props) => props.theme.fonts.medium};
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.gray2};
  text-align: center;
  &:hover {
    background-color: #efeff1;
    color: ${(props) => props.theme.colors.black3};
  }
`;

const ResultsContainer = styled.div`
  margin-top: 58px;
`;

const ResultsLabel = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray2};
  margin-bottom: 10px;
`;

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 23px 14px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  border: solid 1px #eeeeee;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray};
  }
`;

const ArrowIcon = styled.img`
  width: 12px;
  height: 12px;
  color: ${(props) => props.theme.colors.gray2};
  transform: rotate(-90deg);
`;

const Name = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 16px;
  flex: 1;
`;

const Details = styled.div`
  ${(props) => props.theme.fonts.medium};
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray2};
  text-align: right;

  &:not(:last-child) {
    margin-right: 15px;
  }
`;
