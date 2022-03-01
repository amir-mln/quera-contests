import React from "react";
import "./_styles.scss";

const CommentBox = ({ id, user, info, children, depth = 0 }) => {
  return (
    <>
      <div
        data-testid={id}
        className="comment-box"
        style={{ marginLeft: depth * 16 + "px" }}
      >
        <p className="comment-box__user">
          {user.firstName} {user.lastName}
        </p>
        <p className="comment-box__description">{info.description}</p>
      </div>
      {children.map(({ id, user, info, children }) => (
        <CommentBox
          id={id}
          key={id}
          info={info}
          user={user}
          depth={depth + 1}
          children={children}
        />
      ))}
    </>
  );
};

export default CommentBox;
