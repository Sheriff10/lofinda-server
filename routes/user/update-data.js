const express = require("express");
const Auth = require("../../middleware/Auth");
const response = require("../../utils/response");
const User = require("../../models/User");
const updateUserSchema = require("../../joi_schma/update-dataSchema");

const router = express.Router();

router.post("/", [Auth], async (req, res) => {
	try {
		// Validate request data
		const { error } = updateUserSchema.validate(req.body);
		if (error)
			return response(
				res,
				400,
				error.details[0].message,
				"Joi Validation",
			);

		// Extract user data from request body
		const { username, email, firstname, lastname, address, address2 } =
			req.body;

		// Find and update user data
		const user = await User.findByIdAndUpdate(
			req.user.id,
			{
				username,
				email,
				firstname,
				lastname,
				address,
				address2,
			},
			{ new: true },
		);

		if (!user) return response(res, 404, "User not found", "404");

		// Send updated user data as response
		response(res, 200, user, "User data updated");
	} catch (error) {
		console.log(error);
        response(res, 500, "Internal Server Error", "error");
	}
});

module.exports = router;
