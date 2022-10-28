import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { db } from "../../fbase";
import { BtnAccent } from "../button/BtnAccent";
import { BtnDefault } from "../button/BtnDefault";

const StyledBoard = styled.div`
  width: 70vw;
`;

const Header = styled.header`
  width: 70vw;
  height: 110px;

  h1 {
    padding-top: 30px;
    padding-bottom: 20px;
    font-size: 36px;
    font-weight: 500;
  }

  span:first-child {
    font-weight: bold;
  }

  span:last-child {
    color: ${(props) => props.theme.textColorOpacity};
  }
`;

const WriteForm = styled.form`
  height: 1000px;
  display: flex;
  flex-direction: column;
  font-size: 18px;

  select {
    height: 50px;
    font-size: 18px;
    padding-left: 10px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.textColorOpacity};
  }

  label {
    margin-bottom: 10px;
    margin-top: 50px;
  }

  input {
    height: 50px;
    font-size: 18px;
    padding-left: 10px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.textColorOpacity};
  }

  textarea {
    resize: none;
    height: 400px;
    font-size: 18px;
    padding-left: 10px;
    padding-top: 20px;
    margin-bottom: 50px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.textColorOpacity};
  }

  div {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
  }
`;

const Write = () => {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const { displayName, photoURL } = currentUser;

  const onTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onTextChange = (event) => {
    setText(event.target.value);
  };

  const onClickAccess = async (event) => {
    event.preventDefault();
    if ((topic, title, text)) {
      const createdAt = new Date().toLocaleString();
      const data = { topic, title, text, createdAt, displayName, photoURL };
      await addDoc(collection(db, "free"), data);
      document.location.href = "/free";
    }
  };

  return (
    <StyledBoard className="BoardMain">
      <Header>
        <h1>함께 할 때 더 즐거운 순간</h1>
        <span>박연우</span>
        <span>
          님 투표와 자유의 플랫폼 VV에서 다양한 사람을 만나고 생각의 폭을
          넓혀보세요.
        </span>
      </Header>
      <WriteForm onSubmit={onClickAccess}>
        <label for="topic">토픽</label>
        <select onChange={onTopicChange} value={topic} id="topic" required>
          <option>토픽을 선택해주세요.</option>
          <option>사는얘기</option>
          <option>모임&스터디</option>
        </select>
        <label for="title">제목</label>
        <input
          id="title"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={onTitleChange}
          required
        />
        <label for="text">본문</label>
        <textarea
          id="text"
          placeholder="본문을 입력해주세요."
          value={text}
          onChange={onTextChange}
          required
        />
        <div>
          <BtnDefault>취소</BtnDefault>
          <BtnAccent>등록</BtnAccent>
        </div>
      </WriteForm>
    </StyledBoard>
  );
};

export default Write;
