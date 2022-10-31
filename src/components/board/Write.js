import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../fbase";
import { BtnAccent } from "../button/BtnAccent";
import { BtnDefault } from "../button/BtnDefault";
import WriteFree from "./WriteFree";
import WriteVote from "./WriteVote";

const StyledBoard = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
  }
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

const Write = () => {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, SetisSubmitting] = useState(false);
  const currentBoard = useSelector((state) => state.currentBoard.value);
  const currentUser = useSelector((state) => state.currentUser);
  const { displayName, photoURL } = currentUser;
  const navigate = useNavigate();

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
    if (!isSubmitting) {
      SetisSubmitting(true);
      if (topic && title && text) {
        const createdAt = new Date().toLocaleString();
        const data = { topic, title, text, createdAt, displayName, photoURL };
        await addDoc(collection(db, currentBoard), data);
        navigate(`/${currentBoard}`);
      }
      if (!topic) alert("토픽을 선택해주세요");
      else if (!title) alert("제목을 입력해주세요");
      else if (!text) alert("내용을 입력해주세요");
      SetisSubmitting(false);
    } else alert("진정하세요...글 올라갑니다.");
  };

  const onCancelClick = () => {
    navigate("/" + currentBoard);
  };

  return (
    <>
      {displayName ? (
        <StyledBoard className="Write">
          <Header>
            <h1>함께 할 때 더 즐거운 순간</h1>
            <span>{displayName}</span>
            <span>
              님 투표와 자유의 플랫폼 VV에서 다양한 사람을 만나고 생각의 폭을
              넓혀보세요.
            </span>
          </Header>

          {currentBoard === "free" && (
            <WriteFree
              onTopicChange={onTopicChange}
              topic={topic}
              title={title}
              onTitleChange={onTitleChange}
              text={text}
              onTextChange={onTextChange}
            />
          )}
          {currentBoard === "vote" && (
            <WriteVote
              onTopicChange={onTopicChange}
              topic={topic}
              title={title}
              onTitleChange={onTitleChange}
              text={text}
              onTextChange={onTextChange}
            />
          )}
          <div>
            <BtnDefault type="button" onClick={onCancelClick}>
              취소
            </BtnDefault>
            <BtnAccent type="button" onClick={onClickAccess}>
              등록
            </BtnAccent>
          </div>
        </StyledBoard>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Write;
