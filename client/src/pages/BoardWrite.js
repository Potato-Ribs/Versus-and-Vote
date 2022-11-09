import styled from "styled-components";
import Write from "../components/board/Write";
import Header from "../components/header/Header";
import { useLoading } from "../util/useLoading";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
`;

const Main = styled.main`
  min-width: 60vw;
  max-width: 80vw;
  margin: 40px auto;
`;

function BalanceList() {
  return (
    <Container>
      <Header />
      <Main>
        <Write />
      </Main>
    </Container>
  );
}

export default BalanceList;
