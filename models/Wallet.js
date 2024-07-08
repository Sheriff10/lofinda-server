const { Schema, default: mongoose } = require("mongoose");

const walletSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		transactions: [
			{
				type: {
					type: String,
					enum: ["credit", "debit"],
					required: true,
				},
				amount: { type: Number, required: true },
				date: { type: Date, default: Date.now },
			},
		],
	},
	{ timestamps: true },
);

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
