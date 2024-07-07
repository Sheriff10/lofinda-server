const jwt = require("jsonwebtoken");
require("dotenv").config();

// Ensure you add your JWT_USER_KEY & JWT_ADMIN_KEY to
// .env file. you can rename the methods (functions) to whatever you like

class Token {
	// generate token for User authorization
	userToken = (data) => {
		const token = jwt.sign(data, process.env.JWT_USER_KEY);
		return token;
	};

	// generate Admin token for authorization
	adminToken = (data) => {
		const token = jwt.sign(data, process.env.JWT_ADMIN_KEY);
		return token;
	};
}

module.exports = Token;
