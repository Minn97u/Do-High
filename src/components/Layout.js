import React from "react";
import NavBar from "./NavBar";
import styled from "styled-components";

const Layout = ({ children, hasNavBar }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
      {hasNavBar && <NavBar />}
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray};
`;

const Content = styled.main`
  flex: 1;
  padding-bottom: 90px;
`;
