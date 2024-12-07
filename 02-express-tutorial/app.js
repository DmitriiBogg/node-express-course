const express = require("express");
const { products } = require("./data");
const peopleRouter = require("./routes/people"); // refactoring for people
const cookieParser = require("cookie-parser"); // Optional: for cookie-based authentication
const app = express();
const PORT = 3000;

// Middleware - function for time, method, url
const logger = (req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} ${req.url}`);
  next();
};

// logger for every request
app.use(logger);

// Optional: Middleware for parsing cookies
app.use(cookieParser());

// middleware for static files ( change my public way for other one from school... i feel pain after that)
app.use(express.static("./methods-public"));

// middleware for parsing body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//  Connection for people
app.use("/api/v1/people", peopleRouter); // use from routes/people.js

// API test way  Json
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

// API for products
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

// API route for finding product by ID (idk why we cant make it same like people)
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID); // Get ID from params
  const product = products.find((p) => p.id === idToFind); // find the product use the ID

  // If the product is not found
  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }

  // If the product is found
  res.json(product);
});

// Search products
app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query; // got parameters
  let filteredProducts = [...products]; // copy massive products use Spread operator

  // filter search
  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  // limit of products
  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number(limit));
  }

  // if array is empty
  if (filteredProducts.length === 0) {
    return res.status(200).json({ message: "No products matched your query." });
  }

  // return products after filter
  res.json(filteredProducts);
});

// Cookie-based authentication routes (optional)
app.post("/logon", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }
  res.cookie("name", name);
  res.status(201).json({ success: true, message: `Welcome, ${name}` });
});

app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  res.status(200).json({ success: true, message: "You have been logged off" });
});

const auth = (req, res, next) => {
  if (req.cookies.name) {
    req.user = req.cookies.name;
    next();
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

app.get("/test", auth, (req, res) => {
  res.status(200).json({ success: true, message: `Welcome back, ${req.user}` });
});

// error 404 handler
app.all("*", (req, res) => {
  res.status(404).send("<h1> Page not Found </h1>");
});

// server checking
app.listen(PORT, () => {
  console.log(`The server is working at: http://localhost:${PORT}`);
});
