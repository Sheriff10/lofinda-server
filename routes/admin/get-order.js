const { Router } = require("express");
const Order = require("../../models/Order");
const response = require("../../utils/response");

const getAllOrders = async (req, res) => {
  try {
    const { shipped, status, payment, limit = 10, offset = 0 } = req.query;

    let filter = {};
    if (shipped !== "") {
      filter.shipping = shipped === "true";
    }
    if (status !== "") {
      filter.status = status;
    }
    if (payment !== "") {
      filter.payment = payment;
    }
    console.log({ shipped, status, payment });

    const orders = await Order.find(filter)
      .skip(Number(offset))
      .limit(Number(limit))
      .populate("user", "_id firstname lastname")
      .exec();

    const totalOrders = await Order.countDocuments(filter);

    return response(res, 200, "Orders fetched successfully", {
      totalOrders,
      orders,
    });
  } catch (error) {
    console.error(error);
    return response(res, 500, "Error fetching orders", {
      error: error.message,
    });
  }
};

const router = Router();

router.get("/", getAllOrders);

module.exports = router;
