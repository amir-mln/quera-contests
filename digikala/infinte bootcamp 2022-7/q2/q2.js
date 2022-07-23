const readline = require("readline");

let netProfit;
let oppsCount;
const opportunities = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", function (line) {
  if (!netProfit && !oppsCount) {
    const [n, m] = line.split(" ").map(Number);
    oppsCount = n;
    netProfit = m;
  } else {
    opportunities.push(line.split(" ").map(Number));
    opportunities.length === oppsCount && rl.close();
  }
});

rl.on("close", function () {
  opportunities.sort(([opp1DailyProf, opp1Cost], [opp2DailyProf, opp2Cost]) =>
    (opp1Cost + netProfit) / opp1DailyProf <=
    (opp2Cost + netProfit) / opp2DailyProf
      ? -1
      : 1
  );

  let cart = { days: Number.POSITIVE_INFINITY, profit: 0, cost: 0 };

  for (const opportunity of opportunities) {
    const [oppDailyProf, oppCost] = opportunity;
    const newProfit = cart.profit + oppDailyProf;
    const newCost = cart.cost + oppCost;
    const newDays = Math.ceil((newCost + netProfit) / newProfit);

    if (newDays < cart.days)
      cart = {
        days: newDays,
        cost: newCost,
        profit: newProfit,
      };
    else break;
  }

  console.log(cart.days);
});
