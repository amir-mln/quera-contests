import React, { useMemo } from "react";
import CommentList from "./components/CommentList";

function filterByParentIdOf(expectedValue) {
  return function ({ parentId }) {
    return parentId === expectedValue;
  };
}

const App = ({ comments }) => {
  // You should reformat comments based on requirements
  const parentComments = useMemo(() => {
    for (const comment of comments) {
      if (comment.parentId === null) {
        comment.isRoot = true;
      }
      comment.children = comments.filter(filterByParentIdOf(comment.id));
    }

    const parentComments = comments.filter(filterByParentIdOf(null));

    return parentComments;
  }, [comments]);

  return <CommentList comments={parentComments} />;
};

export default App;
