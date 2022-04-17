function solve(arrOfApplicationScores) {
  let mostRelatedApplicationName = "";
  let currentHighestScore = Number.NEGATIVE_INFINITY;

  for (const possibleTarget of arrOfApplicationScores) {
    const [possibleTargetName, possibleTargetScore] = possibleTarget;

    if (possibleTargetScore >= currentHighestScore) {
      mostRelatedApplicationName = possibleTargetName;
      currentHighestScore = possibleTargetScore;
    }
  }

  // could also be solved like this
  //   let sortedApplications = Array.from(arrOfApplicationScores).sort((app1,app2) => app1[1]-app2[1]);
  //   const mostRelatedApplicationName = sortedApplication[sortedApplications.length-1][0]

  return mostRelatedApplicationName;
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

function main(line) {
  console.log(solve(JSON.parse(line)));
}
