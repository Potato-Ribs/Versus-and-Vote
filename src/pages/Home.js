import { useEffect } from "react";
import styled from "styled-components";
import Ads from "../components/Ads";
import Aside from "../components/Aside";
import BoardMain from "../components/BoardMain";
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
  align-items: center;
`;

function Home({ freeItems, setFreeItems }) {
  useEffect(() => {
    fetch("http://localhost:3001/vote")
      .then((res) => res.json())
      .then((data) => setFreeItems(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <Container>
      <Header />
      <Main>
        <Aside />
        <BoardMain items={freeItems} />
        <BoardMain items={freeItems} />
        <Ads />
      </Main>
    </Container>
  );
}

export default Home;
