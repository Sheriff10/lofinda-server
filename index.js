const express = require("express");
const noAuthroute = require("./routes/routes-importer/noAuthRoute");
const cors = require("cors");
require("./config/db");

// express initialization
const app = express();
app.use(express.json());

app.use(
	cors({
		origin: "*", // Allow requests from any origin
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow the specified methods
		credentials: true, // Allow credentials (cookies, authorization headers, etc.)
	}),
);

// Route Imports
noAuthroute(app);
app.get("/", (req, res) => {
	res.send({ Message: "Lofinda Server is Live... " });
});



app.listen(5000 || process.env.PORT, () => {
	console.log("Lofinda Server is live at Port:5000");
});
