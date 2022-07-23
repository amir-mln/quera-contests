const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let temperatures = [];

rl.question("", function (name) {
  rl.question("", function (temps) {
    temperatures = temps.split(" ").map(Number);
    rl.close();
  });
});

rl.on("close", function () {
  for (const temp of temperatures)
    console.log(temp <= 15 ? "heater" : "cooler");
  process.exit(0);
});
