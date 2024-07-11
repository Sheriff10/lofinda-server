const Joi = require("joi");

const updateUserSchema = Joi.object({
	username: Joi.string().min(3).max(30).required(),
	email: Joi.string().email().required(),
	firstname: Joi.string().min(1).max(50).required(),
	lastname: Joi.string().min(1).max(50).required(),
	address: Joi.string().min(5).max(100).required(),
	address2: Joi.string().min(5).max(100).optional(),
});

module.exports = updateUserSchema;
