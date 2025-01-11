import React, { useState } from "react";
import styled from "styled-components";
import backBtn from "../../assets/backBtn.svg";
import searchIcon from "../../assets/search.svg";
import dropdownArrow from "../../assets/dropdown.svg";
import { useNavigate } from "react-router-dom";

const SearchAccount = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAffiliation, setSelectedAffiliation] = useState("");
  const [searchResults, setSearchResults] = useState([
    { name: "허재민", affiliation: "음성 2센터", id: "2022080101" },
    { name: "허재식", affiliation: "음성 1센터", id: "2021010130" },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const dummyData = [
    { name: "허재민", affiliation: "음성 2센터", id: "2022080101" },
    { name: "허재식", affiliation: "음성 1센터", id: "2021010130" },
    { name: "허재용", affiliation: "용인백암센터", id: "2018060108" },
    { name: "허재진", affiliation: "사업기획팀", id: "2023020209" },
  ];

  const handleSearch = () => {
    if (!searchQuery) {
      setHasError(true);
      setSearchResults([]);
    } else {
      setHasError(false);
      const results = dummyData.filter(
        (data) =>
          data.name.includes(searchQuery) || data.id.includes(searchQuery)
      );
      setSearchResults(results);
    }
  };

  const handleAffiliationSelect = (value) => {
    setSelectedAffiliation(value);
    setIsDropdownOpen(false);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/admin")}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>기존 계정 찾기</Title>
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
            <SearchButton onClick={handleSearch}>
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
                <DropdownItem
                  onClick={() => handleAffiliationSelect("음성 1센터")}
                >
                  음성 1센터
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleAffiliationSelect("음성 2센터")}
                >
                  음성 2센터
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleAffiliationSelect("용인백암센터")}
                >
                  용인백암센터
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleAffiliationSelect("사업기획팀")}
                >
                  사업기획팀
                </DropdownItem>
              </DropdownList>
            )}
          </DropdownContainer>
        </InputContainer>
        {searchResults.length > 0 && (
          <ResultsContainer>
            <ResultsLabel>구성원 목록</ResultsLabel>
            <ResultsList>
              {searchResults.map((result) => (
                <ResultItem
                  key={result.id}
                  onClick={() => navigate(`/admin/manage`)}
                  // onClick={() => navigate(`/admin/manage/${result.id}`)}
                >
                  <Name>{result.name}</Name>
                  <Details>{result.affiliation}</Details>
                  <Details>{result.id}</Details>
                  <ArrowIcon src={dropdownArrow} alt="화살표" />
                </ResultItem>
              ))}
            </ResultsList>
          </ResultsContainer>
        )}
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
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DropdownItem = styled.li`
  padding: 14px;
  ${(props) => props.theme.fonts.medium};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray};
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
