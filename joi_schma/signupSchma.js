const Joi = require("joi");

const signUpSchema = Joi.object({
	firstname: Joi.string().min(1).max(50).required(),
	lastname: Joi.string().min(1).max(50).required(),
	email: Joi.string().email().required(),
	username: Joi.string().min(3).max(30).required(),
	password: Joi.string().min(6).max(255).required(),
});

module.exports = signUpSchema;
