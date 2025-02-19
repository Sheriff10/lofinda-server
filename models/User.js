const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, default: " " },
    address2: { type: String, default: " " },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    walletBalance: { type: Number, default: 0 },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
