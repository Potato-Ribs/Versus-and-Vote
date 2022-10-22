import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-left: 100px;
`;

const LoginBtn = styled.button`
  height: 40px;
  width: 80px;
  border: 1px solid blue;
  border-radius: 20px;
`;

const JoinBtn = styled(LoginBtn)`
  background-color: blue;
  color: white;
`;

function AuthBtn() {
  return (
    <Wrapper>
      <Link to="/login">
        <LoginBtn>Login</LoginBtn>
      </Link>
      <JoinBtn>Join</JoinBtn>
    </Wrapper>
  );
}

export default AuthBtn;
