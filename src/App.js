import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from ".";
import { darkTheme, lightTheme } from "./theme";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

function App() {
  const [freeItems, setFreeItems] = useState([]);
  const isDark = useSelector((state) => state.isDark.value);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Home freeItems={freeItems} setFreeItems={setFreeItems} />
    </ThemeProvider>
  );
}

export default App;
