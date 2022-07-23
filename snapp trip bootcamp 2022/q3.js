const readline = require("readline");

let netProfit;
let opportunities;
let counter = 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", function (line) {
  if (!netProfit && !opportunities) {
    const [n, m] = line.split(" ").map(Number);
    opportunities = n;
    netProfit = m;
  } else {
    rl.close();
  }
});

rl.on("close", function () {
  function getInfiniteFractionRoot(value, depth, maxDepth = num) {
    const node = { value };

    if (depth !== maxDepth) {
      node.right = getInfiniteFractionRoot(2 * value, depth + 1);
      node.left = getInfiniteFractionRoot(2 * value + 1, depth + 1);
    }

    return node;
  }

  function createLATEX(root) {
    let str = `${root.value}`;

    if (root.right || root.left)
      str += `+\\frac{${createLATEX(root.right)}}{${createLATEX(root.left)}}`;

    return str;
  }

  const root = getInfiniteFractionRoot(1, 1);

  console.log(createLATEX(root));
});
