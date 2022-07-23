const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let planes = 0;
let bands = 0;
let planeIds = [];
let ordersCount = 0;
let orders = [];

const STATUS = {
  "TAKE-OFF": {
    1: "NO FREE BOUND",
    2: "YOU ARE TAKING OFF",
    3: "YOU ARE LANDING NOW",
    4: "YOU ARE NOT HERE",
  },
  LANDING: {
    1: "YOU ARE HERE",
    2: "YOU ARE TAKING OFF",
    3: "YOU ARE LANDING NOW",
    4: "NO FREE BOUND",
  },
};

const PLANE_STATUS = {};

let BANDS;

rl.on("line", function (line) {
  if (!planes && !bands) {
    const [n, k] = line.split(" ");
    planes = +n;
    bands = +k;
    return;
  }

  if (planeIds.length !== planes) {
    planeIds.push(line);
    return;
  }

  if (!ordersCount) return (ordersCount = +line);

  if (orders.length !== ordersCount) {
    orders.push(line);
    if (orders.length === ordersCount) rl.close();
  }
});

rl.on("close", function () {
  for (const planeId of planeIds) {
    PLANE_STATUS[planeId] = 1;
  }

  BANDS = Array(bands + 1).fill(-1);
  BANDS[0] = Number.POSITIVE_INFINITY;

  for (const order of orders) {
    const [orderKey, planeId] = order.split(" ");

    switch (orderKey) {
      case "TAKE-OFF": {
        const planeStatusIdx = PLANE_STATUS[planeId] || 4;
        const firstEmptyIdx = BANDS.indexOf(-1);

        if (planeStatusIdx === 1 && !!~firstEmptyIdx) {
          PLANE_STATUS[planeId] = 2;
          BANDS[firstEmptyIdx] = planeId;
        } else console.log(STATUS[orderKey][planeStatusIdx]);

        break;
      }
      case "LANDING": {
        const planeStatusIdx = PLANE_STATUS[planeId] || 4;
        const lastEmptyIdx = BANDS.lastIndexOf(-1);
        if (planeStatusIdx === 4 && !!~lastEmptyIdx) {
          PLANE_STATUS[planeId] = 3;
          BANDS[lastEmptyIdx] = planeId;
        } else console.log(STATUS[orderKey][planeStatusIdx]);
        break;
      }
      case "PLANE-STATUS": {
        console.log(PLANE_STATUS[planeId] || 4);
        break;
      }
      case "BAND-STATUS": {
        console.log(BANDS[planeId] === -1 ? "FREE" : BANDS[planeId]);
      }
      default:
        break;
    }
  }
});
