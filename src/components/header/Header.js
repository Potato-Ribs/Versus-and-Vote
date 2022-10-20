import styled from "styled-components";
import AuthBtn from "./AuthBtn";
import DarkModeBtn from "./DarkModeBtn";
import Search from "./Search";

const Container = styled.header`
  width: 100vw;
  display: flex;
  align-items: center;
  padding: 4vh 4vw;
`;

const Nav = styled.nav`
  display: flex;
  width: 40vw;
  margin-right: 10vw;
  gap: 140px;
`;

const HomeBtn = styled.a``;

const Ul = styled.ul`
  display: flex;
  gap: 60px;
`;

const Li = styled.li``;

function Header() {
  return (
    <Container>
      <Nav>
        <HomeBtn>GoHome</HomeBtn>
        <Ul>
          <Li>Screen 1</Li>
          <Li>Screen 2</Li>
          <Li>Screen 3</Li>
        </Ul>
      </Nav>
      <Search />
      <AuthBtn />
      <DarkModeBtn />
    </Container>
  );
}

export default Header;
