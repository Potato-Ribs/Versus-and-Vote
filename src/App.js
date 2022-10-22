import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from ".";
import { darkTheme, lightTheme } from "./theme";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [freeItems, setFreeItems] = useState([]);
  const isDark = useSelector((state) => state.isDark.value);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home freeItems={freeItems} setFreeItems={setFreeItems} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
