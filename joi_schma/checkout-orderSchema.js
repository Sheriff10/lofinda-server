const Joi = require("joi");

const orderSchema = Joi.object({
	products: Joi.array()
		.items(
			Joi.object({
				productID: Joi.string().required(),
				quantity: Joi.number().required(),
			}),
		)
		.required(),
	totalAmount: Joi.number().required(),
});

module.exports = orderSchema;
