import styled from "styled-components";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <Wrapper>
      <Content isAdmin={isAdmin}>{children}</Content>
      {!isAdmin && <NavBar />}
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
  padding-bottom: ${({ isAdmin }) => (isAdmin ? "0" : "70px")};
`;
