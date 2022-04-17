function kebabToPascal(str) {
  //   return str
  //     .replace(/(^\w|(?<=\-)\w)/g, (ch) => ch.toUpperCase())
  //     .replace(/\-/, "");
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function isValidType(suspect) {
  return typeof suspect === "object" && suspect !== null;
}

function solve(kebabCaseObject) {
  const pascalCasedObject = Array.isArray(kebabCaseObject) ? [] : {};

  for (const key in kebabCaseObject) {
    if (Object.hasOwnProperty.call(kebabCaseObject, key)) {
      const value = kebabCaseObject[key];
      const pascalKey = kebabToPascal(key);
      const pascalValue = isValidType(value) ? solve(value) : value;
      pascalCasedObject[pascalKey] = pascalValue;
    }
  }

  return pascalCasedObject;
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

function sortObjectKeys(obj) {
  if (Array.isArray(obj)) return obj.map(sortObjectKeys);
  if (typeof obj !== "object" || obj === null) return obj;

  return Object.fromEntries(
    Object.entries(obj)
      .sort(([key], [secKey]) => (key < secKey ? -1 : 1))
      .map(([key, value]) => [key, sortObjectKeys(value)])
  );
}

function main(line) {
  const transformedValue = sortObjectKeys(solve(JSON.parse(line)));
  console.log(JSON.stringify(transformedValue));
}
