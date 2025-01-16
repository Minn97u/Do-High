import React, { useState } from "react";
import styled from "styled-components";
import backBtn from "../../../assets/backBtn.svg";
import calendar from "../../../assets/calendar.svg";
import CalendarComponent from "../../../components/Calendar";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../api/Axios";

const ManageDate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("0000-00-00");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isButtonDisabled = selectedDate === "0000-00-00" || isSubmitting;

  const updateDate = async () => {
    try {
      setIsSubmitting(true);
      const response = await Axios.post(`/admin/mod/date`, {
        memberId: id,
        date: selectedDate,
      });

      if (response.data.responseType === "SUCCESS") {
        alert("입사일이 성공적으로 변경되었습니다.");
        navigate(-1);
      } else {
        alert(`입사일 변경 실패: ${response.data.error.message}`);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message ||
        "입사일 변경 중 오류가 발생했습니다.";
      console.error("입사일 변경 중 오류 발생:", errorMessage);
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (!isButtonDisabled) {
      updateDate();
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>입사일 변경</Title>
      </Header>
      <Content>
        <InputContainer>
          <Label>변경할 입사일을 선택해주세요</Label>
          <DropdownContainer>
            <DropdownHeader
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              isOpen={isCalendarOpen}
              hasValue={selectedDate !== "0000-00-00"}
            >
              {selectedDate !== "0000-00-00" ? selectedDate : "입사일 선택"}
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

export default ManageDate;

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
    props.hasValue ? props.theme.colors.black3 : props.theme.colors.gray2};
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: 2px solid
    ${(props) => (props.isOpen ? props.theme.colors.mainC : "transparent")};
`;

const CalendarIcon = styled.img`
  width: 28px;
  height: 28px;
  margin-left: 10px;
  color: ${(props) => props.theme.colors.gray3};
`;

const SubmitButton = styled.button`
  width: 100%;
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
