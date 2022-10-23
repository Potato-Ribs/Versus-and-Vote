import styled from "styled-components";
import Ads from "../components/Ads";
import Aside from "../components/Aside";
import Write from "../components/board/Write";
import Header from "../components/header/Header";

const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
`;

const Main = styled.main`
  width: 100vw;
  display: flex;
  justify-content: space-around;
`;

function BoardWrite() {
  return (
    <Container>
      <Header />
      <Main>
        <Aside />
        <Write />
        <Ads />
      </Main>
    </Container>
  );
}

export default BoardWrite;
