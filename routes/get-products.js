const express = require("express");
const Product = require("../models/Product");
const response = require("../utils/response");

const router = express.Router();

router.get("/", [], async (req, res) => {
  const { limit } = req.query;
  const product = await Product.find({ published: true }).limit(limit);

  return response(res, 200, product, "all product");
});

module.exports = router;
