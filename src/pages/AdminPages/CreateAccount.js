import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import backBtn from "../../assets/backBtn.svg";
import dropdownArrow from "../../assets/dropdown.svg";
import calendar from "../../assets/calendar.svg";
import CalendarComponent from "../../components/Calendar";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAffiliation, setSelectedAffiliation] =
    useState("소속을 선택해주세요");
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("레벨을 선택해주세요");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("0000-00-00");

  const handleDropdownSelect = (value) => {
    setSelectedAffiliation(value);
    setIsDropdownOpen(false);
  };

  const handleLevelDropdownSelect = (value) => {
    setSelectedLevel(value);
    setIsLevelDropdownOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    navigate("/admin/create-next");
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>계정 생성</Title>
      </Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Label>이름</Label>
          <Input
            type="text"
            placeholder="이름을 입력해주세요"
            hasError={!!errors.name}
            {...register("name", { required: "이름을 입력해주세요." })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </InputContainer>

        <InputContainer>
          <Label>소속</Label>
          <DropdownContainer>
            <DropdownHeader
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              hasError={!!errors.affiliation}
              isOpen={isDropdownOpen}
              selectedAffiliation={selectedAffiliation}
            >
              {selectedAffiliation}
              <DropdownArrow src={dropdownArrow} isOpen={isDropdownOpen} />
            </DropdownHeader>
            {isDropdownOpen && (
              <DropdownList>
                <DropdownItem
                  onClick={() => handleDropdownSelect("음성 1센터")}
                >
                  음성 1센터
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleDropdownSelect("음성 2센터")}
                >
                  음성 2센터
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleDropdownSelect("용인백암센터")}
                >
                  용인백암센터
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleDropdownSelect("남양주센터")}
                >
                  남양주센터
                </DropdownItem>
              </DropdownList>
            )}
          </DropdownContainer>
          {selectedAffiliation === "소속을 선택해주세요" &&
            errors.affiliation && (
              <ErrorMessage>{errors.affiliation.message}</ErrorMessage>
            )}
        </InputContainer>

        <InputContainer>
          <Label>사번</Label>
          <Input
            type="text"
            placeholder="입사일(8자리)+입사번호(2자리)"
            hasError={!!errors.employeeNumber}
            {...register("employeeNumber", {
              required: "사번을 입력해주세요.",
              pattern: {
                value: /^\d{8}\d{2}$/,
                message: "사번은 입사일(8자리)과 번호(2자리)로 입력해주세요.",
              },
            })}
          />
          {errors.employeeNumber && (
            <ErrorMessage>{errors.employeeNumber.message}</ErrorMessage>
          )}
        </InputContainer>

        <InputContainer>
          <Label>레벨</Label>
          <DropdownContainer>
            <DropdownHeader
              onClick={() => setIsLevelDropdownOpen(!isLevelDropdownOpen)}
              isOpen={isLevelDropdownOpen}
              selectedAffiliation={selectedLevel}
              selectedLevel={selectedLevel}
            >
              {selectedLevel}
              <DropdownArrow src={dropdownArrow} isOpen={isLevelDropdownOpen} />
            </DropdownHeader>
            {isLevelDropdownOpen && (
              <DropdownList>
                <DropdownItem
                  onClick={() => handleLevelDropdownSelect("레벨 1")}
                >
                  레벨 1
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleLevelDropdownSelect("레벨 2")}
                >
                  레벨 2
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleLevelDropdownSelect("레벨 3")}
                >
                  레벨 3
                </DropdownItem>
              </DropdownList>
            )}
          </DropdownContainer>
          {selectedLevel === "레벨을 선택해주세요" && errors.level && (
            <ErrorMessage>{errors.level.message}</ErrorMessage>
          )}
        </InputContainer>

        <InputContainer>
          <Label>입사일</Label>
          <DropdownContainer>
            <DropdownHeader
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              isOpen={isCalendarOpen}
              selectedDate={selectedDate}
            >
              {selectedDate}
              <CalendarIcon src={calendar} alt="달력" />
            </DropdownHeader>
            {isCalendarOpen && (
              <CalendarComponent
                selectedDate={selectedDate}
                setSelectedDate={(date) => {
                  setSelectedDate(date);
                  setIsCalendarOpen(false);
                }}
              />
            )}
          </DropdownContainer>
        </InputContainer>

        <SubmitButton type="submit" disabled={!isValid}>
          다음
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default CreateAccount;

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

const Form = styled.form`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  gap: 24px;
  flex: 1;
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

const Input = styled.input`
  width: 100%;
  padding: 14px;
  ${(props) => props.theme.fonts.medium};
  font-size: 14px;
  background-color: ${(props) =>
    props.hasError ? "#FFEEEB" : props.theme.colors.gray};
  border-radius: 10px;

  ::placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }
  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }
  &:focus {
    outline-color: ${(props) => props.theme.colors.mainC};
    outline-width: 1px;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div`
  padding: 14px;
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  color: ${(props) => {
    if (props.selectedDate === "0000-00-00") {
      return props.theme.colors.gray2;
    } else if (
      (props.selectedAffiliation !== "소속을 선택해주세요" &&
        props.selectedLevel === undefined) ||
      (props.selectedLevel !== "레벨을 선택해주세요" &&
        props.selectedAffiliation === undefined) ||
      (props.selectedAffiliation !== "소속을 선택해주세요" &&
        props.selectedLevel !== "레벨을 선택해주세요")
    ) {
      return props.theme.colors.black3;
    } else {
      return props.theme.colors.gray2;
    }
  }};
  background-color: ${(props) =>
    props.hasError ? "#FFEEEB" : props.theme.colors.gray};
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

const CalendarIcon = styled.img`
  width: 28px;
  height: 28px;
  margin-left: 10px;
  color: ${(props) => props.theme.colors.gray3};
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.mainC};
  font-size: 12px;
  margin-top: 6px;
  margin-left: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
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
