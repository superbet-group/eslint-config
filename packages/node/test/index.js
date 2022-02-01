const fs = require("fs");
const { promisify } = require("util");

fs.stat(__filename, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stats);
  }
});

const customMethod = (callback) => {
  callback(null, "hello");
};

module.exports = {
  a: 1,
};

async function main() {
  const result = await promisify(customMethod)();
  console.log(result);

  if (!result) {
    process.exit(1);

    console.log("unreachable");
  }

  return 0;
}

main().then(process.exit);


