import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from ".";
import { darkTheme, lightTheme } from "./theme";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Board from "./pages/Board";

function App() {
  const [freeItems, setFreeItems] = useState([]);
  const isDark = useSelector((state) => state.isDark.value);
  useEffect(() => {
    fetch("http://localhost:3001/free")
      .then((res) => res.json())
      .then((data) => setFreeItems(data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home freeItems={freeItems} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<Board freeItems={freeItems} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
