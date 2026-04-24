const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: String,
      enum: ["HR", "Engineering", "Sales", "Finance"],
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    joinDate: {
      type: Date,
      required: true,
    },
    leaveBalance: {
      type: Number,
      default: 20,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
