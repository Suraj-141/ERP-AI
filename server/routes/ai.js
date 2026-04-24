const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Transaction = require("../models/Transaction");
const Employee = require("../models/Employee");
const { protect } = require("../middleware/auth");

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// AI Query endpoint
router.post("/query", protect, async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Please provide a question" });
    }

    const lowerQuestion = question.toLowerCase();
    let contextData = "";

    if (
      lowerQuestion.includes("stock") ||
      lowerQuestion.includes("inventory") ||
      lowerQuestion.includes("product") ||
      lowerQuestion.includes("low")
    ) {
      // Fetch low stock products
      const lowStockProducts = await Product.find({
        $expr: { $lte: ["$quantity", "$reorderLevel"] },
      }).limit(10);

      contextData = JSON.stringify({
        type: "low_stock_products",
        data: lowStockProducts,
      }).substring(0, 2000);
    } else if (
      lowerQuestion.includes("order") ||
      lowerQuestion.includes("pending") ||
      lowerQuestion.includes("shipped")
    ) {
      // Fetch recent orders with status breakdown
      const orders = await Order.find()
        .populate("items.product", "name sku")
        .sort({ createdAt: -1 })
        .limit(10);

      const statusBreakdown = await Order.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      contextData = JSON.stringify({
        type: "orders",
        recentOrders: orders,
        statusBreakdown,
      }).substring(0, 2000);
    } else if (
      lowerQuestion.includes("revenue") ||
      lowerQuestion.includes("expense") ||
      lowerQuestion.includes("finance") ||
      lowerQuestion.includes("income")
    ) {
      // Fetch last 30 days transactions
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const transactions = await Transaction.find({
        createdAt: { $gte: thirtyDaysAgo },
      })
        .populate("createdBy", "name")
        .sort({ createdAt: -1 })
        .limit(20);

      const totals = await Transaction.aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysAgo },
          },
        },
        {
          $group: {
            _id: "$type",
            total: { $sum: "$amount" },
          },
        },
      ]);

      contextData = JSON.stringify({
        type: "transactions",
        transactions,
        totals,
      }).substring(0, 2000);
    } else if (
      lowerQuestion.includes("employee") ||
      lowerQuestion.includes("staff") ||
      lowerQuestion.includes("department")
    ) {
      // Fetch employee list with departments
      const employees = await Employee.find()
        .populate("userId", "name email")
        .limit(20);

      const byDepartment = await Employee.aggregate([
        {
          $group: {
            _id: "$department",
            count: { $sum: 1 },
          },
        },
      ]);

      contextData = JSON.stringify({
        type: "employees",
        employees,
        byDepartment,
      }).substring(0, 2000);
    } else {
      // Default: fetch dashboard stats
      const totalOrders = await Order.countDocuments();
      const totalEmployees = await Employee.countDocuments();
      const totalProducts = await Product.countDocuments();
      const lowStockProducts = await Product.countDocuments({
        $expr: { $lte: ["$quantity", "$reorderLevel"] },
      });

      const revenueResult = await Transaction.aggregate([
        { $match: { type: "income" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);

      const expenseResult = await Transaction.aggregate([
        { $match: { type: "expense" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);

      contextData = JSON.stringify({
        type: "dashboard_stats",
        totalOrders,
        totalEmployees,
        totalProducts,
        lowStockProducts,
        totalRevenue: revenueResult[0]?.total || 0,
        totalExpenses: expenseResult[0]?.total || 0,
      });
    }

    // Call Gemini API with retry logic
    const systemPrompt = `You are an AI assistant for a business ERP system.
You have access to real business data provided below.
Answer questions clearly and concisely.
Use numbers and specifics from the data.
If asked something outside the data, say you don't have that info.`;

    let aiResponse;
    let retries = 2;
    
    while (retries > 0) {
      try {
        const response = await model.generateContent({
          contents: [{
            role: "user",
            parts: [{
              text: `${systemPrompt}\n\nBusiness Data:\n${contextData}\n\nQuestion: ${question}`
            }]
          }]
        });

        aiResponse = response.response.text();
        break; // Success, exit retry loop
      } catch (error) {
        if (error.status === 503 && retries > 1) {
          // Service unavailable, retry after delay
          await new Promise(resolve => setTimeout(resolve, 2000));
          retries--;
        } else {
          throw error; // Re-throw if not 503 or no retries left
        }
      }
    }

    res.json({
      question,
      answer: aiResponse,
    });
  } catch (error) {
    console.error("AI Query Error:", error);
    
    // Provide fallback response for API errors
    let fallbackResponse = "I'm temporarily unable to process your request due to high API demand. Please try again in a moment.";
    
    res.status(500).json({ 
      question,
      answer: fallbackResponse,
      error: error.message 
    });
});

module.exports = router;
