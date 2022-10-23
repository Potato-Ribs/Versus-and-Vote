import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledCommentItem = styled.li`
  width: 100%;
  border-top: solid 1px black;
  :first-child {
    border: none;
  }
  .comment-header {
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
  }
  .comment-info {
    display: grid;
  }
  .comment-user-avatar {
    grid-column: 1/2;
    grid-row: 1/3;
  }
  .comment-user-nickname {
    grid-column: 2/3;
  }
  .createdAt {
    grid-column: 2/3;
    grid-row: 2/3;
  }
  .article-interaction {
    grid-row: 1/3;
  }
  .comment-content {
    padding-bottom: 1rem;
  }
`;

const CommentItem = () => {
  return (
    <StyledCommentItem className="CommentItem">
      <div className="comment-header">
        <div className="comment-info">
          <img className="comment-user-avatar" src="" alt="author avatar" />
          <div className="comment-user-nickname">닉네임</div>
          <div className="createdAt">4분전</div>
        </div>
        <div className="comment-likes">
          {/** 좋아요 클릭 여부, 좋아요 수 */}
          <FontAwesomeIcon className="icon" icon={regular("thumbs-up")} />
          <FontAwesomeIcon className="icon" icon={solid("thumbs-up")} />
        </div>
      </div>
      <div className="comment-content">대충 댓글 내용</div>
    </StyledCommentItem>
  );
};
export default CommentItem;
