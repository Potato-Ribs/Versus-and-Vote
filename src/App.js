import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from ".";
import { darkTheme, lightTheme } from "./theme";
import Ads from "./components/Ads";
import BoardMain from "./components/BoardMain";

const Container = styled.div`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
`;

function App() {
  const [freeItems, setFreeItems] = useState([]);
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3001/vote")
      .then((res) => res.json())
      .then((data) => setFreeItems(data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Container>
        <BoardMain items={freeItems} />
        <Ads />
      </Container>
    </ThemeProvider>
  );
}

export default App;
