require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const inventoryRoutes = require("./routes/inventory");
const ordersRoutes = require("./routes/orders");
const financeRoutes = require("./routes/finance");
const employeesRoutes = require("./routes/employees");
const aiRoutes = require("./routes/ai");

const app = express();

// Middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/erp-ai")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/ai", aiRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
