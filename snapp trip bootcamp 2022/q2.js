const readline = require("readline");

const inputs = [];
let n = null;
let s = null;
let max = null;
let counter = 1;
let tempInput = [];

const keyToIndex = { A: 0, B: 1, C: 2, D: 3 };

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", function (line) {
  if (!n) return (n = +line);

  if (!s) return (s = line);

  if (!max) return (max = +line);

  tempInput.push(line);
  if (tempInput.length === n) {
    inputs.push(tempInput);
    tempInput = [];
    counter += 1;
  }
  if (counter > max) rl.close();
});

rl.on("close", function () {
  for (let i = 0; i < max; i++) {
    // paper
    let correctAnswers = 0;
    let falseAnswers = 0;

    for (let j = 0; j < n; j++) {
      // answers of paper
      const answerRow = inputs[i][j];
      const answerKey = s[j];
      const answerIndex = keyToIndex[answerKey];
      const markedPositions = {};
      let totalMarked = 0;

      for (let k = 0; k < answerRow.length; k++) {
        // each row of paper
        if (answerRow[k] === "#") markedPositions[k] = true;
      }

      totalMarked = Object.keys(markedPositions).length;

      if (totalMarked == 0) continue;

      if (totalMarked > 1 || !markedPositions[answerIndex]) {
        falseAnswers += 1;
        continue;
      }

      correctAnswers += 1;
    }

    console.log(3 * correctAnswers - falseAnswers);
  }
});
