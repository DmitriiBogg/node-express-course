const { writeFile, readFile } = require("fs").promises;

writeFile("temp.txt", "line 1\n")
  .then(() => {
    return writeFile("temp.txt", "line 2\n", { flag: "a" });
  })
  .then(() => {
    return writeFile("temp.txt", "line 3\n", { flag: "a" });
  })
  .then(() => {
    return readFile("temp.txt", "utf8");
  })
  .then((data) => {
    console.log("file information:\n", data);
  })
  .catch((error) => {
    console.error("got error:", error);
  });
