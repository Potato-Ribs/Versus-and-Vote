import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BtnAccent } from "../button/BtnAccent";
import { BtnDefault } from "../button/BtnDefault";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../fbase";

const StyledBoard = styled.div`
  box-sizing: border-box;
  min-width: 700px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;

  .board-title {
    height: 90px;
    background-color: lightgray;
    border-radius: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .board-title-name {
      font-size: 1.125rem;
      font-weight: 600;
    }
  }

  .board-util {
    padding: 30px 0;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .board-tab {
      display: flex;
      gap: 60px;

      li {
        font-size: 20px;
        color: ${(props) => props.theme.textColorOpacity};
        padding: 15px;
        border-radius: 10px;
      }

      li:last-child {
        color: ${(props) => props.theme.textColor};
        background-color: ${(props) => props.theme.bgColorOpacity};
      }
    }
  }

  .board-list-util {
    padding: 15px 0;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > button {
      border: none;
      background-color: ${(props) => props.theme.bgColor};
      font-size: 26px;

      &:hover {
        opacity: 0.4;
      }
    }

    form {
      input {
        width: 240px;
        height: 40px;
        border: 1px solid black;
        border-radius: 20px;
        padding: 0 55px;
      }

      button {
        position: relative;
        left: 45px;
        border: none;
        background-color: white;
        font-size: 16px;
      }
    }

    & > div {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 20px;

      & > div {
        span:last-child {
          color: ${(props) => props.theme.textColorOpacity};
        }
      }

      button {
        border: none;
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.textColorOpacity};
        font-size: 26px;

        &:hover {
          color: ${(props) => props.theme.textColor};
          cursor: pointer;
        }
      }
    }
  }

  .items-containter {
    hr {
      margin: 30px 0;

      &:last-child {
        margin-top: 100px;
        margin-bottom: 0px;
      }
    }

    li {
      padding: 30px 0px;
    }
  }
`;

const ItemTop = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 18px;
  gap: 10px;
  margin-bottom: 20px;
  margin-top: 30px;
  color: ${(props) => props.theme.textColorOpacity};

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
`;

const ItemMid = styled.div`
  font-size: 20px;
  margin-bottom: 20px;

  h1 {
    font-weight: 600;
  }
`;

const ItemBot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 18px;
  color: ${(props) => props.theme.textColorOpacity};
  height: 22px;
  gap: 10px;

  div:last-child {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 5px;
    color: ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.accentColorOpacity};
  }

  div:first-child {
    display: flex;
    gap: 15px;
    font-size: 20px;
  }
`;

const PageNav = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  color: ${(props) => props.theme.textColorOpacity};

  div {
    display: flex;
    gap: 15px;

    &:first-child {
      opacity: 0.4;
    }
  }

  ul {
    display: flex;
    li {
      text-align: center;
      padding: 20px;
      border-top: 2px solid lightgray;
    }
  }

  li:first-child {
    border-top: 2px solid ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.accentColor};
  }
`;

const Vote = () => {
  const [itemsForBoard, setItemsForBoard] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "vote"), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      const itemsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItemsForBoard(itemsArray);
    });
  }, []);

  console.log(itemsForBoard);

  return (
    <StyledBoard className="Vote">
      <div className="board-title">
        <h2 className="board-title-name">자유 게시판</h2>
      </div>
      <div className="board-util">
        <Link to="/write">
          <BtnAccent>✏️ 작성하기</BtnAccent>
        </Link>
        <BtnDefault>⬇️ 최신순</BtnDefault>
      </div>
      <hr />
      <div className="board-list-util">
        <button>🔄</button>
        <form>
          <button>🔎</button>
          <input placeholder="커뮤니티 내에서 검색" />
        </form>
        <div>
          <div>
            <span>1 </span>
            <span>/ 11732 페이지</span>
          </div>
          <button>⬅️</button>
          <button>➡️</button>
        </div>
      </div>
      <hr />
      <ul className="items-containter">
        {itemsForBoard.map((item) => (
          <>
            <li className="item" key={item.id}>
              <Link to={"/article/" + item.id}>
                <ItemMid>
                  <h1>{item.title}</h1>
                </ItemMid>
              </Link>
              <ItemBot>
                <div>
                  <span>{item.text}</span>
                </div>
                <div>
                  <span>{item.topic}</span>
                </div>
              </ItemBot>
            </li>
            <hr />
          </>
        ))}
      </ul>
      <PageNav>
        <div>
          <span>←</span>
          <span>Previous</span>
        </div>
        <ul>
          <li>
            <span>1</span>
          </li>
          <li>
            <span>2</span>
          </li>
          <li>
            <span>3</span>
          </li>
          <li>
            <span>4</span>
          </li>
          <li>
            <span>5</span>
          </li>
          <li>
            <span>...</span>
          </li>
          <li>
            <span>535</span>
          </li>
        </ul>
        <div>
          <span>→</span>
          <span>Next</span>
        </div>
      </PageNav>
    </StyledBoard>
  );
};

export default Vote;
