import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  .line {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    margin: 2.3rem 0 0.4rem 0;

    ::before,
    ::after {
      content: "";
      flex-grow: 1;
      background: black;
      height: 1px;
    }
    ::after {
      flex-grow: ${((props) => props.textPosition === "left" && 30) || 1};
    }
  }
  .line-text {
    background-color: white;
    padding: 5px;
  }
`;
const TextWithLines = ({ text, textPosition }) => {
  return (
    <StyledDiv className="TextWithLines" textPosition={textPosition}>
      <div className="line">
        <span className="line-text">{text}</span>
      </div>
    </StyledDiv>
  );
};
export default TextWithLines;
