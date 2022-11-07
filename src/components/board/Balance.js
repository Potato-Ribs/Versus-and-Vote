import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { BtnAccent } from "../button/BtnAccent";
import { BtnDefault } from "../button/BtnDefault";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  updateDoc,
  increment,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../fbase";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

const StyledBoard = styled.div`
  box-sizing: border-box;
  min-width: 700px;
  padding: 0 2rem;

  .board-title {
    height: 90px;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.textColorOpacity};
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
        margin-top: 50px;
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
    color: ${(props) => props.theme.textColor};
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
  const balanceMatch = useMatch("/:balanceId");
  const { scrollY } = useScroll();
  const [lastVisible, setLastVisible] = useState();

  const onOverlayClick = () => {
    navigate(-1);
    setTimeout(() => setIsSubmit(false), 1000);
  };

  const getNextPosts = () => {
    let q;
    if (lastVisible === -1) {
      return;
    } else if (lastVisible) {
      q = query(
        collection(db, "balance"),
        orderBy("createdAt", "desc"),
        limit(1),
        startAfter(lastVisible)
      );
      console.log("firstquery");
    } else {
      q = query(
        collection(db, "balance"),
        orderBy("createdAt", "desc"),
        limit(2)
      );
      console.log("secondquery");
    }

    onSnapshot(q, (snapshot) => {
      setItemsForBalance((pre) => {
        const arr = [...pre];
        snapshot.forEach((doc) => {
          if (arr.filter((el) => el.id === doc.id).length === 0) {
            arr.push({ id: doc.id, ...doc.data() });
          }
        });
        return arr;
      });

      if (snapshot.docs.length === 0) {
        setLastVisible(-1);
      } else {
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      }
    });
  };

  useBottomScrollListener(getNextPosts);

  useEffect(() => {
    getNextPosts();
  }, []);

  const onClickBalance = (item) => {
    setCurItem(item);
  };

  const onPlusNum = async (id, field) => {
    const ref = doc(db, "balance", id);

    await updateDoc(ref, {
      [field]: increment(1),
    });

    onSnapshot(doc(db, "balance", id), (doc) => {
      setCurItem(doc.data());
    });
  };

  const onClickAnswer = async (id, field) => {
    await onPlusNum(id, field);
    setIsSubmit(true);
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
        <BtnDefault>⬇️ 최신순</BtnDefault>
      </div>
      <hr />
      <ul className="items-containter">
        {itemsForBalance.map((item) => (
          <div key={item.id}>
            <li className="item">
              <Link
                to={"/" + item.id}
                onClick={() => onClickBalance(item)}
                style={{ textDecoration: "none" }}
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
          </div>
        ))}
      </ul>
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
                <AnswerBox onClick={() => onClickAnswer(curItem.id, "leftNum")}>
                  {curItem.leftStr}
                </AnswerBox>
                {isSubmit && <span>{curItem.leftNum}</span>}
                <VersusBox>vs</VersusBox>
                {isSubmit && <span>{curItem.rightNum}</span>}
                <AnswerBox
                  onClick={() => onClickAnswer(curItem.id, "rightNum")}
                >
                  {curItem.rightStr}
                </AnswerBox>
              </ModalMid>
              <ModalBot>
                <EmojiBox
                  onClick={() => onPlusNum(curItem.id, "emjLove")}
                >{`Love ${curItem.emjLove}`}</EmojiBox>
                <EmojiBox
                  onClick={() => onPlusNum(curItem.id, "emjGood")}
                >{`Good ${curItem.emjGood}`}</EmojiBox>
                <EmojiBox
                  onClick={() => onPlusNum(curItem.id, "emjFunny")}
                >{`Funny ${curItem.emjFunny}`}</EmojiBox>
                <EmojiBox
                  onClick={() => onPlusNum(curItem.id, "emjSad")}
                >{`Sad ${curItem.emjSad}`}</EmojiBox>
                <EmojiBox
                  onClick={() => onPlusNum(curItem.id, "emjDizzy")}
                >{`Dizzy ${curItem.emjDizzy}`}</EmojiBox>
                <EmojiBox
                  onClick={() => onPlusNum(curItem.id, "emjBad")}
                >{`Bad ${curItem.emjBad}`}</EmojiBox>
              </ModalBot>
            </ArticleModal>
          </>
        ) : null}
      </AnimatePresence>
    </StyledBoard>
  );
};

export default Balance;
