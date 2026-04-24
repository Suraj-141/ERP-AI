const express = require("express");
const Transaction = require("../models/Transaction");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Get all transactions
router.get("/", protect, async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create transaction
router.post("/", protect, authorize("admin", "manager"), async (req, res) => {
  try {
    const { type, amount, category, description } = req.body;

    if (!type || !amount || !category) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const transaction = await Transaction.create({
      type,
      amount,
      category,
      description: description || "",
      createdBy: req.user.id,
    });

    const populatedTransaction = await Transaction.findById(
      transaction._id
    ).populate("createdBy", "name email");

    res.status(201).json(populatedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
