import styled from "styled-components";

const StyledTag = styled.div`
  width: fit-content;
  background-color: lightgray;
  font-size: 0.8rem;
  border-radius: 39px;
  padding: 0.3rem 0.7rem;
  margin: 0.2rem 0.3rem;
`;

const Tag = ({ tagContent }) => {
  return <StyledTag className="Tag">#{tagContent}</StyledTag>;
};

export default Tag;
