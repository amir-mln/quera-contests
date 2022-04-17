function solve({ url, params, query }) {
  // TODO: create finalURL and return it
  const indexOfFirsParam = url.indexOf("/:");
  let beforeParams = "";
  let replacedParams = "";
  let queries = Object.keys(query)
    .sort()
    .map((key) => {
      return `${key}=${query[key]}`;
    })
    .join("&");

  if (~indexOfFirsParam) {
    beforeParams = url.slice(0, indexOfFirsParam);
    replacedParams = url
      .slice(indexOfFirsParam)
      .split("/:")
      .map((possibleParam) => {
        const redundantSlashRemoved = possibleParam.replace("/", "");
        const validParam = redundantSlashRemoved in params;

        return validParam ? `/${params[redundantSlashRemoved]}` : "";
      })
      .join("");
  } else {
    beforeParams = url.slice(0, url.length - 1);
  }

  return `${beforeParams}${replacedParams}${queries ? "?" + queries : ""}`;
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
  console.log(solve(JSON.parse(line)));
}
