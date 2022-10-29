import styled from "styled-components";
import Ads from "../components/Ads";
import Article from "../components/article/Article";
import Aside from "../components/Aside";
import Header from "../components/header/Header";

const Container = styled.div`
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
  max-width: 100%;
  display: grid;
  grid-template-columns: 200px auto 200px;
`;

const ViewArticle = () => {
  return (
    <Container>
      <Header />
      <Main>
        <Aside />
        <Article />
        <Ads />
      </Main>
    </Container>
  );
};

export default ViewArticle;
