import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../fbase";
import TextWithLines from "../TextWithLines";
import Comment from "./Comment";
import Tag from "./Tag";

const StyledArticle = styled.div`
  width: 100%;
  padding: 0 2rem;
  .article-header {
    background-color: tomato;
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
  }
  .article-info {
    display: grid;
  }
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    grid-column: 1/2;
    grid-row: 1/3;
  }
  .user-nickname {
    grid-column: 2/3;
  }
  .createdAt {
    grid-column: 2/3;
    grid-row: 2/3;
  }
  .article-interaction {
    grid-row: 1/3;
  }
  .article-title {
    font-size: 2rem;
    margin: 2rem 0;
  }
  .article-content {
    margin-bottom: 2rem;
  }
  .tags-and-likes {
    display: flex;
    justify-content: space-between;
  }
  .tags-container {
    display: flex;
  }
`;

const Article = () => {
  const [articleData, setArticleData] = useState();
  const articleId = useParams().id;

  useEffect(() => {
    const articleRef = doc(db, "free", articleId);
    return async () => {
      const articleSnap = await getDoc(articleRef);
      setArticleData(articleSnap.data());
    };
  }, [articleId]);

  return (
    articleData && (
      <StyledArticle className="Article">
        <TextWithLines text="게시판이름" textPosition="left" />
        <div className="article-header">
          <div className="article-info">
            <img
              className="user-avatar"
              src={articleData.photoURL}
              alt="author avatar"
            />
            <div className="user-nickname">{articleData.displayName}</div>
            <div className="createdAt">{articleData.createdAt}</div>
          </div>
          <div className="article-interaction">
            <FontAwesomeIcon
              className="icon"
              icon={regular("share-from-square")}
            />
          </div>
        </div>
        <h1 className="article-title">{articleData.title}</h1>
        <div className="article-content">{articleData.text}</div>
        <div className="tags-and-likes">
          <div className="tags-container">
            <Tag tagContent="react" />
            <Tag tagContent="javascript" />
            <Tag tagContent="열받네" />
          </div>
          <div>
            <FontAwesomeIcon className="icon" icon={regular("thumbs-up")} />
            <FontAwesomeIcon className="icon" icon={solid("thumbs-up")} />
            {/** 좋아요 */}
          </div>
        </div>
        <Comment articleId={articleId} />
      </StyledArticle>
    )
  );
};

export default Article;
