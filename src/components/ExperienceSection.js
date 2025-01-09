import React from "react";
import styled from "styled-components";

const ExperienceSection = () => {
  const experiences = Array(12).fill({
    label: "TF 880",
    date: "24.01.21",
    isNew: true,
  });

  return (
    <ExperienceSectionContainer>
      <SectionTitle>최근에 이런 경험치를 얻으셨어요!</SectionTitle>
      <RecentExperience>
        <ExperienceCard>
          <CardContent>
            <ExperienceInfo>최근 수령한 경험치</ExperienceInfo>
            <ExperienceInfo>인사평가</ExperienceInfo>
          </CardContent>
          <CardContent>
            <ExperienceValue>+1,500</ExperienceValue>
            <ExperienceDate>2025.01.02</ExperienceDate>
          </CardContent>
        </ExperienceCard>
      </RecentExperience>
      <SectionTitle2>재민님이 쌓으신 총 누적 기록 보고가세요~</SectionTitle2>
      <ExperienceGrid>
        {experiences.map((exp, index) => (
          <ExperienceItem key={index}>
            {exp.isNew && <NewBadge>NEW</NewBadge>}
            <ExperienceLabel>{exp.label}</ExperienceLabel>
            <ExperienceDate>{exp.date}</ExperienceDate>
          </ExperienceItem>
        ))}
      </ExperienceGrid>
    </ExperienceSectionContainer>
  );
};

export default ExperienceSection;

const ExperienceSectionContainer = styled.div`
  margin: 16px;
`;

const RecentExperience = styled.div`
  margin-bottom: 61px;
`;

const SectionTitle = styled.h4`
  font-size: 18px;
  ${(props) => props.theme.fonts.bold};
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.black3};
`;

const SectionTitle2 = styled.h4`
  ${(props) => props.theme.fonts.bold};
  margin-bottom: 29px;
  color: ${(props) => props.theme.colors.black2};
`;

const ExperienceCard = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 9px;
  height: 94px;
  padding: 21px 24px;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ExperienceValue = styled.div`
  ${(props) => props.theme.fonts.Nanum};
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.mainC};
`;

const ExperienceInfo = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
`;

const ExperienceDate = styled.div`
  ${(props) => props.theme.fonts.Nanum};
  font-size: 14px;
  margin-top: 3px;
`;

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
`;

const ExperienceItem = styled.div`
  background-color: #ff7f50;
  color: #fff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NewBadge = styled.div`
  position: absolute;
  top: -18px;
  color: #ff0000;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 5px;
`;

const ExperienceLabel = styled.div`
  margin-bottom: 4px;
`;

// const ExperienceDate = styled.div`
//   font-size: 10px;
//   color: #fff;
//   margin-top: 2px;
// `;
