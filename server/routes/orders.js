const express = require("express");
const Order = require("../models/Order");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Get all orders
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product", "name sku price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create order
router.post("/", protect, async (req, res) => {
  try {
    const { orderNumber, customer, items, totalAmount, status } = req.body;

    if (!orderNumber || !customer || !items || !totalAmount) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const order = await Order.create({
      orderNumber,
      customer,
      items,
      totalAmount,
      status: status || "pending",
    });

    res.status(201).json(order);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Order number already exists" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update order status
router.put("/:id/status", protect, authorize("admin", "manager"), async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Please provide status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("items.product", "name sku price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
