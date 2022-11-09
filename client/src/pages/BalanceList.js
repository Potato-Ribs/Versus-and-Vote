import { useState } from "react";
import styled from "styled-components";
import Ads from "../components/Ads";
import Aside from "../components/Aside";
import Balance from "../components/board/Balance";
import Free from "../components/board/Free";
import Header from "../components/header/Header";
import Loading from "../components/Loading";
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
  const [loading, setLoading] = useState(true);

  useLoading(setLoading);

  return (
    <>
      {loading ? <Loading /> : null}
      <Container>
        <Header />
        <Main>
          <Balance />
        </Main>
      </Container>
    </>
  );
}

export default BalanceList;
