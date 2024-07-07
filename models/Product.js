const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		stock: { type: Number, required: true },
	},
	{ timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
