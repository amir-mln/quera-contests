function filterParentIdField(comments) {
  let transformedArray = [];
  for (const commentObj of comments) {
    const { children, name, comment, id } = commentObj;
    transformedArray.push({
      id,
      name,
      comment,
      children: filterParentIdField(children),
    });
  }

  return transformedArray;
}

function solve(flatComments) {
  const copyComments = [...flatComments];
  let recursiveComments = [];

  //   creating the tree
  for (const rootComment of copyComments) {
    const { id } = rootComment;
    rootComment.children = [];

    for (const possibleChild of copyComments) {
      if (possibleChild.parentId === id)
        rootComment.children.push(possibleChild);
    }

    if (rootComment.parentId === null) recursiveComments.push(rootComment);
  }

  // removing the `parentId` field
  recursiveComments = filterParentIdField(recursiveComments);
  return recursiveComments;
}

/// /////////////////////////////////////////////////
/// ///////// DO NOT CHANGE FOLLOWING ///////////////
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.on("line", (data) => {
  main(data.trim());

  readline.close();
});

function unifyOutput(obj) {
  if (Array.isArray(obj)) {
    return obj.map(unifyOutput);
  }
  if (typeof obj !== "object" || obj === null) return obj;
  return {
    id: obj.id,
    name: obj.name,
    comment: obj.comment,
    children: obj.children,
  };
}

function main(line) {
  const transformedValue = unifyOutput(solve(JSON.parse(line)));
  console.log(JSON.stringify(transformedValue));
}
