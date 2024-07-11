const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");

const response = require("../../utils/response");
const orderSchema = require("../../joi_schma/checkout-orderSchema");
const Auth = require("../../middleware/Auth");
const Order = require("../../models/Order");

const router = express.Router();

// Route for creating a new order
router.post("/", [Auth], async (req, res) => {
	const { error } = orderSchema.validate(req.body);

	// Validate the request body
	if (error) {
		return response(res, 400, error.details[0].message, "validation_error");
	}

	const { products, totalAmount } = req.body;

	try {
		// Create a new order
		const newOrder = new Order({
			user: req.user._id,
			products: products.map((product) => ({
				product: product.productID,
				quantity: product.quantity,
			})),
			totalAmount,
			total_product: products.length,
		});

		// Save the order to the database
		const savedOrder = await newOrder.save();

		res.status(201).json(savedOrder);
	} catch (error) {
		console.error(error);
		response(res, 500, "Internal Server Error", "error");
	}
});

module.exports = router;
