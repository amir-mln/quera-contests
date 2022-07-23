const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let cases;
let dimensions = [];

rl.on("line", function (line) {
  if (!cases) cases = +line;
  else {
    dimensions.push(line.split(" ").map(Number));
    dimensions.length === cases && rl.close();
  }
});

rl.on("close", function () {
  for (const dimension of dimensions) {
    const [y, x, height, length] = dimension;
    const area = y * x;
    let greedyHeight = height === 1 ? height : height + height - 1;
    let greedyLength = length === 1 ? length : length + length - 1;

    greedyHeight = Math.min(greedyHeight, y);
    greedyLength = Math.min(greedyLength, x);

    if (height === 1 || length === 1) {
      const blocksPerColumn = Math.ceil(y / greedyHeight);
      const blocksPerRows = Math.ceil(x / greedyLength);

      console.log(blocksPerRows * blocksPerColumn);
    } else {
      console.log(Math.floor(area / (greedyHeight * greedyLength))); // ceil?
    }
  }
});
