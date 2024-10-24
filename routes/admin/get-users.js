const { Router } = require("express");
const User = require("../../models/User");
const response = require("../../utils/response");

// Controller to get all users with pagination (limit and offset)
const getAllUsers = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const users = await User.find()
      .skip(Number(offset))
      .limit(Number(limit))
      .select("-password")
      .exec();

    const totalUsers = await User.countDocuments();

    return response(res, 200, "Users fetched successfully", {
      totalUsers,
      users,
    });
  } catch (error) {
    console.error(error);
    // Use the custom response function for errors
    return response(res, 500, "Error fetching users", { error: error.message });
  }
};

const router = Router();

router.get("/", getAllUsers);

module.exports = router;
