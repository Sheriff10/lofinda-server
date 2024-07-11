const express = require("express");
const Auth = require("../../middleware/Auth");
const response = require("../../utils/response");

const router = express.Router();

router.get("/", [Auth], async (req, res) => {
	try {
		const user = req.user;
		const userData = {
			username: user.username,
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
			address: user.address,
		};
		return response(res, 200, userData, "User Info");
	} catch (error) {
		console.log(error);
        response(res, 500, "Internal Server Error", "error");
	}
});

module.exports = router;
