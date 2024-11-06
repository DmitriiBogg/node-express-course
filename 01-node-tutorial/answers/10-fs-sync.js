const { readFileSync, writeFileSync } = require("fs");

writeFileSync("./temporary/fileA.txt", "This is line 1\n");
writeFileSync("./temporary/fileA.txt", "This is line 2\n", { flag: "a" });
writeFileSync("./temporary/fileA.txt", "This is line 3\n", { flag: "a" });

const result = readFileSync("./temporary/fileA.txt", "utf8");
console.log(result);
