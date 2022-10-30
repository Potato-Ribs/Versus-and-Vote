import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import AuthBtn from "./AuthBtn";
import DarkModeBtn from "./DarkModeBtn";
import Search from "./Search";
import { useEffect, useState } from "react";
import { auth } from "../../fbase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../app/features/currentUserSlice";
import { setCurrentBoard } from "../../app/features/currentBoardSlice";
import { setCurrentPage } from "../../app/features/currentPageSlice";

const Container = styled.header`
  box-sizing: border-box;
  width: 99vw;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 3rem;

  .user-toggle {
    position: relative;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;
    margin-left: 30px;
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
  const pathname = useLocation().pathname;

  useEffect(() => {
    setUserAvatar(currentUser.photoURL);
  }, [currentUser.photoURL]);

  useEffect(() => {
    dispatch(setCurrentPage(pathname));
  }, [pathname, dispatch]);

  const onLogoutClick = () => {
    signOut(auth);
    dispatch(getCurrentUser({ photoURL: "", displayName: "", newPhoto: "" }));
    setUserAvatar("");
  };

  const openToggle = () => {
    setToggle(!toggle);
  };

  const onBoardClick = (boardTitle) => {
    dispatch(setCurrentBoard(boardTitle));
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
            <Li onClick={() => onBoardClick("vote")}>투표 게시판</Li>
          </Link>
          <Li onClick={() => onBoardClick("balance")}>밸런스 게임</Li>
          <Link to="/free">
            <Li onClick={() => onBoardClick("free")}>자유 게시판</Li>
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
