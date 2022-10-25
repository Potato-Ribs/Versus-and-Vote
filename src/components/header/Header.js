import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthBtn from "./AuthBtn";
import DarkModeBtn from "./DarkModeBtn";
import Search from "./Search";
import { useEffect, useState } from "react";
import { auth } from "../../fbase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import lightLogo from "../../logo/logo_light_hori.jpeg";
import darkLogo from "../../logo/logo_dark_hori.jpeg";
import { useSelector } from "react-redux";

const Container = styled.header`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4vh 4vw;

  .user-toggle {
    position: relative;
  }

  .user-avatar {
    width: 40px;
    border-radius: 50%;
    position: relative;
  }
  .user-setting-list {
    width: 5rem;
    background-color: orange;
    position: absolute;
    z-index: 1;
  }
  .setting-item {
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      background-color: gray;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  width: 40vw;
  margin-right: 10vw;
  gap: 140px;
`;

const Ul = styled.ul`
  display: flex;
  gap: 60px;
`;

const Li = styled.li``;

const Logo = styled.img`
  width: 150px;
`;

function Header() {
  const [userAvatar, setUserAvatar] = useState(null);
  const [toggle, setToggle] = useState(false);

  const isDark = useSelector((state) => state.isDark.value);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user)
        setUserAvatar(
          user.photoURL ||
            "https://i1.sndcdn.com/avatars-000250434034-mk5uf1-t500x500.jpg"
        );
    });
  }, []);

  const onLogoutClick = () => {
    signOut(auth);
    document.location.href = "/";
  };

  const openToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Container>
      <Nav>
        <Link to="/">
          {isDark ? (
            <Logo src={darkLogo} alt="" />
          ) : (
            <Logo src={lightLogo} alt="" />
          )}
        </Link>
        <Ul>
          <Link to="/board">
            <Li>Screen 1</Li>
          </Link>
          <Link to="/free">
            <Li>Screen 2</Li>
          </Link>
          <Li>Screen 3</Li>
        </Ul>
      </Nav>
      <Search />
      <DarkModeBtn />
      {userAvatar ? (
        <>
          <div className="user-toggle">
            <img
              className="user-avatar"
              onClick={() => openToggle()}
              src={userAvatar}
              alt="user avatar"
            />
            {toggle && (
              <div className="user-setting-list">
                <Link to="/profile">
                  <div className="setting-item">내 프로필</div>
                </Link>
                <div className="setting-item" onClick={() => onLogoutClick()}>
                  로그아웃
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <AuthBtn />
      )}
    </Container>
  );
}

export default Header;
