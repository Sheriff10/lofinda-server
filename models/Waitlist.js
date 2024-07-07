const mongoose = require("mongoose");

const WaitlistSchema = new mongoose.Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true },
	phone_number: { type: Number, required: true },
});

const Waitlist = mongoose.model("waitlist", WaitlistSchema);

module.exports = Waitlist;
