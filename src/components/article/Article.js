import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
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
  return (
    <StyledArticle className="Article">
      <TextWithLines text="게시판이름" textPosition="left" />
      <div className="article-header">
        <div className="article-info">
          <img className="user-avatar" src="" alt="author avatar" />
          <div className="user-nickname">닉네임</div>
          <div className="createdAt">4분전</div>
        </div>
        <div className="article-interaction">
          <FontAwesomeIcon
            className="icon"
            icon={regular("share-from-square")}
          />
        </div>
      </div>
      <h1 className="article-title">글제목</h1>
      <div className="article-content">
        Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet erat
        nullam tortor quis elit lacus blandit vitae. Nostra dapibus bibendum;
        curae magnis commodo metus vestibulum tristique. Tristique volutpat
        consectetur congue lorem pharetra habitant. Sodales gravida egestas
        venenatis dignissim molestie cursus porta. Massa lacus pulvinar aliquam
        mi tristique.Lorem ipsum odor amet, consectetuer adipiscing elit.
        Imperdiet erat nullam tortor quis elit lacus blandit vitae. Nostra
        dapibus bibendum; curae magnis commodo metus vestibulum tristique.
        Tristique volutpat consectetur congue lorem pharetra habitant. Sodales
        gravida egestas venenatis dignissim molestie cursus porta. Massa lacus
        pulvinar aliquam mi tristique.Lorem ipsum odor amet, consectetuer
        adipiscing elit. Imperdiet erat nullam tortor quis elit lacus blandit
        vitae. Nostra dapibus bibendum; curae magnis commodo metus vestibulum
        tristique. Tristique volutpat consectetur congue lorem pharetra
        habitant. Sodales gravida egestas venenatis dignissim molestie cursus
        porta. Massa lacus pulvinar aliquam mi tristique.Lorem ipsum odor amet,
        consectetuer adipiscing elit. Imperdiet erat nullam tortor quis elit
        lacus blandit vitae. Nostra dapibus bibendum; curae magnis commodo metus
        vestibulum tristique. Tristique volutpat consectetur congue lorem
        pharetra habitant. Sodales gravida egestas venenatis dignissim molestie
        cursus porta. Massa lacus pulvinar aliquam mi tristique.
      </div>
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
      <Comment articleId />
    </StyledArticle>
  );
};

export default Article;
