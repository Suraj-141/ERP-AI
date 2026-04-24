const express = require("express");
const Employee = require("../models/Employee");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Get all employees
router.get("/", protect, async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", "name email department")
      .sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create employee
router.post("/", protect, authorize("admin", "manager"), async (req, res) => {
  try {
    const { userId, department, salary, joinDate, leaveBalance } = req.body;

    if (!userId || !department || !salary || !joinDate) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const employee = await Employee.create({
      userId,
      department,
      salary,
      joinDate,
      leaveBalance: leaveBalance || 20,
    });

    const populatedEmployee = await Employee.findById(employee._id).populate(
      "userId",
      "name email department"
    );

    res.status(201).json(populatedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update employee
router.put(
  "/:id",
  protect,
  authorize("admin", "manager"),
  async (req, res) => {
    try {
      const { department, salary, leaveBalance, status } = req.body;

      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        {
          department,
          salary,
          leaveBalance,
          status,
        },
        { new: true, runValidators: true }
      ).populate("userId", "name email department");

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
