function getCoordinates() {
  return [read(), read()];
  function read() {
    return readline()
      .split(" ")
      .map((xy) => xy.split(",").map((n) => +n));
  }
}

// [
//   [
//     [x,y],  <-- first(topLeft)
//     [x,y]   <-- first(bottomRight)
//   ],
//   [
//     [x,y],  <-- second(topLeft)
//     [x,y]   <-- second(bottomRight)
//   ]
// ]

function hasOverlap() {
  const coordinates = getCoordinates();
  let [
    [[FTopX, FTopY], [FBottomX, FBottomY]],
    [[STopX, STopY], [SBottomX, SBottomY]],
  ] = coordinates;

  if (STopX < FTopX) {
    [FTopX, STopX] = [STopX, FTopX];
    [FTopY, STopY] = [STopY, FTopY];
    [FBottomX, SBottomX] = [SBottomX, FBottomX];
    [FBottomY, SBottomY] = [SBottomY, FBottomY];
  }

  if (STopX <= FBottomX) {
    if (STopY >= FTopY && STopY <= FBottomY) return true;
    if (SBottomY >= FTopY && SBottomY <= FBottomY) return true;
  }

  return false;
}
print(hasOverlap() ? "yes" : "no");
