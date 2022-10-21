import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.aside`
  width: 180px;
  height: 100vh;
`;

const PopularTags = styled.div`
  width: 180px;
  height: 300px;
  margin-bottom: 40px;
  color: ${(props) => props.theme.textColor};

  h1 {
    font-size: 18px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  hr {
    color: ${(props) => props.theme.textColor};
    opacity: 0.4;
    margin-bottom: 30px;
  }

  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  span {
    font-size: 17px;
  }
`;

const Commercial = styled.div`
  width: 180px;
  height: 180px;
  background-color: gray;
  margin-bottom: 40px;
`;

const Feedback = styled.div`
  width: 180px;
  height: 80px;
  border-radius: 8px;
  color: black;
  background-color: rgb(239, 246, 255);
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    span {
      opacity: 0.6;
    }
  }
`;

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 10px;

  div {
    background-color: rgb(165, 209, 246);
    padding: 8px;
    border-radius: 10px;
  }

  span {
    font-size: 14px;
  }
`;

const ShowRank = styled(PopularTags)`
  hr {
    margin-bottom: 20px;
  }

  li {
    margin-bottom: 20px;
    span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

function Aside() {
  const [popularTags, setPopularTags] = useState([]);
  const [userRank, setUserRank] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/popularTags")
      .then((res) => res.json())
      .then((data) => setPopularTags(data))
      .catch((e) => console.log(e));
    fetch("http://localhost:3001/userRank")
      .then((res) => res.json())
      .then((data) => setUserRank(data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <Container>
      <PopularTags>
        <h1>#인기 태그</h1>
        <hr />
        <ul>
          {popularTags.map((tag) => (
            <li>
              <span>{`#${tag.name}`}</span>
              <span>{`${tag.point}`}</span>
            </li>
          ))}
        </ul>
      </PopularTags>
      <Commercial />
      <Feedback>
        <Wrapper>
          <div>
            <span>📢</span>
          </div>
          <span>버그와 제안은 여기에 댓글로 남겨주세요.</span>
        </Wrapper>
      </Feedback>
      <ShowRank>
        <h1>Top Users</h1>
        <hr />
        <ul>
          {userRank.map((rank) => (
            <li>
              <span>
                <img src={rank.avatar} />
                <span>{rank.user}</span>
              </span>
              <span>{`🎖 ${rank.point}`}</span>
            </li>
          ))}
        </ul>
      </ShowRank>
    </Container>
  );
}

export default Aside;
