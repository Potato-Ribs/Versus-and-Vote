import styled from "styled-components";
import { BASE_URL } from "../../util/api";
import CommentItem from "./CommentItem";

const StyledComment = styled.div`
  padding: 2rem 0;
  .submit-comment {
    box-sizing: border-box;
    border: gray 1px solid;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin: 2.5rem 0;
    display: grid;
    grid-template-columns: 3rem auto;
  }
  .user-avatar {
    width: 3rem;
    grid-column: 1/2;
  }
  .comment-input {
    box-sizing: border-box;
    width: 100%;
    height: 4rem;
    resize: none;
    border: black 1px solid;
    border-radius: 0.4rem;
    padding: 0.5rem 0.7rem;
    grid-column: 2/3;
  }
  .comment-submit-button {
    width: fit-content;
    justify-self: end;
    margin-top: 0.7rem;
  }
  .comments-list {
    display: grid;
    gap: 1rem;
  }
`;

const Comment = ({ articleId }) => {
  // articleId에 해당하는 댓글 리스트 불러오기
  return (
    <StyledComment className="Comment">
      <div className="numberof-comments">2개의 댓글</div>
      <form className="submit-comment">
        <img className="user-avatar" src="" alt="user avatar" />
        {/** 로그인 유저정보 있을경우 input, 없으면 div 렌더 */}
        {/* <textarea className="comment-input" ></textarea> */}
        <div className="comment-input">
          댓글을 쓰려면 <a href={BASE_URL + "login"}>로그인</a>이 필요합니다.
        </div>
        <button className="comment-submit-button">댓글 쓰기</button>
      </form>
      <ul className="comments-list">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        {/** 댓글 리스트 출력 */}
      </ul>
    </StyledComment>
  );
};

export default Comment;
