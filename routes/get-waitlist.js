const express = require("express");
const Waitlist = require("../model/Waitlist");

const router = express.Router();

router.get("/", [], async (req, res) => {
	const waitlist = await Waitlist.find({});

	res.send(waitlist);
});

module.exports = router;
