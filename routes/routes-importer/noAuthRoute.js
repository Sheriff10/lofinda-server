const waitlist = require("../waitlist");
const noAuthroute = (app) => {
	app.use("/api/waitlist", waitlist);
};

module.exports = noAuthroute;
