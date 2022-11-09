import styled from "styled-components";

const StyledGithubCard = styled.a`
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  height: 35px;
  width: 130px;
  padding: 0 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  :first-child {
    margin-bottom: 10px;
  }
  :hover {
    filter: brightness(0.85);
  }
  div {
    display: flex;
    align-items: center;
  }
  img {
    border-radius: 1000px;
    width: 25px;
  }
  .githubName {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const GithubCard = ({ text }) => {
  return (
    <StyledGithubCard
      href={
        text === "2pandi"
          ? "https://github.com/2pandi"
          : "https://github.com/HyeonWooGa"
      }
      target="_blank"
    >
      <img
        src={
          text === "2pandi"
            ? "https://velog.velcdn.com/images/2pandi/post/d2627889-e3c3-46b7-afc6-0641e6d7e9e7/image.jpeg"
            : "https://velog.velcdn.com/images/2pandi/post/8b2bb448-36ee-4649-97c1-436e72d7d1a4/image.jpeg"
        }
        alt=""
      ></img>
      <div className="githubName">{text}</div>
    </StyledGithubCard>
  );
};

export default GithubCard;
