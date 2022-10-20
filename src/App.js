import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from ".";
import { darkTheme, lightTheme } from "./theme";
import Home from "./pages/Home";

function App() {
  const [freeItems, setFreeItems] = useState([]);
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Home
        isDark={isDark}
        setIsDark={setIsDark}
        freeItems={freeItems}
        setFreeItems={setFreeItems}
      />
    </ThemeProvider>
  );
}

export default App;
