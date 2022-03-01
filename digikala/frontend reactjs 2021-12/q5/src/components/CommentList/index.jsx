import React from "react";
import classnames from "classnames";
import CommentBox from "../CommentBox";
import "./_styles.scss";

const CommentList = ({ comments, depth = 0 }) => {
  return (
    <div className="root-list">
      {comments.map(({ isRoot, id, user, info, children }) => (
        <div
          data-testid="comment-wrapper"
          className={classnames({
            // Should be true for root comment
            "root-comment": !!isRoot,
          })}
          key={id}
        >
          {
            // Render comment and it's children here use CommentBox
          }
          <CommentBox
            id={id}
            user={user}
            info={info}
            depth={depth}
            children={children}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
