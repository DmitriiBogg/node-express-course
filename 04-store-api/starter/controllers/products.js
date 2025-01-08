const Product = require("../models/product");

const getALLProductsStatic = async (req, res) => {
  try {
    // price static filter
    const products = await Product.find({
      price: { $gte: 30 },
    }).sort("name");
    res.status(200).json({ products, nbHits: products.length });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

const getALLProducts = async (req, res) => {
  try {
    const {
      featured,
      company,
      name,
      price,
      rating,
      sort,
      fields,
      page,
      limit,
    } = req.query;

    // make filter object
    const queryObject = {};
    if (featured) {
      queryObject.featured = featured === "true"; // why he used ternary operator if it is boolean? just... if not === true , then false
    }
    if (company) {
      queryObject.company = company;
    }
    if (name) {
      queryObject.name = { $regex: name, $options: "i" }; // MongoDB operators
    }
    if (price) {
      const [operator, value] = price.split("_");
      queryObject.price = { [`$${operator}`]: Number(value) }; // idk why he used a lot "gt" ... like... $$ is match easier
    }
    if (rating) {
      const [operator, value] = rating.split("_");
      queryObject.rating = { [`$${operator}`]: Number(value) };
    }

    // pagination
    const productsPerPage = Number(limit) || 10; // elements on page
    const currentPage = Number(page) || 1; // page number
    const skip = (currentPage - 1) * productsPerPage;

    // concept:thenables - from our page of lesson
    let result = Product.find(queryObject).skip(skip).limit(productsPerPage);

    // sort
    if (sort) {
      const sortList = sort.split(",").join(" "); // change to format -  MongoDB. MB i needs use other code, but it looks ok
      result = result.sort(sortList);
    } else {
      result = result.sort("createdAt"); // usual sort
    }

    // fields choose
    if (fields) {
      const fieldsList = fields.split(",").join(" ");
      result = result.select(fieldsList);
    }

    const products = await result;

    res.status(200).json({ products, nbHits: products.length });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

module.exports = {
  getALLProductsStatic,
  getALLProducts,
};
