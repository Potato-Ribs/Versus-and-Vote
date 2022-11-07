import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const LoginBtn = styled.button`
  height: 40px;
  width: 80px;
  border: none;
  border-radius: 20px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};

  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.textColorOpacity};
  }
`;

const JoinBtn = styled(LoginBtn)`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.accentColor};
`;

function AuthBtn() {
  return (
    <Wrapper>
      <Link to="/login">
        <LoginBtn>Login</LoginBtn>
      </Link>
      <Link to="/join">
        <JoinBtn>Join</JoinBtn>
      </Link>
    </Wrapper>
  );
}

export default AuthBtn;
