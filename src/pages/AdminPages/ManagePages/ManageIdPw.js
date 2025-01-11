import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import backBtn from "../../../assets/backBtn.svg";
import { useNavigate } from "react-router-dom";

const ManageIdPw = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const username = watch("username");

  const onSubmit = () => {
    navigate("/admin/manage");
  };

  const isUsernameValid = username && /^[a-zA-Z]+$/.test(username);

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/admin/manage")}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <Title>아이디, 비밀번호</Title>
      </Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Label>새로운 아이디를 입력해주세요</Label>
          <Input
            type="text"
            placeholder="영문 이름으로 입력"
            hasError={!!errors.username}
            {...register("username", {
              required: "아이디를 입력해주세요.",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "영문으로만 입력해주세요.",
              },
            })}
          />
          {errors.username ? (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          ) : (
            isUsernameValid && (
              <SuccessMessage>사용 가능한 아이디입니다.</SuccessMessage>
            )
          )}
        </InputContainer>

        <InputContainer>
          <Label>새로운 비밀번호를 입력해주세요</Label>
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="영문, 숫자 포함 8자 이상"
              hasError={!!errors.password}
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: "영문, 숫자 포함 8자 이상으로 입력해주세요.",
                },
              })}
            />
            <ToggleButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <IoEye /> : <IoEyeOff />}
            </ToggleButton>
          </PasswordContainer>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputContainer>

        <InputContainer>
          <Label>새로운 비밀번호를 확인해주세요</Label>
          <PasswordContainer>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호 확인"
              hasError={!!errors.confirmPassword}
              {...register("confirmPassword", {
                required: "비밀번호를 다시 입력해주세요.",
                validate: (value) =>
                  value === watch("password") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
            />
            <ToggleButton
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
            </ToggleButton>
          </PasswordContainer>
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </InputContainer>

        <SubmitButton type="submit" disabled={!isValid}>
          변경하기
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default ManageIdPw;

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
  margin-top: 70px;
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

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  ${(props) => props.theme.fonts.medium};
  padding: 14px;
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

const ToggleButton = styled.span`
  position: absolute;
  right: 10px;
  top: 57%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.gray2};
  font-size: 25px;
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.mainC};
  font-size: 12px;
  margin-top: 6px;
  margin-left: 4px;
`;

const SuccessMessage = styled.div`
  color: ${(props) => props.theme.colors.subBlue};
  font-size: 12px;
  margin-top: 6px;
  margin-left: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 14px;
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  border-radius: 50px;
  background: ${(props) =>
    props.disabled ? props.theme.colors.btnGray : props.theme.colors.btn};
  color: ${(props) => (props.disabled ? "#d3d3d5" : "#FFFFFF")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: auto;
  margin-bottom: 73px;
`;
