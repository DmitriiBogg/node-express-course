const fs = require("fs");

const stream = fs.createReadStream("../answers/content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200,
});

let chunkCount = 0;

stream.on("data", (chunk) => {
  chunkCount++;
  console.log(`a fragment ${chunkCount}: ${chunk}`);
});

stream.on("end", () => {
  console.log(`reading end. their is are fragments: ${chunkCount}`);
});

stream.on("error", (error) => {
  console.error("error reading file:", error);
});
