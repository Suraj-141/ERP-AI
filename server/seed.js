require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Transaction = require("./models/Transaction");
const Employee = require("./models/Employee");

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/erp-ai");
    console.log("Connected to MongoDB");

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Transaction.deleteMany({}),
      Employee.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    // Create users
    const users = await User.create([
      {
        name: "Admin User",
        email: "admin@erp.com",
        password: "password123",
        role: "admin",
        department: "IT",
      },
      {
        name: "Manager User",
        email: "manager@erp.com",
        password: "password123",
        role: "manager",
        department: "Sales",
      },
      {
        name: "Employee User",
        email: "employee@erp.com",
        password: "password123",
        role: "employee",
        department: "Finance",
      },
    ]);
    console.log("Created users");

    // Create products
    const products = await Product.create([
      // Electronics
      {
        name: "Laptop Pro 15",
        sku: "ELEC-001",
        category: "Electronics",
        quantity: 5,
        price: 1299.99,
        supplier: "TechSupply Inc",
        reorderLevel: 10,
      },
      {
        name: "Desktop Monitor 27",
        sku: "ELEC-002",
        category: "Electronics",
        quantity: 8,
        price: 399.99,
        supplier: "DisplayCo",
        reorderLevel: 15,
      },
      {
        name: "Wireless Mouse",
        sku: "ELEC-003",
        category: "Electronics",
        quantity: 3,
        price: 49.99,
        supplier: "PeripheralsPro",
        reorderLevel: 20,
      },
      {
        name: "USB-C Cable",
        sku: "ELEC-004",
        category: "Electronics",
        quantity: 2,
        price: 19.99,
        supplier: "CableWorld",
        reorderLevel: 30,
      },
      {
        name: "Mechanical Keyboard",
        sku: "ELEC-005",
        category: "Electronics",
        quantity: 12,
        price: 149.99,
        supplier: "KeyboardCraft",
        reorderLevel: 5,
      },

      // Office Supplies
      {
        name: "A4 Paper Ream",
        sku: "OFF-001",
        category: "Office",
        quantity: 25,
        price: 12.99,
        supplier: "PaperPro",
        reorderLevel: 10,
      },
      {
        name: "Ballpoint Pen Box",
        sku: "OFF-002",
        category: "Office",
        quantity: 15,
        price: 8.99,
        supplier: "WritingTools",
        reorderLevel: 20,
      },
      {
        name: "Notepad 100 sheets",
        sku: "OFF-003",
        category: "Office",
        quantity: 18,
        price: 4.99,
        supplier: "NotePad Inc",
        reorderLevel: 15,
      },
      {
        name: "File Folder Set",
        sku: "OFF-004",
        category: "Office",
        quantity: 7,
        price: 14.99,
        supplier: "FileMaster",
        reorderLevel: 12,
      },
      {
        name: "Highlighter Set",
        sku: "OFF-005",
        category: "Office",
        quantity: 20,
        price: 6.99,
        supplier: "ColorPens",
        reorderLevel: 10,
      },

      // Furniture
      {
        name: "Ergonomic Office Chair",
        sku: "FURN-001",
        category: "Furniture",
        quantity: 4,
        price: 299.99,
        supplier: "FurnitureHub",
        reorderLevel: 8,
      },
      {
        name: "Standing Desk",
        sku: "FURN-002",
        category: "Furniture",
        quantity: 6,
        price: 599.99,
        supplier: "DeskPro",
        reorderLevel: 5,
      },
      {
        name: "Meeting Table",
        sku: "FURN-003",
        category: "Furniture",
        quantity: 2,
        price: 1999.99,
        supplier: "ConferenceFurniture",
        reorderLevel: 3,
      },
      {
        name: "Desk Lamp LED",
        sku: "FURN-004",
        category: "Furniture",
        quantity: 11,
        price: 89.99,
        supplier: "LightingCo",
        reorderLevel: 6,
      },
      {
        name: "Bookshelf 5-tier",
        sku: "FURN-005",
        category: "Furniture",
        quantity: 9,
        price: 179.99,
        supplier: "StorageSolutions",
        reorderLevel: 4,
      },

      // Supplies
      {
        name: "Stapler & Staples",
        sku: "SUP-001",
        category: "Supplies",
        quantity: 24,
        price: 11.99,
        supplier: "OfficeDepot",
        reorderLevel: 15,
      },
      {
        name: "Paper Clips Box",
        sku: "SUP-002",
        category: "Supplies",
        quantity: 30,
        price: 3.99,
        supplier: "SmallSupplies",
        reorderLevel: 20,
      },
      {
        name: "Sticky Notes Pack",
        sku: "SUP-003",
        category: "Supplies",
        quantity: 22,
        price: 5.99,
        supplier: "NoteCompany",
        reorderLevel: 15,
      },
      {
        name: "Envelope Box 100",
        sku: "SUP-004",
        category: "Supplies",
        quantity: 16,
        price: 9.99,
        supplier: "MailSupplies",
        reorderLevel: 10,
      },
      {
        name: "Whiteboard Marker Set",
        sku: "SUP-005",
        category: "Supplies",
        quantity: 19,
        price: 7.99,
        supplier: "MarkerCo",
        reorderLevel: 10,
      },
    ]);
    console.log("Created 20 products");

    // Create orders
    const orders = await Order.create([
      {
        orderNumber: "ORD-2024-001",
        customer: { name: "Acme Corp", email: "orders@acme.com" },
        items: [
          { product: products[0]._id, qty: 2, price: 1299.99 },
          { product: products[5]._id, qty: 5, price: 12.99 },
        ],
        totalAmount: 3359.95,
        status: "pending",
      },
      {
        orderNumber: "ORD-2024-002",
        customer: { name: "TechStart Inc", email: "procurement@techstart.com" },
        items: [
          { product: products[1]._id, qty: 3, price: 399.99 },
          { product: products[10]._id, qty: 1, price: 299.99 },
        ],
        totalAmount: 1499.96,
        status: "processing",
      },
      {
        orderNumber: "ORD-2024-003",
        customer: { name: "Global Services", email: "buy@globalservices.com" },
        items: [{ product: products[2]._id, qty: 10, price: 49.99 }],
        totalAmount: 499.9,
        status: "shipped",
      },
      {
        orderNumber: "ORD-2024-004",
        customer: { name: "Innovation Labs", email: "procurement@innovationlabs.com" },
        items: [
          { product: products[4]._id, qty: 2, price: 149.99 },
          { product: products[6]._id, qty: 3, price: 8.99 },
        ],
        totalAmount: 326.96,
        status: "delivered",
      },
      {
        orderNumber: "ORD-2024-005",
        customer: { name: "Enterprise Solutions", email: "orders@enterprise.com" },
        items: [{ product: products[11]._id, qty: 1, price: 599.99 }],
        totalAmount: 599.99,
        status: "pending",
      },
      {
        orderNumber: "ORD-2024-006",
        customer: { name: "StartUp Hub", email: "procurement@startuphub.com" },
        items: [
          { product: products[3]._id, qty: 15, price: 19.99 },
          { product: products[16]._id, qty: 2, price: 11.99 },
        ],
        totalAmount: 324.83,
        status: "processing",
      },
      {
        orderNumber: "ORD-2024-007",
        customer: { name: "Corporate Offices", email: "supplies@corporate.com" },
        items: [
          { product: products[12]._id, qty: 1, price: 1999.99 },
          { product: products[18]._id, qty: 5, price: 7.99 },
        ],
        totalAmount: 2039.94,
        status: "shipped",
      },
      {
        orderNumber: "ORD-2024-008",
        customer: { name: "Education Institute", email: "procurement@edu.com" },
        items: [
          { product: products[0]._id, qty: 3, price: 1299.99 },
          { product: products[8]._id, qty: 10, price: 14.99 },
        ],
        totalAmount: 4299.7,
        status: "pending",
      },
      {
        orderNumber: "ORD-2024-009",
        customer: { name: "Healthcare Org", email: "orders@healthcare.com" },
        items: [
          { product: products[13]._id, qty: 8, price: 89.99 },
          { product: products[6]._id, qty: 2, price: 8.99 },
        ],
        totalAmount: 738.8,
        status: "delivered",
      },
      {
        orderNumber: "ORD-2024-010",
        customer: { name: "Retail Chain", email: "procurement@retail.com" },
        items: [
          { product: products[14]._id, qty: 3, price: 179.99 },
          { product: products[17]._id, qty: 4, price: 3.99 },
        ],
        totalAmount: 555.86,
        status: "cancelled",
      },
      {
        orderNumber: "ORD-2024-011",
        customer: { name: "Finance Co", email: "purchasing@financeco.com" },
        items: [{ product: products[5]._id, qty: 20, price: 12.99 }],
        totalAmount: 259.8,
        status: "processing",
      },
      {
        orderNumber: "ORD-2024-012",
        customer: { name: "Legal Firm", email: "admin@legalfirm.com" },
        items: [
          { product: products[7]._id, qty: 5, price: 4.99 },
          { product: products[15]._id, qty: 2, price: 11.99 },
        ],
        totalAmount: 49.85,
        status: "shipped",
      },
      {
        orderNumber: "ORD-2024-013",
        customer: { name: "Manufacturing Co", email: "procurement@mfg.com" },
        items: [
          { product: products[9]._id, qty: 6, price: 6.99 },
          { product: products[19]._id, qty: 3, price: 7.99 },
        ],
        totalAmount: 65.85,
        status: "delivered",
      },
      {
        orderNumber: "ORD-2024-014",
        customer: { name: "Consulting Firm", email: "orders@consulting.com" },
        items: [
          { product: products[1]._id, qty: 2, price: 399.99 },
          { product: products[4]._id, qty: 1, price: 149.99 },
        ],
        totalAmount: 949.97,
        status: "pending",
      },
      {
        orderNumber: "ORD-2024-015",
        customer: { name: "Tech Startup", email: "procurement@techstartup.com" },
        items: [
          { product: products[2]._id, qty: 5, price: 49.99 },
          { product: products[10]._id, qty: 2, price: 299.99 },
        ],
        totalAmount: 849.85,
        status: "processing",
      },
    ]);
    console.log("Created 15 orders");

    // Create transactions (30 transactions over last 3 months)
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    const transactions = [];
    for (let i = 0; i < 30; i++) {
      const randomDate = new Date(
        threeMonthsAgo.getTime() +
          Math.random() * (now.getTime() - threeMonthsAgo.getTime())
      );

      const isIncome = Math.random() > 0.4; // 60% income, 40% expense
      const amount = isIncome
        ? Math.floor(Math.random() * 15000) + 1000
        : Math.floor(Math.random() * 5000) + 100;

      transactions.push({
        type: isIncome ? "income" : "expense",
        amount,
        category: isIncome
          ? ["Sales", "Services", "Investment"][Math.floor(Math.random() * 3)]
          : ["Salaries", "Utilities", "Equipment", "Supplies"][
              Math.floor(Math.random() * 4)
            ],
        description: isIncome
          ? "Customer payment received"
          : "Business expense payment",
        createdBy: users[0]._id,
        createdAt: randomDate,
      });
    }

    await Transaction.create(transactions);
    console.log("Created 30 transactions");

    // Create employees
    const employees = await Employee.create([
      {
        userId: users[0]._id,
        department: "HR",
        salary: 65000,
        joinDate: new Date("2022-01-15"),
        leaveBalance: 15,
        status: "active",
      },
      {
        userId: users[1]._id,
        department: "Engineering",
        salary: 85000,
        joinDate: new Date("2021-06-20"),
        leaveBalance: 18,
        status: "active",
      },
      {
        userId: users[2]._id,
        department: "Sales",
        salary: 75000,
        joinDate: new Date("2022-03-10"),
        leaveBalance: 20,
        status: "active",
      },
      {
        userId: users[0]._id,
        department: "Finance",
        salary: 70000,
        joinDate: new Date("2021-09-01"),
        leaveBalance: 12,
        status: "active",
      },
      {
        userId: users[1]._id,
        department: "Engineering",
        salary: 90000,
        joinDate: new Date("2020-02-15"),
        leaveBalance: 20,
        status: "active",
      },
      {
        userId: users[2]._id,
        department: "Sales",
        salary: 72000,
        joinDate: new Date("2022-07-01"),
        leaveBalance: 20,
        status: "active",
      },
      {
        userId: users[0]._id,
        department: "HR",
        salary: 62000,
        joinDate: new Date("2023-01-10"),
        leaveBalance: 20,
        status: "active",
      },
      {
        userId: users[1]._id,
        department: "Finance",
        salary: 78000,
        joinDate: new Date("2021-11-20"),
        leaveBalance: 16,
        status: "active",
      },
    ]);
    console.log("Created 8 employees");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
