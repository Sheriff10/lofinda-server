const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_USER_KEY } = require("../config/secret");
const response = require("../utils/response");

const Auth = async (req, res, next) => {
	const token = req.header("auth-user-token"); // input the name of the header value for the token

	if (!token) {
		// You can use the default response comented below the custom response
		return response(res, 401, "Token not provided", "no token found");
		// res.status(401).json({ error: "Token not provided" });
	}

	try {
		const decoded = jwt.verify(token, JWT_USER_KEY);
		const user = await User.findById(decoded._id); // query to find user data
		req.user = user;

		next();
	} catch (err) {
		// You can use the default response comented below the custom response
		response(res, 401, "Token expired", "user-token expired");
		//   res.status(401).json({ error: "Invalid token" });
	}
};

module.exports = Auth;
