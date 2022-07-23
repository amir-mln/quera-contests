const readline = require("readline");

const inputs = [];
let max = null;
let counter = 1;
const PERSPOLIS = "perspolis";
const ESTEGHLAL = "esteghlal";
const PENALTY = "penalty";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", function (line) {
  if (!max) {
    max = +line;
  } else {
    inputs.push(line.split(" ").map(Number));
    counter += 1;
    if (counter > max) rl.close();
  }
});

rl.on("close", function () {
  for (const result of inputs) {
    const [pGoalsHost, eGoalsGuest, pGoalsGuest, eGoalsHost] = result;
    const pTotalGoals = pGoalsGuest + pGoalsHost;
    const eTotalGoals = eGoalsGuest + eGoalsHost;

    if (pTotalGoals !== eTotalGoals)
      console.log(pTotalGoals > eTotalGoals ? PERSPOLIS : ESTEGHLAL);
    else if (pGoalsGuest !== eGoalsGuest)
      console.log(pGoalsGuest > eGoalsGuest ? PERSPOLIS : ESTEGHLAL);
    else console.log(PENALTY);
  }
});
