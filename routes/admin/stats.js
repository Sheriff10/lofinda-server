const { Router } = require("express");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const User = require("../../models/User");

// Controller to get stats
const stats = async (req, res) => {
  try {
    // Total Orders
    const totalOrders = await Order.countDocuments();

    // Products Sold (sum of all products' quantities in all orders)
    const orders = await Order.find({});
    let totalProductsSold = 0;
    orders.forEach((order) => {
      order.products.forEach((item) => {
        totalProductsSold += item.quantity;
      });
    });

    // New Customers (users registered in the last 30 days)
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    const newCustomers = await User.countDocuments({
      createdAt: { $gte: last30Days },
    });

    // Total Customers
    const totalCustomers = await User.countDocuments();

    // Total Inventory (sum of all product stock)
    const totalInventory = await Product.aggregate([
      { $group: { _id: null, totalStock: { $sum: "$stock" } } },
    ]);
    const totalStock = totalInventory[0]?.totalStock || 0;

    // Out of Stock Products
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });

    // Active Users (users with at least one order)
    const activeUsers = await Order.distinct("user").then(
      (users) => users.length
    );

    // Total Price of Stock (sum of price * stock for all products)
    const products = await Product.find({});
    let totalPriceOfStock = 0;
    products.forEach((product) => {
      totalPriceOfStock += product.price * product.stock;
    });

    // Count of paid orders
    const paidCount = await Order.countDocuments({ payment: "paid" });

    // Count of pending orders
    const pendingCount = await Order.countDocuments({ payment: "pending" });

    // Send the stats as a response
    res.status(200).json({
      totalOrders,
      totalProductsSold,
      newCustomers,
      totalCustomers,
      totalStock,
      outOfStockProducts,
      activeUsers,
      totalPriceOfStock,
      paidCount,
      pendingCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stats" });
  }
};

const router = Router();

router.get("/", stats);

module.exports = router;
