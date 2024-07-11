const dotenv = require("dotenv");
dotenv.config();

const secret = {
	MONGODB_URI: process.env.MONGODB_URI,
	JWT_USER_KEY: process.env.JWT_USER_KEY,
	JWT_ADMIN_KEY: process.env.JWT_ADMIN_KEY
};

module.exports = secret;
