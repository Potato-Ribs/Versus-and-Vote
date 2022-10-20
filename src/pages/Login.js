import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import Input from "../components/Input";
import { useState } from "react";

library.add(fab);

const StyledLogin = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;

  .login-form-container {
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
  .sns-login {
    margin-top: 2rem;
  }
  .sns-login-buttons {
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
      /* margin: 0 16px; */
      background: black;
      height: 1px;
    }
  }
  .line-text {
    background-color: white;
    padding: 5px;
  }
  .login-form {
    display: flex;
    flex-direction: column;
  }
  .login-button {
    margin-top: 1.8rem;
    padding: 0.6rem 0.75rem;
  }
  .sign-up {
    align-self: center;
    margin-top: 1.3rem;
  }
`;

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  return (
    <StyledLogin className="Login">
      <div className="login-form-container">
        <div className="logo">로고</div>
        <h2 className="welcome">VV에 오신 것을 환영합니다.</h2>
        <div className="sns-login">
          <label>SNS 로그인</label>
          <div className="sns-login-buttons">
            <div className="sns">
              <FontAwesomeIcon icon={["fab", "google"]} />
            </div>
            <div className="sns">
              <FontAwesomeIcon icon={["fab", "github"]} />
            </div>
          </div>
          <div className="line">
            <span className="line-text">VV 아이디로 로그인</span>
          </div>
          <form className="login-form">
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
            <button className="login-button">로그인</button>
            <p className="sign-up">
              <span>아직 회원이 아니신가요?</span>
              <a href="">회원가입</a>
            </p>
          </form>
        </div>
      </div>
    </StyledLogin>
  );
};

export default Login;
