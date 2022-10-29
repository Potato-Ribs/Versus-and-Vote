import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextWithLines from "../components/TextWithLines";
import { auth } from "../fbase";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { validateEmail, validatePw } from "../util/validationCheck";
import { BASE_URL } from "../util/api";
import { BtnAccent } from "../components/button/BtnAccent";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../app/features/currentUserSlice";

library.add(fab);

const StyledSignInAndUp = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  padding-bottom: 4rem;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};

  .sign-form-container {
    width: 100%;
    max-width: 28rem;
    display: flex;
    flex-direction: column;
  }
  .logo-img {
    height: 10rem;
    align-self: center;
    margin: 1rem 0;
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
    box-sizing: border-box;
    display: grid;
    gap: 0.7rem;
    margin-top: 5px;
  }
  .sns {
    font-size: 1.5rem;
    border-radius: 0.35rem;
    grid-row: 1/2;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 5px grey;
    :hover {
      background-color: #f5f9ff;
    }
  }
  .signIn-form {
    display: flex;
    flex-direction: column;
  }
  .signUp {
    align-self: center;
    margin-top: 1.3rem;
  }
  .validation {
    font-size: 0.9rem;
    color: red;
    margin-top: 5px;
  }
  .signUp-success {
    text-align: center;
    font-size: 1.5rem;
    margin: 10rem 0;
  }
  .sign-button {
    margin-top: 1.5rem;
  }
`;

const SignInAndUp = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(true);
  const [checkPw, setCheckPw] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPw, setValidPw] = useState(true);
  const [validCheckPw, setValidCheckPw] = useState(true);
  const path = useLocation().pathname;
  const isDark = useSelector((state) => state.isDark.value);
  const navigate = useNavigate();
  const currentPage = useSelector((state) => state.currentPage.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (path === "/login") {
      setIsSigningUp(false);
      setValidEmail(true);
      setValidPw(true);
    }
    if (path === "/join") setIsSigningUp(true);
  }, [path]);

  const onProviderLogin = (provider) => {
    let authProvider;
    if (provider === "google") authProvider = new GoogleAuthProvider();
    if (provider === "github") authProvider = new GithubAuthProvider();
    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithPopup(auth, authProvider)
        .then(() => {
          navigate(currentPage);
        })
        .catch((e) => {
          console.log(e.message);
          if (
            e.message ===
            "Firebase: Error (auth/account-exists-with-different-credential)."
          ) {
            alert("이미 가입된 이메일입니다.");
          }
        });
    });
  };

  const onSignUp = (e) => {
    e.preventDefault();
    setValidEmail(validateEmail(email));
    setValidPw(validatePw(pw));
    setValidCheckPw(pw === checkPw);
    if (email && pw && pw === checkPw && validEmail && validPw && validCheckPw)
      createUserWithEmailAndPassword(auth, email, pw)
        .then(async () => {
          const idx = email.indexOf("@");
          const displayName = email.substring(0, idx);
          await updateProfile(auth.currentUser, {
            displayName,
            photoURL:
              "https://i1.sndcdn.com/avatars-000250434034-mk5uf1-t500x500.jpg",
          });
          dispatch(
            getCurrentUser({
              displayName,
              photoURL:
                "https://i1.sndcdn.com/avatars-000250434034-mk5uf1-t500x500.jpg",
            })
          );
          setIsJoined(true);
        })
        .catch((e) => alert(e.message));
  };

  const onSignIn = (e) => {
    e.preventDefault();
    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, pw)
        .then(() => {
          navigate(currentPage);
        })
        .catch((e) => {
          alert(e.message);
        });
    });
  };

  return (
    <StyledSignInAndUp className="SignInAndUp">
      <div className="sign-form-container">
        <div className="logo-img">
          <Link to="/">
            {isDark ? (
              <img
                className="logo-img"
                src={
                  "https://velog.velcdn.com/images/2pandi/post/8a684dfa-4344-4a8b-9bb3-f5fcc6c77512/image.jpeg"
                }
                alt=""
              />
            ) : (
              <img
                className="logo-img"
                src={
                  "https://velog.velcdn.com/images/2pandi/post/48173aca-0228-490e-ab86-19750358950a/image.jpeg"
                }
                alt=""
              />
            )}
          </Link>
        </div>
        <h2 className="welcome">VV에 오신 것을 환영합니다.</h2>
        {isJoined ? (
          <form className="signUp-success">
            <div>가입이 완료되었습니다.</div>
            <a href={BASE_URL + "login"}>로그인하러 가기</a>
          </form>
        ) : (
          <div className="sns-sign">
            <div>SNS {isSigningUp ? "회원가입" : "로그인"}</div>
            <div className="sns-sign-buttons">
              <div
                className="sns"
                onClick={() => {
                  onProviderLogin("google");
                }}
              >
                <FontAwesomeIcon icon={["fab", "google"]} />
              </div>
              <div
                className="sns"
                onClick={() => {
                  onProviderLogin("github");
                }}
              >
                <FontAwesomeIcon icon={["fab", "github"]} />
              </div>
            </div>
            <TextWithLines
              text={
                isSigningUp
                  ? "회원가입에 필요한 기본정보를 입력해주세요."
                  : "VV 아이디로 로그인"
              }
            />
            <form className="signIn-form">
              <Input
                label="이메일"
                type="text"
                inputValue={email}
                setInput={setEmail}
                placeholder={isSigningUp ? "이메일을 입력해주세요" : ""}
                required={true}
              />
              <div className="validation">
                {!validEmail && "이메일을 확인해주세요"}
              </div>
              <Input
                label="비밀번호"
                type="password"
                inputValue={pw}
                setInput={setPw}
                placeholder={
                  isSigningUp ? "최소 8자 이상(알파벳, 숫자 필수)" : ""
                }
                required={true}
              />
              <div className="validation">
                {!validPw && "비밀번호를 확인해주세요"}
              </div>
              {isSigningUp && (
                <>
                  <Input
                    label="비밀번호 확인"
                    type="password"
                    inputValue={checkPw}
                    setInput={setCheckPw}
                    placeholder={
                      isSigningUp ? "최소 8자 이상(알파벳, 숫자 필수)" : ""
                    }
                    required={true}
                  />
                  <div className="validation">
                    {!validCheckPw && "비밀번호가 일치하지 않습니다."}
                  </div>
                </>
              )}
              {isSigningUp ? (
                <BtnAccent className="sign-button" onClick={onSignUp}>
                  회원가입
                </BtnAccent>
              ) : (
                <BtnAccent className="sign-button" onClick={onSignIn}>
                  로그인
                </BtnAccent>
              )}
              <p className="signUp">
                {isSigningUp ? (
                  <>
                    <span>이미 회원이신가요?</span>
                    <Link to="/login">로그인</Link>
                  </>
                ) : (
                  <>
                    <span>아직 회원이 아니신가요?</span>
                    <Link to="/join">회원가입</Link>
                  </>
                )}
              </p>
            </form>
          </div>
        )}
      </div>
    </StyledSignInAndUp>
  );
};

export default SignInAndUp;
