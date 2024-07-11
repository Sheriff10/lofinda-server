const express = require("express");
const mongoose = require("mongoose");
const Auth = require("../../middleware/Auth");
const Order = require("../../models/Order");

const router = express.Router();

// GET route for fetching user's orders with a limit
router.get("/", [Auth], async (req, res) => {
	const { limit = 10 } = req.query;

	const user = req.user;

	try {
		// Convert limit to a number
		const limitNum = parseInt(limit, 10);

		// Fetch the orders for the given user with the specified limit
		const orders = await Order.find({ user: user._id })
			.select("_id totalAmount status total_product status createdAt")
			.sort({ createdAt: -1 })
			.limit(limitNum);
		// .populate("products.product", "name price"); // Adjust fields to populate as needed

		res.status(200).json(orders);
	} catch (error) {
		console.error(error);
		response(res, 500, "Internal Server Error", "error");
	}
});

module.exports = router;
