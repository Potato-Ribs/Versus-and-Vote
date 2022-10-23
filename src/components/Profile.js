import { useState } from "react";
import styled from "styled-components";
import Header from "./header/Header";
import Input from "./Input";

const StyledProfile = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .profile-container {
    width: 100%;
    max-width: 28rem;
    display: grid;
  }
  .title {
    font-size: 2rem;
    font-weight: 600;
  }
  .name-setting {
    grid-row: 2/3;
  }
  .avatar-setting {
    align-self: center;
    grid-row: 2/3;
    grid-column: 2/3;
  }
  .save-profile {
    grid-row: 3/4;
    grid-column: 1/3;
    margin-top: 2rem;
  }
`;

const Profile = () => {
  const [username, SetUsername] = useState("");
  const [nickname, SetNickname] = useState("");
  return (
    <StyledProfile className="Profile">
      <Header />
      <form className="profile-container">
        <h1 className="title">회원정보</h1>
        <div className="name-setting">
          <Input label="이름" inputValue={username} setInput={SetUsername} />
          <Input label="닉네임" inputValue={nickname} setInput={SetNickname} />
        </div>
        <img className="avatar-setting" src="" alt="회원 이미지" />
        <button className="save-profile">저장</button>
      </form>
    </StyledProfile>
  );
};

export default Profile;
