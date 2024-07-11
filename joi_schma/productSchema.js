const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    category: Joi.string().required(),
    imageUrl: Joi.string().required()
});

module.exports = productSchema