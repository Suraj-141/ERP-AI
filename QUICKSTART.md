# ⚡ Quick Start (5 Minutes)

## 1️⃣ Prerequisites

- Node.js 14+
- MongoDB running locally
- Anthropic API Key

## 2️⃣ Setup Environment

```bash
# Copy env files
cp .env.example server/.env
```

**Edit `server/.env`:**
```
MONGO_URI=mongodb://localhost:27017/erp-ai
JWT_SECRET=secret123
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
PORT=5000
CLIENT_URL=http://localhost:5173
```

## 3️⃣ Install & Run

```bash
# Install all dependencies
npm run install-all

# Seed database
npm run seed

# Start both server & client (requires concurrently)
npm run dev
```

**Or run separately:**
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

## 4️⃣ Login

Go to **http://localhost:5173**

Login with:
- Email: `admin@erp.com`
- Password: `password123`

## ✅ Done! 🎉

You're running the full ERP AI system!

### Next Steps
1. Explore the Dashboard
2. Try creating a Product
3. Ask the AI Assistant: "What products are low on stock?"

---

**For detailed setup, see [INSTALLATION.md](INSTALLATION.md)**
