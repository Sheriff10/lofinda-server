const express = require("express");
const router = express.Router();
const Joi = require("joi");
const productSchema = require("../../joi_schma/productSchema");
const response = require("../../utils/response");
const Product = require("../../models/Product");

router.post("/", [], async (req, res) => {
	try {
		// Validate the request body
		const { error } = productSchema.validate(req.body);
		if (error)
			return response(
				res,
				400,
				error.details[0].message,
				"Joi Validation",
			);

		// Create a new product
		const product = new Product({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			stock: req.body.stock,
			category: req.body.category,
			imageUrl: req.body.imageUrl,
		});

		// Save the product to the database
		await product.save();

		response(res, 200, product, "New Product Added");
	} catch (err) {
		res.status(500).send("Something went wrong.");
	}
});

module.exports = router;
