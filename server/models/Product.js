const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ["Electronics", "Office", "Furniture", "Supplies"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    supplier: {
      type: String,
      default: null,
    },
    reorderLevel: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
