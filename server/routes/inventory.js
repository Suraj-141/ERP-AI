const express = require("express");
const Product = require("../models/Product");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Get all products
router.get("/", protect, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create product
router.post("/", protect, authorize("admin", "manager"), async (req, res) => {
  try {
    const { name, sku, category, quantity, price, supplier, reorderLevel } =
      req.body;

    if (!name || !sku || !category || quantity === undefined || !price) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const product = await Product.create({
      name,
      sku,
      category,
      quantity,
      price,
      supplier: supplier || null,
      reorderLevel: reorderLevel || 10,
    });

    res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "SKU already exists" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update product
router.put("/:id", protect, authorize("admin", "manager"), async (req, res) => {
  try {
    const { name, sku, category, quantity, price, supplier, reorderLevel } =
      req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        sku,
        category,
        quantity,
        price,
        supplier,
        reorderLevel,
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "SKU already exists" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete product
router.delete(
  "/:id",
  protect,
  authorize("admin", "manager"),
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
