import styled from "styled-components";

const WriteForm = styled.form`
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
`;

const WriteVote = ({
  onTopicChange,
  topic,
  title,
  onTitleChange,
  text,
  onTextChange,
}) => {
  return (
    <WriteForm>
      <label htmlFor="topic">토픽</label>
      <select onChange={onTopicChange} value={topic} id="topic">
        <option>토픽을 선택해주세요</option>
        <option>밥메추</option>
        <option>고민</option>
        <option>기타</option>
      </select>
      <label htmlFor="title">제목</label>
      <input
        id="title"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={onTitleChange}
        required
      />
      <label htmlFor="text">내용</label>
      <textarea
        id="text"
        placeholder="내용을 입력해주세요."
        value={text}
        onChange={onTextChange}
        required
      />
    </WriteForm>
  );
};

export default WriteVote;
