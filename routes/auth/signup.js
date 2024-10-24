const express = require("express");
const bcrypt = require("bcryptjs");

const signUpSchema = require("../../joi_schma/signupSchma");
const User = require("../../models/User");
const Token = require("../../utils/Generate-Token");
const response = require("../../utils/response");
const Wallet = require("../../models/Wallet");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = signUpSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      phone: req.body.phone,
      address: req.body.address,
      password: hashedPassword,
    });

    await user.save();

    // Initiate wallet for user
    const wallet = new Wallet({ user: user._id });
    await wallet.save();

    // Generate JWT token
    const token = new Token();
    const userToken = token.userToken({ _id: user._id });

    res.header("auth-user-token", userToken);
    res.header("Access-Control-Expose-Headers", "auth-user-token");
    return response(res, 200, "User created successfully");
  } catch (ex) {
    res.status(500).send("Something went wrong.");
    console.log(ex);
  }
});

module.exports = router;
