const mongoose = require("mongoose");
const { MONGODB_URI } = require("./secret");

mongoose.connect(MONGODB_URI).then(() => {
    console.info("Database Connected Successfully")
}).catch((error) => {
    console.error("Unable to connect to database " + error)
});