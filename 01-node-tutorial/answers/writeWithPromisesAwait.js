const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    await writeFile("temp.txt", "line 1\n");
    await writeFile("temp.txt", "line 2\n", { flag: "a" });
    await writeFile("temp.txt", "line 3\n", { flag: "a" });
    console.log("done");
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const reader = async () => {
  try {
    const data = await readFile("temp.txt", "utf8");
    console.log("file information:\n", data);
  } catch (error) {
    console.error("error reading:", error);
  }
};

const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();
