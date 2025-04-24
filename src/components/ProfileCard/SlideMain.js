import styled from "styled-components";
import ProfileHeader from "./ProfileHeader";
import React from "react";

const ProfileHeader = ({ memberInfo }) => {
  return (
    <ProfileHeaderWrapper>
      <ProfileInfo>
        <div>
          <h3>{memberInfo.name}</h3>
          <p>LV. {memberInfo.level}</p>
        </div>
        <p>{memberInfo.team}</p>
        <p>{memberInfo.identificationNumber}</p>
      </ProfileInfo>
      <ProfileImageWrapper>
        <img src={memberInfo.character} alt="profile" loading="lazy" />
      </ProfileImageWrapper>
    </ProfileHeaderWrapper>
  );
};

export default ProfileHeader;

const ProfileHeaderWrapper = styled.div`
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
    text-decoration: none;
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 104px;
  margin-right: 7px;
`;
