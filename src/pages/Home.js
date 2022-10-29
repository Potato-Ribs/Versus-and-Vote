import { useState } from "react";
import styled from "styled-components";
import Ads from "../components/Ads";
import Aside from "../components/Aside";
import BoardMain from "../components/main/BoardMain";
import Header from "../components/header/Header";
import Loading from "../components/Loading";
import { useLoading } from "../util/useLoading";

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

function Home() {
  const [loading, setLoading] = useState(true);

  useLoading(setLoading);

  return (
    <>
      {loading && <Loading />}
      <Container>
        <Header />
        <Main>
          <Aside />
          <BoardMain name="자유" path="free" />
          <BoardMain name="투표" path="vote" />
          <Ads />
        </Main>
      </Container>
    </>
  );
}

export default Home;
