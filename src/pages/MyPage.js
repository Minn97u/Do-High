import React, { useState, useEffect } from "react";
import styled from "styled-components";
import backBtn from "../assets/backBtn.svg";
import profile from "../assets/profile.svg";
import plus from "../assets/plus.svg";
import check from "../assets/check.svg";
import dropdownArrow from "../assets/dropdown.svg";
import { useNavigate } from "react-router-dom";
import {
  getMemberInfo,
  getAvailableProfiles,
  updateSelectedProfile,
} from "../api/UserApi";

const MyPage = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [availableProfiles, setAvailableProfiles] = useState([]);
  const [memberInfo, setMemberInfo] = useState(null);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const data = await getMemberInfo();
        setMemberInfo(data.success);
        setSelectedCharacter(data.success.character || null);
      } catch (error) {
        console.error("멤버 정보 불러오기 오류:", error.message);
      }
    };
    fetchMemberInfo();
  }, []);

  useEffect(() => {
    const fetchAvailableProfiles = async () => {
      try {
        const data = await getAvailableProfiles();
        setAvailableProfiles(data.success || []);
      } catch (error) {
        console.error("프로필 목록 불러오기 오류:", error.message);
      }
    };
    fetchAvailableProfiles();
  }, []);

  const handleEditButtonClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleCharacterSelect = (url) => {
    setSelectedCharacter(url);
  };

  const handleSaveProfile = async () => {
    if (!selectedCharacter) {
      alert("선택된 프로필 이미지가 없습니다.");
      return;
    }

    try {
      await updateSelectedProfile(selectedCharacter);
      setPopupVisible(false);

      const updatedMemberInfo = await getMemberInfo();
      setMemberInfo(updatedMemberInfo.success);
      setSelectedCharacter(updatedMemberInfo.success.character || profile);
    } catch (error) {
      console.error("프로필 저장 오류:", error.message);
      alert("프로필 저장에 실패했습니다.");
    }
  };

  const handlePasswordChange = () => {
    navigate("/mypage/pwchange");
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>내 정보 수정</Title>
      </Header>
      <Content>
        <ProfileImageWrapper>
          <ProfileImage src={memberInfo?.character || profile} alt="profile" />
          <EditButton onClick={handleEditButtonClick}>
            <img src={plus} alt="plus" />
          </EditButton>
        </ProfileImageWrapper>
        <InfoList>
          <InfoItem>
            <Label>이름</Label>
            <Value>{memberInfo?.name}</Value>
          </InfoItem>
          <InfoItem>
            <Label>소속</Label>
            <Value>{memberInfo?.team}</Value>
          </InfoItem>
          <InfoItem>
            <Label>사번</Label>
            <Value>{memberInfo?.identificationNumber}</Value>
          </InfoItem>
          <InfoItem>
            <Label>레벨</Label>
            <Value>{memberInfo?.level}</Value>
          </InfoItem>
          <InfoItem>
            <Label>입사일</Label>
            <Value>{memberInfo?.effectiveDate}</Value>
          </InfoItem>
          <ChangePassword onClick={handlePasswordChange}>
            비밀번호 변경
            <Arrow src={dropdownArrow} alt="arrow" />
          </ChangePassword>
        </InfoList>
      </Content>
      {isPopupVisible && (
        <PopupOverlay onClick={handleClosePopup}>
          <Popup onClick={(e) => e.stopPropagation()}>
            <Divider />
            <PopupTitle>캐릭터 선택</PopupTitle>
            <CharacterGrid>
              {availableProfiles.map((url, index) => (
                <CharacterWrapper
                  key={index}
                  onClick={() => handleCharacterSelect(url)}
                >
                  <CharacterImageWrapper>
                    <CharacterImage
                      src={url}
                      alt={`character-${index}`}
                      isSelected={selectedCharacter === url}
                    />
                    {selectedCharacter === url && (
                      <CheckMark>
                        <img src={check} alt="check" />
                      </CheckMark>
                    )}
                  </CharacterImageWrapper>
                </CharacterWrapper>
              ))}
            </CharacterGrid>
            <SaveButton onClick={handleSaveProfile}>저장하기</SaveButton>{" "}
          </Popup>
        </PopupOverlay>
      )}
    </Container>
  );
};

export default MyPage;

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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  margin-top: 20px;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 104px;
  height: 104px;
  margin-right: 7px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.mainC};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 4px ${(props) => props.theme.colors.gray};

  img {
    width: 12px;
    height: 12px;
  }
`;

const InfoList = styled.div`
  width: 100%;
  margin-top: 60px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: none;
  border: 1px solid #e6e7e8;
  border-radius: 10px;
  margin-bottom: 20px;
  height: 60px;
`;

const Label = styled.div`
  ${(props) => props.theme.fonts.semiBold};
`;

const Value = styled.div`
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray2};
`;

const ChangePassword = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: ${(props) => props.theme.colors.gray};
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: 10px;
  margin-top: 20px;
  font-size: 16px;
  color: #333333;
  cursor: pointer;
`;

const Arrow = styled.img`
  width: 14px;
  height: 14px;
  transform: rotate(-90deg);
  color: ${(props) => props.theme.colors.gray2};
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: end;
`;

const Popup = styled.div`
  background: ${(props) => props.theme.colors.white};
  width: 100%;
  padding: 0 20px;
  border-radius: 20px 20px 0 0;
  height: 570px;
`;

const Divider = styled.div`
  width: 37.5px;
  height: 4px;
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: 3px;
  margin: auto;
  margin-top: 9px;
  margin-bottom: 31px;
`;

const PopupTitle = styled.h2`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  text-align: center;
  margin-bottom: 40px;
`;

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 45px;
`;

const CharacterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CharacterImageWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  outline: ${(props) => (props.isSelected ? "3px solid #FF6B6B" : "none")};
`;

const CheckMark = styled.div`
  position: absolute;
  bottom: 2px;
  right: -7px;
  background: ${(props) => props.theme.colors.mainC};
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 14px;
    height: 10px;
  }
`;
const SaveButton = styled.button`
  width: 100%;
  background: ${(props) => props.theme.colors.btn};
  ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.white};
  padding: 14px;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
`;
