const waitlist = require("../waitlist");
const getWaitlist = require("../get-waitlist");
const getProducts = require("../get-products");

// User Authenticatiion Modules
const login = require("../auth/login");
const signup = require("../auth/signup");

// Admin Modules
const addProduct = require("../admin/add-product");

// User Modules
const userData = require("../user/get-user-data");
const updateUserData = require("../user/update-data");
const checkout = require("../user/checkout");
const getOrders = require("../user/get-orders");
const wishlist = require("../user/wishlist");

const noAuthroute = (app) => {
	app.use("/api/waitlist", waitlist);
	app.use("/api/get-waitlist", getWaitlist);

	app.use("/api/get-products", getProducts);

	// User Authenticatiion routes
	app.use("/api/auth/login", login);
	app.use("/api/auth/signup", signup);

	// Admin routes
	app.use("/api/admin/add-product", addProduct);

	// User Routes
	app.use("/api/user/data", userData);
	app.use("/api/user/data/update", updateUserData);
	app.use("/api/user/checkout", checkout);
	app.use("/api/user/orders", getOrders);
	app.use("/api/user/wishlist", wishlist);

};

module.exports = noAuthroute;
