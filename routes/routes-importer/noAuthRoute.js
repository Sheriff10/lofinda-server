const waitlist = require("../waitlist");
const getWaitlist = require("../get-waitlist");

// User Authenticatiion Modules
const login = require("../auth/login");
const signup = require("../auth/signup");

const noAuthroute = (app) => {
	app.use("/api/waitlist", waitlist);
	app.use("/api/get-waitlist", getWaitlist);

	// User Authenticatiion routes
	app.use("/api/auth/login", login);
	app.use("/api/auth/signup", signup);
};

module.exports = noAuthroute;
