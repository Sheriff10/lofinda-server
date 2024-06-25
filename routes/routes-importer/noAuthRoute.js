const waitlist = require("../waitlist");
const getWaitlist = require("../get-waitlist");
const noAuthroute = (app) => {
	app.use("/api/waitlist", waitlist);
	app.use("/api/get-waitlist", getWaitlist);
};

module.exports = noAuthroute;
