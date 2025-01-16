import React, { useState, useEffect } from "react";
import styled from "styled-components";
import backBtn from "../../assets/backBtn.svg";
import profile from "../../assets/profile.svg";
import dropdownArrow from "../../assets/dropdown.svg";
import { useNavigate, useParams } from "react-router-dom";
import { searchMembers } from "../../api/AdminApi";

const ManageAccount = () => {
  const navigate = useNavigate();
  const { number } = useParams();
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await searchMembers(number);
        if (response.responseType === "SUCCESS") {
          setAccountDetails(response.success[0]);
        } else {
          console.error("구성원 정보 검색 실패:", response.error.message);
        }
      } catch (error) {
        console.error("구성원 정보 검색 중 오류 발생:", error);
      }
    };

    fetchAccountDetails();
  }, [number]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (!accountDetails) {
    return <div>로딩 중...</div>;
  }

  const {
    memberId,
    name,
    team,
    identificationNumber,
    jobType,
    effectiveDate,
    character,
  } = accountDetails;

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/admin/search")}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>구성원 정보 설정</Title>
      </Header>
      <Content>
        <ProfileImageWrapper>
          <ProfileImage src={character || profile} alt="Profile" />
        </ProfileImageWrapper>
        <InfoList>
          <InfoItem
            onClick={() => handleNavigation(`/admin/manage/name/${memberId}`)}
          >
            <Label>이름</Label>
            <ValueWrapper>
              <Value>{name}</Value>
              <Arrow src={dropdownArrow} alt="arrow" />
            </ValueWrapper>
          </InfoItem>
          <InfoItem
            onClick={() =>
              handleNavigation(`/admin/manage/workplace/${memberId}`)
            }
          >
            <Label>소속</Label>
            <ValueWrapper>
              <Value>{team}</Value>
              <Arrow src={dropdownArrow} alt="arrow" />
            </ValueWrapper>
          </InfoItem>
          <InfoItem
            onClick={() => handleNavigation(`/admin/manage/level/${memberId}`)}
          >
            <Label>직군</Label>
            <ValueWrapper>
              <Value>{jobType || "N/A"}</Value>
              <Arrow src={dropdownArrow} alt="arrow" />
            </ValueWrapper>
          </InfoItem>
          <InfoItem
            onClick={() => handleNavigation(`/admin/manage/number/${memberId}`)}
          >
            <Label>사번</Label>
            <ValueWrapper>
              <Value>{identificationNumber}</Value>
              <Arrow src={dropdownArrow} alt="arrow" />
            </ValueWrapper>
          </InfoItem>

          <InfoItem
            onClick={() => handleNavigation(`/admin/manage/date/${memberId}`)}
          >
            <Label>입사일</Label>
            <ValueWrapper>
              <Value>
                {effectiveDate ? effectiveDate.slice(0, 10) : "N/A"}
              </Value>
              <Arrow src={dropdownArrow} alt="arrow" />
            </ValueWrapper>
          </InfoItem>
          <InfoItem
            onClick={() =>
              handleNavigation(`/admin/manage/account/${memberId}`)
            }
          >
            <Label>비밀번호 변경</Label>
            <ValueWrapper>
              <Arrow src={dropdownArrow} alt="arrow" />
            </ValueWrapper>
          </InfoItem>
        </InfoList>
      </Content>
    </Container>
  );
};

export default ManageAccount;

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

const Title = styled.h1`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  text-align: center;
  flex: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  margin-top: 20px;
`;

const ProfileImageWrapper = styled.div`
  width: 104px;
  height: 104px;
  margin-bottom: 60px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const InfoList = styled.div`
  width: 100%;
  max-width: 400px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 20px;
  border: 1px solid #ececec;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const Label = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 16px;
`;

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Value = styled.div`
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray2};
  margin-right: 13px;
`;

const Arrow = styled.img`
  width: 14px;
  height: 14px;
  transform: rotate(-90deg);
  color: ${(props) => props.theme.colors.gray2};
`;
