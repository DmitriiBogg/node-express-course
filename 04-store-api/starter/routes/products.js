const express = require("express");
const router = express.Router();

const {
  getALLProducts,
  getALLProductsStatic,
} = require("../controllers/products");

router.route("/").get(getALLProducts);
router.route("/static").get(getALLProductsStatic);

module.exports = router;
