const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const inputs = [];
const max = 2;
let counter = 1;

rl.on("line", function (line) {
  inputs.push(line.split(" "));
  counter += 1;
  if (counter > max) rl.close();
});

rl.on("close", function () {
  const series = inputs[1];
  const occurrences = {};
  let answer = 0;

  for (const num of series) {
    if (num in occurrences) occurrences[num] += 1;
    else occurrences[num] = 1;
  }

  for (const occ in occurrences) {
    if (occurrences[occ] === 1) {
      answer ^= +occ;
    }
  }

  console.log(answer);
});
