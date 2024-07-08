const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		password: { type: String, required: true },
		walletBalance: { type: Number, default: 0 },
		orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
	},
	{ timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
