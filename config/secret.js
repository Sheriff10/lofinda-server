const dotenv = require("dotenv");
dotenv.config();

const secret = {
	MONGODB_URI: process.env.MONGODB_URI,
};

module.exports = secret;
