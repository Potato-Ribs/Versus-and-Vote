import styled from "styled-components";
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
  return (
    <StyledBoard className="BoardMain">
      <Header>
        <h1>함께 할 때 더 즐거운 순간</h1>
        <span>박연우</span>
        <span>
          님 지식공유 플랫폼 OKKY에서 다양한 사람을 만나고 생각의 폭을
          넓혀보세요.
        </span>
      </Header>
      <WriteForm>
        <label for="topic">토픽</label>
        <select id="topic">
          <option>토픽을 선택해주세요.</option>
          <option>사는얘기</option>
          <option>모임&스터디</option>
        </select>
        <label for="title">제목</label>
        <input id="title" placeholder="제목을 입력해주세요." />
        <label for="tag">태그</label>
        <input id="tag" placeholder="태그를 입력해주세요." />
        <label for="text">본문</label>
        <textarea id="text" placeholder="본문을 입력해주세요." />
        <div>
          <BtnDefault>취소</BtnDefault>
          <BtnAccent>등록</BtnAccent>
        </div>
      </WriteForm>
    </StyledBoard>
  );
};

export default Write;
