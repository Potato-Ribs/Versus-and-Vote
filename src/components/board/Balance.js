import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { BtnAccent } from "../button/BtnAccent";
import { BtnDefault } from "../button/BtnDefault";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../fbase";
import { AnimatePresence, motion, useScroll } from "framer-motion";

const StyledBoard = styled.div`
  box-sizing: border-box;
  min-width: 700px;
  padding: 0 2rem;

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
        width: 200px;
        height: 40px;
        border: 1px solid black;
        border-radius: 20px;
        padding: 0 35px;
      }

      button {
        position: relative;
        left: 35px;
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
  align-items: center;
  gap: 15px;
  font-size: 14px;

  div {
    border-radius: 5px;
    padding: 5px 15px;
    color: ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.accentColorOpacity};
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.textColorOpacity};
  opacity: 0;
  z-index: 1;
`;

const ArticleModal = styled(motion.div)`
  position: absolute;
  width: 700px;
  height: 300px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2;
  background-color: ${(props) => props.theme.bgColor};
  padding: 50px;
  border-radius: 20px;

  hr {
    margin: 35px 0;
  }
`;

const ModalTop = styled.div`
  h1 {
    font-size: 32px;
    text-align: center;
    font-weight: 500;
  }
`;

const ModalMid = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 55px;
`;

const ModalBot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnswerBox = styled.div`
  padding: 30px;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.textColorOpacity};
  font-size: 18px;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.bgColorOpacity};
  }
`;

const VersusBox = styled.div`
  font-size: 28px;
`;

const EmojiBox = styled.div`
  border: 1px solid ${(props) => props.theme.textColorOpacity};
  padding: 20px 30px;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.bgColorOpacity};
  }
`;

const Balance = () => {
  const [itemsForBalance, setItemsForBalance] = useState([]);
  const [curItem, setCurItem] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const balanceMatch = useMatch("/balance/:balanceId");
  const { scrollY } = useScroll();

  const onOverlayClick = () => navigate(-1);

  useEffect(() => {
    const q = query(collection(db, "balance"), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      const itemsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItemsForBalance(itemsArray);
    });
  }, []);

  const onClickBalance = (item) => {
    setCurItem(item);
  };

  return (
    <StyledBoard className="BoardMain">
      <div className="board-title">
        <h2 className="board-title-name">밸런스 게임</h2>
      </div>
      <div className="board-util">
        <Link to="/write">
          <BtnAccent>✏️ 작성하기</BtnAccent>
        </Link>
        <ul className="board-tab">
          <li>기술</li>
          <li>커리어</li>
          <li>기타</li>
          <li>전체</li>
        </ul>
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
        {itemsForBalance.map((item) => (
          <>
            <li className="item" key={item.id}>
              <Link
                to={"/balance/" + item.id}
                onClick={() => onClickBalance(item)}
              >
                <ItemMid>
                  <h1>{item.title}</h1>
                </ItemMid>
              </Link>
              <ItemBot>
                <div>
                  <span>{`Love ${item.emjLove}`}</span>
                </div>
                <div>
                  <span>{`Good ${item.emjGood}`}</span>
                </div>
                <div>
                  <span>{`Funny ${item.emjFunny}`}</span>
                </div>
                <div>
                  <span>{`Sad ${item.emjSad}`}</span>
                </div>
                <div>
                  <span>{`Dizzy ${item.emjDizzy}`}</span>
                </div>
                <div>
                  <span>{`Bad ${item.emjBad}`}</span>
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
      <AnimatePresence>
        {balanceMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <ArticleModal
              style={{
                top: scrollY.get() + 300,
              }}
              layoutId={balanceMatch.params.balanceId}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ModalTop>
                <h1>{curItem.title}</h1>
              </ModalTop>
              <hr />
              <ModalMid>
                <AnswerBox>{curItem.leftStr}</AnswerBox>
                <VersusBox>vs</VersusBox>
                <AnswerBox>{curItem.rightStr}</AnswerBox>
              </ModalMid>
              <ModalBot>
                <EmojiBox>{`Love ${curItem.emjLove}`}</EmojiBox>
                <EmojiBox>{`Good ${curItem.emjGood}`}</EmojiBox>
                <EmojiBox>{`Funny ${curItem.emjFunny}`}</EmojiBox>
                <EmojiBox>{`Sad ${curItem.emjSad}`}</EmojiBox>
                <EmojiBox>{`Dizzy ${curItem.emjDizzy}`}</EmojiBox>
                <EmojiBox>{`Bad ${curItem.emjBad}`}</EmojiBox>
              </ModalBot>
            </ArticleModal>
          </>
        ) : null}
      </AnimatePresence>
    </StyledBoard>
  );
};

export default Balance;
