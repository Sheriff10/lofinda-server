const { Schema, default: mongoose } = require("mongoose");

const orderSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		products: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: { type: Number, required: true },
			},
		],
		totalAmount: { type: Number, required: true },
	},
	{ timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
