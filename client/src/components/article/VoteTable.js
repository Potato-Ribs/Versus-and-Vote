import styled from "styled-components";

const StyledLine = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .voted-length {
    height: 30px;
    width: ${(props) => (props.voted / props.total) * 500 + "px"};
    white-space: nowrap;
    background-color: lightblue;
    border-radius: 30px;
    display: flex;
  }
  .vote-text {
    width: 500px;
    height: 30px;
    white-space: nowrap;
    margin-left: 10px;
    display: flex;
    align-items: center;
  }
  .vote-rate {
    position: relative;
    left: 50px;
    width: 0;
    white-space: nowrap;
    grid-column: 2/3;
    display: flex;
    align-items: center;
    justify-content: end;
  }
`;

const VoteLine = ({ total, voted, text }) => {
  return (
    <StyledLine total={total} voted={voted}>
      <div className="voted-length">
        <div className="vote-text">{text}</div>
        <div className="vote-rate">{(voted / total) * 100} %</div>
      </div>
    </StyledLine>
  );
};

const StyledTable = styled.div`
  border: black solid 1px;
  border-radius: 10px;
  padding: 10px;
  margin: 20px;
`;

const VoteTable = ({ title, voteContent }) => {
  return (
    <StyledTable>
      <div>{title}</div>
      {voteContent.map((e) => (
        <VoteLine total={e.total} voted={e.voted} text={e.text} />
      ))}
    </StyledTable>
  );
};

export default VoteTable;
