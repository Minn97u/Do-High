import React, { useState, useEffect } from "react";
import styled from "styled-components";
import backBtn from "../../../assets/backBtn.svg";
import dropdownArrow from "../../../assets/dropdown.svg";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTeamList } from "../../../api/AdminApi";
import { Axios } from "../../../api/Axios";

const ManageWorkplace = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAffiliation, setSelectedAffiliation] = useState("");
  const [hasSelected, setHasSelected] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleDropdownSelect = (value) => {
    setSelectedAffiliation(value);
    setHasSelected(true);
    setIsDropdownOpen(false);
  };

  const isButtonDisabled = !hasSelected || isSubmitting;

  const updateTeam = async () => {
    try {
      setIsSubmitting(true);
      const response = await Axios.post(`/admin/mod/team`, {
        memberId: id,
        team: selectedAffiliation,
      });

      if (response.data.responseType === "SUCCESS") {
        alert("소속이 성공적으로 변경되었습니다.");
        navigate(-1);
      } else {
        alert(`소속 변경 실패: ${response.data.error.message}`);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message ||
        "소속 변경 중 오류가 발생했습니다.";
      console.error("소속 변경 중 오류 발생:", errorMessage);
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (!isButtonDisabled) {
      updateTeam();
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>소속 변경</Title>
      </Header>
      <Content>
        <InputContainer>
          <Label>새로운 소속을 선택해주세요</Label>
          <DropdownContainer>
            <DropdownHeader
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              isOpen={isDropdownOpen}
              hasSelected={hasSelected}
            >
              {selectedAffiliation || "소속 선택"}
              <DropdownArrow src={dropdownArrow} isOpen={isDropdownOpen} />
            </DropdownHeader>
            {isDropdownOpen && (
              <DropdownList>
                {teamList.map((team, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => handleDropdownSelect(team)}
                  >
                    {team}
                  </DropdownItem>
                ))}
              </DropdownList>
            )}
          </DropdownContainer>
        </InputContainer>
      </Content>
      <SubmitButton
        type="button"
        disabled={isButtonDisabled}
        onClick={handleSubmit}
      >
        변경하기
      </SubmitButton>
    </Container>
  );
};

export default ManageWorkplace;

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
  margin-top: 50px;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Label = styled.div`
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray2};
  margin-bottom: 6px;
  margin-left: 4px;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div`
  padding: 14px;
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  color: ${(props) =>
    props.hasSelected ? props.theme.colors.black3 : props.theme.colors.gray2};
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: 10px;
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
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(360deg)")};
  transition: transform 0.2s ease-in-out;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.gray};
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
  padding: 16px;
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  text-align: center;
  color: ${(props) => props.theme.colors.gray2};
  cursor: pointer;
  &:hover {
    background-color: #efeff1;
    color: ${(props) => props.theme.colors.black3};
  }
`;

const SubmitButton = styled.button`
  width: 90%;
  margin: auto;
  padding: 14px;
  max-width: 400px;
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  border-radius: 50px;
  background: ${(props) =>
    props.disabled ? props.theme.colors.btnGray : props.theme.colors.mainC};
  color: ${(props) => (props.disabled ? "#d3d3d5" : "#FFFFFF")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: auto;
  margin-bottom: 73px;
`;
