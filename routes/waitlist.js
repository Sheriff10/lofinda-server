const express = require("express");
const response = require("../utils/response");
const Waitlist = require("../model/Waitlist");
const validateWaitlist = require("../middleware/validators/validateWaitlist");

const router = express.Router();

router.post("/", [validateWaitlist], async (req, res) => {
	try {
		const { firstname, lastname, email, phone_number } = req.body;

		const findEmail = await Waitlist.findOne({ email });

		if (findEmail)
			return response(res, 400, "Email Exists.", "Duplicate Email");

		const newData = new Waitlist({
			firstname,
			lastname,
			email,
			phone_number,
		});
		newData.save(); // save new data
		response(res, 201, "Data successfully saved.", "New user Saved");
	} catch (error) {
		response(res, 500, "Internal Server Error");
		console.log("Error In Waitlist:", error);
	}
});

module.exports = router;
