const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  if (req.url === "/") {
    res.end("<h1>Welcome to our Home Page</h1>");
  } else if (req.url === "/about") {
    res.end("<h1>About Page: Here is our short history</h1>");
  } else {
    res.end(`
      <h1>Oops!</h1>
      <p>We can't seem to find the page you are looking for.</p>
      <a href="/">Go back to Home</a>
    `);
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
