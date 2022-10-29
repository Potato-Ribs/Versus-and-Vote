import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthBtn from "./AuthBtn";
import DarkModeBtn from "./DarkModeBtn";
import Search from "./Search";
import { useEffect, useState } from "react";
import { auth } from "../../fbase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../app/features/currentUserSlice";

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
    height: 40px;
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
  align-items: center;
`;

const Ul = styled.ul`
  display: flex;
  gap: 60px;
`;

const Li = styled.li`
  white-space: nowrap;
`;

const Logo = styled.img`
  width: 150px;
`;

function Header() {
  const [toggle, setToggle] = useState(false);
  const isDark = useSelector((state) => state.isDark.value);
  const currentUser = useSelector((state) => state.currentUser);
  const [userAvatar, setUserAvatar] = useState(currentUser.photoURL);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserAvatar(currentUser.photoURL);
  }, [currentUser.photoURL]);

  const onLogoutClick = () => {
    signOut(auth);
    document.location.href = "/";
    dispatch(getCurrentUser({ photoURL: "", displayName: "" }));
    setUserAvatar("");
  };

  console.log(currentUser);

  const openToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Container>
      <Nav>
        <Link to="/">
          {isDark ? (
            <Logo
              src={
                "https://velog.velcdn.com/images/2pandi/post/0195ad06-f54d-4958-a4a6-6dc358cf62a4/image.jpeg"
              }
              alt=""
            />
          ) : (
            <Logo
              src={
                "https://velog.velcdn.com/images/2pandi/post/47f2da28-e528-49dc-bcc5-d76cff41cc74/image.jpeg"
              }
              alt=""
            />
          )}
        </Link>
        <Ul>
          <Link to="/board">
            <Li>투표 게시판</Li>
          </Link>
          <Li>밸런스 게임</Li>
          <Link to="/free">
            <Li>자유 게시판</Li>
          </Link>
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
              src={
                userAvatar ||
                "https://i1.sndcdn.com/avatars-000250434034-mk5uf1-t500x500.jpg"
              }
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
