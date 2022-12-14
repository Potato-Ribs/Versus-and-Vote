import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../fbase";

const StyledBoard = styled.div`
  width: 33vw;
  .board-title {
    height: 64px;
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
  .items-containter {
    list-style-type: none;
    margin: 0;
    padding: 0;
    .item:not(:last-child) {
      padding: 1rem 0;
      border-bottom: 1px solid Lightgray;
    }
    .item:last-child {
      padding-top: 1rem;
    }
    .item-detail {
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
    }
    .about-author {
      display: flex;
      align-items: center;
    }
    .author-avatar {
      width: 20px;
      margin-right: 0.5rem;
    }
    .about-item {
      display: flex;
    }
    .icon {
      margin: 0 3px;
    }
    .item-comments {
      margin-left: 8px;
    }
    .item-title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;

const BoardMain = ({ name, path }) => {
  const [itemsForMain, setItemsForMain] = useState([]);

  useEffect(() => {
    const q = query(collection(db, path), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      const itemsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItemsForMain(itemsArray);
    });
  }, [path]);

  console.log(itemsForMain);

  return (
    <StyledBoard className="BoardMain">
      <div className="board-title">
        <h2 className="board-title-name">{name}게시판</h2>
      </div>
      <ul className="items-containter">
        {itemsForMain.map((item, idx) => {
          return (
            idx < 6 && (
              <li className="item" key={item.id}>
                <div className="item-detail">
                  <div className="about-author">
                    <img
                      className="author-avatar"
                      src={item.photoURL}
                      alt="avatar img"
                    />
                    {`${item.displayName} · ${item.createdAt}`}
                  </div>
                  <div className="about-item">
                    <div className="item-likes">
                      <FontAwesomeIcon
                        className="icon"
                        icon={regular("thumbs-up")}
                      />
                      {item.likes}
                    </div>
                    <div className="item-comments">
                      <FontAwesomeIcon
                        className="icon"
                        icon={regular("comment")}
                      />
                      {item.comments}
                    </div>
                  </div>
                </div>
                <h3 className="item-title">{item.title}</h3>
              </li>
            )
          );
        })}
      </ul>
    </StyledBoard>
  );
};

export default BoardMain;
