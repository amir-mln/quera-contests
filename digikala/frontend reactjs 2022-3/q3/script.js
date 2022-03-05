const breakPoints = ["xs", "sm", "md", "lg"];

// d-flex d-inline xs:d-flex sm:d-inline sm:d-flex lg:d-flex

function processDisplays(string) {
  const matches = string.match(
    /d-(flex|inline|inline-flex|inline-block|block)/gm
  );
  let processedBrs = "";

  for (const br of breakPoints) {
    const reg = new RegExp(
      `${br}:d-(flex|inline|inline-flex|inline-block|block)`,
      "gm"
    );
    const brMatches = string.match(reg);
    processedBrs += brMatches ? `${brMatches[brMatches.length - 1]} ` : "";
  }

  const processed = matches ? matches[matches.length - 1] : "";
  return processed + " " + processedBrs;
}

// 'overflow-auto', 'overflow-x-none'
function processOverflow(string) {
  const matches = string.match(
    /(?<=overflow-)(hidden|visible|scroll|auto|none)/
  );
}

function purgeClassNames(...classNames) {
  const joined = classNames.join(" ");
  const processedDisplay = processDisplays(joined);
  const cleaned = joined.replace(
    /(xs|sm|md|lg)?d-(flex|inline|inline-flex|inline-block|block)/gm,
    ""
  );

  return processedDisplay + " " + cleaned;
}

document.getElementById("input").onkeyup = function () {
  document.getElementById("output").innerHTML = purgeClassNames(
    ...this.value.trim().split(/\s+/)
  );
};
