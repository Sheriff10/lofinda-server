const { Router } = require("express");
const response = require("../../utils/response");
const Product = require("../../models/Product");

// Controller to get all products with optional filters (category, published) and pagination (limit, offset)
const getAllProducts = async (req, res) => {
  try {
    // Extract query parameters
    const { category, published, limit = 10, offset = 0 } = req.query;

    let filter = {};
    if (category !== "") {
      filter.category = category;
    }
    if (published !== "") {
      filter.published = published === "true";
    }

    const products = await Product.find(filter)
      .skip(Number(offset))
      .limit(Number(limit))
      .exec();

    // Send response
    return response(
      res,
      200,
      {
        products,
      },
      "Products fetched successfully"
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const router = Router();

router.get("/", getAllProducts);

module.exports = router;
