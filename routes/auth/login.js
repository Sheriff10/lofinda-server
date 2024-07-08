const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginSchema = require("../../joi_schma/loginSchema");
const User = require("../../models/User");
const response = require("../../utils/response");
const Token = require("../../utils/Generate-Token");

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		// Validate the request body
		const { error } = loginSchema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		// Check if the user exists
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(400).send("Invalid email or password.");

		// Validate the password
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password,
		);
		if (!validPassword)
			return response(res, 400, "Invalid email or password");

		// Generate JWT token
		const token = new Token();
		const userToken = token.userToken({ _id: user._id });

		res.header("auth-user-token", userToken);
		res.header("Access-Control-Expose-Headers", "auth-user-token");
		return response(res, 200, "User Authenticated");
	} catch (ex) {
		res.status(500).send("Something went wrong.");
	}
});

module.exports = router;
