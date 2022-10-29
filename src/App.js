import { ThemeProvider } from "styled-components";
import { GlobalStyle } from ".";
import { darkTheme, lightTheme } from "./theme";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignInAndUp from "./pages/SignInAndUp";
import BoardList from "./pages/BoardList";
import BoardWrite from "./pages/BoardWrite";
import Profile from "./pages/Profile";
import FreeList from "./pages/FreeList";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUser } from "./app/features/currentUserSlice";
import { auth } from "./fbase";
import ViewArticle from "./pages/ViewArticle";
import NotFound from "./components/article/NotFound";

function App() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.isDark.value);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getCurrentUser(user));
      }
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignInAndUp />} />
          <Route path="/join" element={<SignInAndUp />} />
          <Route path="/board" element={<BoardList />} />
          <Route path="/free" element={<FreeList />} />
          <Route path="/write" element={<BoardWrite />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/article/:id" element={<ViewArticle />} />
          <Route path="/article/:id" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
