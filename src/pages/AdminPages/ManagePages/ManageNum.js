import React, { useState } from "react";
import styled from "styled-components";
import backBtn from "../../../assets/backBtn.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../api/Axios";

const ManageNum = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isButtonDisabled =
    employeeNumber.length !== 10 || hasError || isSubmitting;

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setEmployeeNumber(value);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  const errorMessage =
    hasError || (employeeNumber.length > 0 && employeeNumber.length !== 10)
      ? "입사일(8자리)+입사번호(2자리)로 입력해주세요"
      : "";

  const updateEmployeeNumber = async () => {
    try {
      setIsSubmitting(true);
      const response = await Axios.post(`/admin/mod/num`, {
        memberId: id,
        number: employeeNumber.trim(),
      });

      if (response.data.responseType === "SUCCESS") {
        alert("사번이 성공적으로 변경되었습니다.");
        navigate(`/admin/manage/${employeeNumber.trim()}`);
      } else {
        alert(`사번 변경 실패: ${response.data.error.message}`);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message ||
        "사번 변경 중 오류가 발생했습니다.";
      console.error("사번 변경 중 오류 발생:", errorMessage);
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (!isButtonDisabled) {
      updateEmployeeNumber();
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>사번 변경</Title>
      </Header>
      <Content>
        <InputContainer>
          <Label>변경할 사번을 입력해주세요</Label>
          <Input
            type="text"
            placeholder="입사일(8자리)+입사번호(2자리)"
            value={employeeNumber}
            onChange={handleInputChange}
            maxLength={10}
            hasError={
              hasError ||
              (employeeNumber.length > 0 && employeeNumber.length !== 10)
            }
            hasValue={employeeNumber.length > 0}
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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

export default ManageNum;

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

const Input = styled.input`
  width: 100%;
  padding: 14px;
  ${(props) => props.theme.fonts.medium};
  font-size: 14px;
  background-color: ${(props) =>
    props.hasError ? "#FFEEEB" : props.theme.colors.gray};
  border-radius: 10px;
  border: ${(props) =>
    props.hasError ? "2px solid #FF4500" : "2px solid transparent"};
  outline: none;
  color: ${(props) =>
    props.hasValue ? props.theme.colors.black3 : props.theme.colors.gray2};

  ::placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }
  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }
  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.mainC};
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.mainC};
  font-size: 12px;
  margin-top: 6px;
  margin-left: 4px;
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
