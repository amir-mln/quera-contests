function solve(arrOfPoints) {
  const sortedArrOfPoints = Array.from(arrOfPoints).sort((a, b) => a - b);
  const length = arrOfPoints.length;
  const isEven = length % 2 === 0;
  const midIndex = isEven ? length / 2 : (length - 1) / 2;

  const min = sortedArrOfPoints[0]; /* or we can: Math.min(...arrOfPoints);*/
  const max =
    sortedArrOfPoints[length - 1]; /* or we can: Math.max(...arrOfPoints);*/
  const median = isEven
    ? (sortedArrOfPoints[midIndex] + sortedArrOfPoints[midIndex - 1]) / 2
    : sortedArrOfPoints[midIndex];
  return {
    min,
    max,
    median,
  };
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
  const { min, max, median } = solve(JSON.parse(line));

  console.log(JSON.stringify({ min, max, median }));
}
