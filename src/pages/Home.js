import { useState } from "react";
import styled from "styled-components";
import Ads from "../components/Ads";
import Aside from "../components/Aside";
import BoardMain from "../components/main/BoardMain";
import Header from "../components/header/Header";
import Loading from "../components/Loading";
import { useLoading } from "../util/useLoading";

const Container = styled.div`
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
`;

const Main = styled.main`
  width: 99vw;
  max-width: 100%;
  display: grid;
  grid-template-columns: 200px auto 200px;
  .boards {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
  }
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
          <div className="boards">
            <BoardMain name="자유" path="free" />
            <BoardMain name="투표" path="vote" />
          </div>
          <Ads />
        </Main>
      </Container>
    </>
  );
}

export default Home;
