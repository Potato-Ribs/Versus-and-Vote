import { useEffect, useState } from "react";
import styled from "styled-components";
import Ads from "../components/Ads";
import Aside from "../components/Aside";
import Free from "../components/board/Free";
import Header from "../components/header/Header";
import Loading from "../components/Loading";
import { useLoading } from "../util/useLoading";

const Container = styled.div`
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
`;

function FreeList() {
  const [loading, setLoading] = useState(true);

  useLoading(setLoading);

  return (
    <>
      {loading ? <Loading /> : null}
      <Container>
        <Header />
        <Main>
          <Aside />
          <Free />
          <Ads />
        </Main>
      </Container>
    </>
  );
}

export default FreeList;
