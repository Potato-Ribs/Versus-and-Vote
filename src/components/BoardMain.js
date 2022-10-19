import styled from "styled-components";

const StyledBoard = styled.div`
  width: 35vw;
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
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
    }
    .about-author {
      font-size: 0.875rem;
      display: flex;
      align-items: center;
    }
    .author-avatar {
      width: 20px;
      margin-right: 0.5rem;
    }
    .item-title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;

const BoardMain = ({ items }) => {
  return (
    <StyledBoard className="BoardMain">
      <div className="board-title">
        <h2 className="board-title-name">투표 게시판</h2>
      </div>
      <ul className="items-containter">
        {items.map((item) => (
          <li className="item" key={item.id}>
            <div className="item-detail">
              <div className="about-author">
                <img
                  className="author-avatar"
                  src={item.authorAvatar}
                  alt="avatar img"
                />
                {`${item.author} · ${item.createdAt}`}
              </div>
              <div className="about-item">
                {`${item.likes} ${item.comments}`}
              </div>
            </div>
            <h3 className="item-title">{item.title}</h3>
          </li>
        ))}
      </ul>
    </StyledBoard>
  );
};

export default BoardMain;
