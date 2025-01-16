import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import homeIcon from "../assets/NavBar/home.svg";
import starIcon from "../assets/NavBar/star.svg";
import stackIcon from "../assets/NavBar/stack.svg";
import boardIcon from "../assets/NavBar/board.svg";
import myIcon from "../assets/NavBar/my.png";

const NavBar = () => {
  const location = useLocation();

  const navItems = [
    { name: "홈", path: "/main", icon: homeIcon },
    { name: "퀘스트", path: "/quest", icon: starIcon },
    { name: "경험치", path: "/exp", icon: stackIcon },
    { name: "게시판", path: "/boardlist", icon: boardIcon },
    {
      name: "마이",
      path: "/mypage-entry",
      activePaths: ["/mypage-entry", "/mypage"],
      icon: myIcon,
    },
  ];

  return (
    <Nav>
      {navItems.map((item) => {
        const isActive = item.activePaths
          ? item.activePaths.some((path) => location.pathname.startsWith(path))
          : location.pathname.startsWith(item.path);

        return (
          <NavItem to={item.path} key={item.name} isActive={isActive}>
            <NavIcon
              src={item.icon}
              alt={`${item.name} 아이콘`}
              isActive={isActive}
            />
            <NavLabel isActive={isActive}>{item.name}</NavLabel>
          </NavItem>
        );
      })}
    </Nav>
  );
};

export default NavBar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1000;
  padding: 12px 0;
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;

  margin-bottom: 23px;
`;

const NavIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 4px;

  filter: ${(props) =>
    props.isActive
      ? "brightness(0) saturate(100%) invert(45%) sepia(132%) saturate(723%) hue-rotate(358deg) brightness(92%) contrast(112%)"
      : "none"};
`;

const NavLabel = styled.span`
  ${(props) => props.theme.fonts.medium};
  font-size: 12px;
  color: ${(props) =>
    props.isActive ? props.theme.colors.mainC : props.theme.colors.gray3};

  &:hover {
    color: ${(props) => props.theme.colors.mainC};
  }
`;
