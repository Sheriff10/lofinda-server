const Joi = require("joi");

const productIdsSchema = Joi.array()
	.items(
		Joi.object({
			productId: Joi.string().required(),
		}),
	)
	.required();

module.exports = productIdsSchema;
