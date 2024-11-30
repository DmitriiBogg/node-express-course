const express = require("express");
const { products } = require("./data");
const app = express();
const PORT = 3000;

// middleware
app.use(express.static("./public"));

// API test way  Json
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

// API product way
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

// API way for find product ID
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID); // Get ID from params
  const product = products.find((p) => p.id === idToFind); // find the product use the ID
  // if the product not founded
  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }
  // if product founded
  res.json(product);
});

// Search product
app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query; // got parametres
  let filteredProducts = [...products]; // copy massive products use Spread operator

  // filter search
  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  // filter by regex
  if (regex) {
    const regExp = new RegExp(regex, "i");
    filteredProducts = filteredProducts.filter((product) =>
      regExp.test(product.name)
    );
  }

  // filter by maxPrice
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= parseFloat(maxPrice)
    );
  }
  // limit of products
  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number(limit));
  }

  // if massive is empty
  if (filteredProducts.length === 0) {
    return res.status(200).json({ message: "No products matched your query." });
  }

  // return products after filter
  res.json(filteredProducts);
});

// 404
app.all("*", (req, res) => {
  res.status(404).send("<h1> Page not Found </h1>");
});

// server
app.listen(PORT, () => {
  console.log(`The server is work in: http://localhost:${PORT}`);
});
