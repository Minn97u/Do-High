import React, { useState } from "react";
import styled from "styled-components";
import profile from "../assets/profile.svg";
import plus from "../assets/plus.svg";

const ProfileCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [1, 2, 3];

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Container>
      <ProfileCardContainer>
        <ProfileHeader>
          <ProfileInfo>
            <div>
              <h3>허재민</h3>
              <p>LV. F1-I</p>
            </div>
            <p>음성 2센터</p>
            <p>2022080101</p>
          </ProfileInfo>
          <ProfileImageWrapper>
            <ProfileImage src={profile} alt="profile" />
            <EditButton>
              <img src={plus} alt="plus" />
            </EditButton>
          </ProfileImageWrapper>
        </ProfileHeader>
        <ExperienceSection>
          <h4>총 누적 경험치</h4>
          <ExperienceValue>10,500</ExperienceValue>
          <ProgressBar>
            <Progress />
          </ProgressBar>
          <p>다음 F1-II 레벨까지 3,000 남음</p>
        </ExperienceSection>
      </ProfileCardContainer>
      <Carousel>
        {slides.map((_, index) => (
          <Dot
            key={index}
            active={index === currentSlide}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </Carousel>
    </Container>
  );
};

export default ProfileCard;

const Container = styled.div``;

const ProfileCardContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  margin: 16px;
  padding: 24px;
  border-radius: 20px;
  margin-bottom: 13px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 43px;
`;

const ProfileInfo = styled.div`
  margin-left: 5px;
  h3 {
    ${(props) => props.theme.fonts.bold};
  }
  div {
    margin-bottom: 17px;
    p {
      color: ${(props) => props.theme.colors.black3};
    }
  }

  p {
    font-size: 14px;
    color: ${(props) => props.theme.colors.gray2};
    ${(props) => props.theme.fonts.Nanum};
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 104px;
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

const ExperienceSection = styled.div`
  text-align: left;

  h4 {
    ${(props) => props.theme.fonts.bold};
    font-size: 14px;
    color: #5f5f5f;
    margin-left: 2px;
  }

  p {
    ${(props) => props.theme.fonts.Nanum};
    font-weight: 300;
    font-size: 14px;
    margin-top: 6px;
    color: ${(props) => props.theme.colors.gray3};
  }
`;

const ExperienceValue = styled.div`
  font-size: 32px;
  ${(props) => props.theme.fonts.Nanum};
  font-weight: 800;
  color: ${(props) => props.theme.colors.mainC};
  margin-left: 1px;
`;

const ProgressBar = styled.div`
  background-color: #eaeaea;
  border-radius: 20px;
  height: 14px;
  margin-top: 10px;
  position: relative;
`;

const Progress = styled.div`
  width: 70%;
  background-color: ${(props) => props.theme.colors.mainC};
  height: 100%;
  border-radius: 20px;
`;

const Carousel = styled.div`
  width: 64px;
  height: 24px;
  border-radius: 50px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 36px;
  background-color: #eaebec;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background-color: ${(props) =>
    props.active ? "#0D0D0D" : props.theme.colors.gray2};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
`;
