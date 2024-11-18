const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const fileStream = fs.createReadStream(".answers/content/big.txt", "utf8");

    fileStream.on("open", () => {
      fileStream.pipe(res);
    });

    fileStream.on("error", (err) => {
      res.statusCode = 500;
      res.end("got error: " + err.message);
    });
  })
  .listen(5000, () => {
    console.log("The server is launched on the port 5000");
  });
