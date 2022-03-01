const n = +readline();

function nonRecursive(x) {
  if (x < 0) return 0;
  const dp = { 0: doSomething(1) + doSomething(0) };
  for (let i = 1; i <= x; i++) {
    dp[i] = doSomething(i + 1) + dp[i - 1] + doSomething(i);
  }
  return dp[x];
}

function doSomething(x) {
  return x * 2;
}

print(nonRecursive(n));
