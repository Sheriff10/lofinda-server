const waitlist = require("../waitlist");
const getWaitlist = require("../get-waitlist");
const getProducts = require("../get-products");

// User Authenticatiion Modules
const login = require("../auth/login");
const signup = require("../auth/signup");

// Admin Modules
const addProduct = require("../admin/add-product");

const noAuthroute = (app) => {
	app.use("/api/waitlist", waitlist);
	app.use("/api/get-waitlist", getWaitlist);

	app.use("/api/get-products", getProducts);

	// User Authenticatiion routes
	app.use("/api/auth/login", login);
	app.use("/api/auth/signup", signup);

	// Admin routes
	app.use("/api/admin/add-product", addProduct);
};

module.exports = noAuthroute;
