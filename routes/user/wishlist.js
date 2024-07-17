const express = require("express");
const productIdsSchema = require("../../joi_schma/wishlistSchma");
const Product = require("../../models/Product");
const response = require("../../utils/response");
const Auth = require("../../middleware/Auth");

const router = express.Router();

// Joi schema for validation
productIdsSchema;

router.post("/", [Auth], async (req, res) => {
	// Changed to POST for receiving data in body
	const { error } = productIdsSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		const productIds = req.body.map((item) => item.productId);

		const products = await Product.find({ _id: { $in: productIds } });
		response(res, 200, products, "User wishlist product");
	} catch (error) {
		res.status(500).json({
			error: "An error occurred while fetching the products.",
		});
	}
});

module.exports = router;
