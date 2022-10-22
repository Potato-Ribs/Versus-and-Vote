import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../util/api";

library.add(fab);

const StyledSignInAndUp = styled.div`
  width: 100vw;
  /* min-height: 100vh; */
  padding-bottom: 4rem;
  display: flex;
  justify-content: center;

  .sign-form-container {
    width: 100%;
    max-width: 28rem;
    background-color: pink;
    display: flex;
    flex-direction: column;
  }
  .logo {
    width: 13rem;
    height: 10rem;
    background-color: gray;
    margin-top: 3rem;
    align-self: center;
  }
  .welcome {
    font-size: 1.9rem;
    font-weight: 700;
    text-align: center;
    margin-top: 1.5rem;
  }
  .sns-sign {
    margin-top: 2rem;
  }
  .sns-sign-buttons {
    display: grid;
    gap: 0.7rem;
  }
  .sns {
    font-size: 1.5rem;
    background-color: red;
    border-radius: 0.35rem;
    grid-row: 1/2;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .line {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    margin: 2.3rem 0 0.4rem 0;

    ::before,
    ::after {
      content: "";
      flex-grow: 1;
      background: black;
      height: 1px;
    }
  }
  .line-text {
    background-color: white;
    padding: 5px;
  }
  .signIn-form {
    display: flex;
    flex-direction: column;
  }
  .sign-button {
    margin-top: 1.8rem;
    padding: 0.6rem 0.75rem;
  }
  .signUp {
    align-self: center;
    margin-top: 1.3rem;
  }
`;

const SignInAndUp = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(true);
  const [checkPw, setCheckPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const path = useLocation().pathname;

  useEffect(() => {
    if (path === "/login") setIsSigningUp(false);
    if (path === "/join") setIsSigningUp(true);
  }, [path]);

  return (
    <StyledSignInAndUp className="SignInAndUp">
      <div className="sign-form-container">
        <div className="logo">로고</div>
        <h2 className="welcome">VV에 오신 것을 환영합니다.</h2>
        <div className="sns-sign">
          <label>SNS {isSigningUp ? "회원가입" : "로그인"}</label>
          <div className="sns-sign-buttons">
            <div className="sns">
              <FontAwesomeIcon icon={["fab", "google"]} />
            </div>
            <div className="sns">
              <FontAwesomeIcon icon={["fab", "github"]} />
            </div>
          </div>
          <div className="line">
            <span className="line-text">
              {isSigningUp
                ? "회원가입에 필요한 기본정보를 입력해주세요."
                : "VV 아이디로 로그인"}
            </span>
          </div>
          <form className="signIn-form">
            <Input
              label="아이디"
              type="text"
              inputValue={id}
              setInput={setId}
            />
            <Input
              label="비밀번호"
              type="password"
              inputValue={pw}
              setInput={setPw}
            />
            {isSigningUp && (
              <>
                <Input
                  label="비밀번호 확인"
                  type="password"
                  inputValue={checkPw}
                  setInput={setCheckPw}
                />
                <Input
                  label="실명"
                  type="text"
                  inputValue={userName}
                  setInput={setUserName}
                />
                <Input
                  label="닉네임"
                  type="text"
                  inputValue={userNickname}
                  setInput={setUserNickname}
                />
              </>
            )}
            <button className="sign-button">
              {isSigningUp ? "회원가입" : "로그인"}
            </button>
            <p className="signUp">
              {isSigningUp ? (
                <>
                  <span>이미 회원이신가요?</span>
                  <a href={BASE_URL + "login"}>로그인</a>
                </>
              ) : (
                <>
                  <span>아직 회원이 아니신가요?</span>
                  <a href={BASE_URL + "join"}>회원가입</a>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </StyledSignInAndUp>
  );
};

export default SignInAndUp;
