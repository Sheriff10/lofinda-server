// middleware/validateWaitlist.js
const Joi = require("joi");
const response = require("../../utils/response");

// Define the Joi schema for validation
const waitlistSchema = Joi.object({
	firstname: Joi.string().min(1).required(),
	lastname: Joi.string().min(1).required(),
	email: Joi.string().email().required(),
	phone_number: Joi.string().required(),
});

// Middleware to validate req.body using Joi
const validateWaitlist = (req, res, next) => {
	const { error } = waitlistSchema.validate(req.body);
	if (error) {
		return response(res, 400, error.details[0].message);
	}
	next();
};

module.exports = validateWaitlist;
