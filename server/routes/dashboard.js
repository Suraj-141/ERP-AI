const express = require("express");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Transaction = require("../models/Transaction");
const Employee = require("../models/Employee");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Get dashboard stats
router.get("/stats", protect, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalEmployees = await Employee.countDocuments();
    const lowStockProducts = await Product.countDocuments({
      $expr: { $lte: ["$quantity", "$reorderLevel"] },
    });

    // Calculate total revenue (income transactions)
    const revenueResult = await Transaction.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Calculate total expenses
    const expenseResult = await Transaction.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpenses = expenseResult[0]?.total || 0;

    // Order status breakdown
    const orderStatusBreakdown = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Revenue by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Transaction.aggregate([
      {
        $match: {
          type: "income",
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json({
      totalOrders,
      totalEmployees,
      lowStockProducts,
      totalRevenue,
      totalExpenses,
      orderStatusBreakdown,
      monthlyRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
