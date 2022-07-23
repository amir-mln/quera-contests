const readline = require("readline");

const inputs = [];
let max = null;
let counter = 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let factorialMem = [1, 1];

function factorial(n) {
  if (factorialMem[n]) return factorialMem[n];

  for (let i = 2; i <= n; i++) factorialMem[i] = i * factorialMem[i - 1];

  return factorialMem[n];
}

function subsetCounter(n, total) {
  return factorial(total) / (factorial(n) * factorial(total - n));
}

rl.on("line", function (line) {
  if (!max) {
    max = +line;
  } else {
    inputs.push(+line);
    counter += 1;
    if (counter > max) rl.close();
  }
});

rl.on("close", function () {
  for (const num of inputs) {
    let maxProfit = Number.NEGATIVE_INFINITY;
    let MaxProfitIndex = 0;
    let goldsOfIslands = [1];

    for (let i = 1; i <= Math.floor(num / 2); i++) {
      const islandGolds = subsetCounter(i, num) + goldsOfIslands[i - 1];
      const goldPrice = Math.pow(2, num - i);
      const currentProfit = islandGolds * goldPrice;

      goldsOfIslands[i] = islandGolds;

      if (currentProfit > maxProfit) {
        maxProfit = currentProfit;
        MaxProfitIndex = i;
      }
    }

    console.log(
      new Intl.NumberFormat().format(MaxProfitIndex).replaceAll(",", "")
    );
  }
});
