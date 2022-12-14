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
    margin-bottom: 20px;
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
  const [title, setTitle] = useState("");
  const [textLeft, setTextLeft] = useState("");
  const [textRight, setTextRight] = useState("");
  const [isSubmitting, SetisSubmitting] = useState(false);
  const currentBoard = useSelector((state) => state.currentBoard.value);
  const currentUser = useSelector((state) => state.currentUser);
  const { displayName } = currentUser;
  const navigate = useNavigate();

  const onTextLeftChange = (event) => {
    setTextLeft(event.target.value);
  };

  const onTextRightChange = (event) => {
    setTextRight(event.target.value);
  };

  console.log(title, textLeft, textRight);

  const onClickAccess = async (event) => {
    event.preventDefault();
    if (!isSubmitting) {
      SetisSubmitting(true);
      if (textLeft && title && textRight) {
        const createdAt = new Date().toLocaleString();
        const data = {
          title,
          leftStr: textLeft,
          leftNum: 0,
          rightStr: textRight,
          rightNum: 0,
          createdAt,
          emjBad: 0,
          emjDizzy: 0,
          emjFunny: 0,
          emjGood: 0,
          emjLove: 0,
          emjSad: 0,
        };
        await addDoc(collection(db, "balance"), data);
        navigate("/");
      }
      if (!textLeft) alert("????????? ??????????????????");
      else if (!textRight) alert("????????? ??????????????????");
      SetisSubmitting(false);
    } else alert("???????????????...??? ???????????????.");
  };

  const onCancelClick = () => {
    navigate("/" + currentBoard);
  };

  useEffect(() => {
    setTitle(`${textLeft} vs ${textRight}`);
  }, [textLeft, textRight]);

  return (
    <>
      {displayName ? (
        <StyledBoard className="Write">
          <Header>
            <h1>?????? ??? ??? ??? ????????? ??????</h1>
            <span>{displayName}</span>
            <span>
              ??? ????????? ????????? ????????? VV?????? ????????? ????????? ????????? ????????? ??????
              ???????????????.
            </span>
          </Header>
          <WriteForm onSubmit={onClickAccess}>
            <label htmlFor="textLeft">??????</label>
            <input
              id="textLeft"
              placeholder="????????? ??????????????????."
              value={textLeft}
              onChange={onTextLeftChange}
              required
            />
            <label htmlFor="textRight">??????</label>
            <input
              id="textRight"
              placeholder="????????? ??????????????????."
              value={textRight}
              onChange={onTextRightChange}
              required
            />
            <label htmlFor="title">??????</label>
            <input
              id="title"
              placeholder="????????? ?????? ????????? ?????????????????????."
              value={`${textLeft} vs ${textRight}`}
              readOnly
            />
            <div>
              <BtnDefault type="button" onClick={onCancelClick}>
                ??????
              </BtnDefault>
              <BtnAccent type="button" onClick={onClickAccess}>
                ??????
              </BtnAccent>
            </div>
          </WriteForm>
        </StyledBoard>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Write;
