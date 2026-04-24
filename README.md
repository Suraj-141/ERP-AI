# AI-Powered ERP System

A full-stack Enterprise Resource Planning (ERP) system built with the MERN stack (MongoDB, Express.js, React + Vite, Node.js) and integrated with Claude AI for intelligent business insights.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4%2B-green)
![React](https://img.shields.io/badge/React-18.2%2B-blue)
![Node.js](https://img.shields.io/badge/Node.js-14%2B-yellow)
![Claude AI](https://img.shields.io/badge/AI-Claude-purple)

## 🌟 Features

- **🔐 Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Manager, Employee)
  - Secure password hashing with bcryptjs

- **📊 Dashboard**
  - KPI cards (Revenue, Orders, Stock, Employees)
  - Revenue trend chart (Last 6 months)
  - Order status breakdown
  - Financial summary

- **📦 Inventory Management**
  - Product CRUD operations
  - Real-time stock tracking
  - Low stock alerts
  - Category organization
  - Supplier management

- **🛒 Order Management**
  - Order tracking system
  - Order status management (Pending, Processing, Shipped, Delivered, Cancelled)
  - Customer information
  - Item details with pricing

- **💰 Finance Management**
  - Income and expense tracking
  - Transaction categorization
  - Summary cards with totals
  - Monthly financial analysis

- **👥 Employee Management**
  - Employee directory
  - Department organization
  - Salary tracking
  - Leave balance management
  - Active/Inactive status

- **🤖 AI Assistant (Claude AI)**
  - Natural language queries about business data
  - Intelligent data aggregation
  - Business insights and analytics
  - Context-aware responses
  - Starter suggestions for common queries

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM library
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **@anthropic-ai/sdk** - Claude AI integration

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling

## 📋 Prerequisites

- Node.js 14+ and npm
- MongoDB 4.4+ (local or Atlas)
- Anthropic API Key (get from [console.anthropic.com](https://console.anthropic.com))

## 🚀 Quick Start

### 1. Clone & Setup

```bash
# Navigate to backend
cd server
npm install

# Navigate to frontend
cd ../client
npm install
```

### 2. Configure Environment Variables

**Server (.env)**
```
MONGO_URI=mongodb://localhost:27017/erp-ai
JWT_SECRET=your_jwt_secret_key
ANTHROPIC_API_KEY=your_anthropic_api_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

**Client (.env)**
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas cloud database
```

### 4. Seed Database

```bash
cd server
npm run seed
```

This creates:
- 3 demo users (admin@erp.com, manager@erp.com, employee@erp.com)
- 20 sample products
- 15 sample orders
- 30 sample transactions
- 8 sample employees

All demo accounts use password: `password123`

### 5. Start the Application

**Terminal 1 - Backend**
```bash
cd server
npm run dev
```

Server runs on `http://localhost:5000`

**Terminal 2 - Frontend**
```bash
cd client
npm run dev
```

Client runs on `http://localhost:5173`

## 📖 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (protected)

### Inventory
- `GET /api/inventory` - List all products (protected)
- `POST /api/inventory` - Create product (protected, manager/admin)
- `PUT /api/inventory/:id` - Update product (protected, manager/admin)
- `DELETE /api/inventory/:id` - Delete product (protected, manager/admin)

### Orders
- `GET /api/orders` - List all orders (protected)
- `POST /api/orders` - Create order (protected)
- `PUT /api/orders/:id/status` - Update order status (protected, manager/admin)

### Finance
- `GET /api/finance` - List all transactions (protected)
- `POST /api/finance` - Create transaction (protected, manager/admin)

### Employees
- `GET /api/employees` - List all employees (protected)
- `POST /api/employees` - Create employee (protected, manager/admin)
- `PUT /api/employees/:id` - Update employee (protected, manager/admin)

### AI Assistant
- `POST /api/ai/query` - Ask AI question about business data (protected)

## 🎯 Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@erp.com | password123 | Admin |
| manager@erp.com | password123 | Manager |
| employee@erp.com | password123 | Employee |

## 🤖 AI Assistant Examples

Ask the AI assistant questions like:
- "What products are low on stock?"
- "Show this month's total revenue"
- "How many orders are pending?"
- "Which department has the most employees?"
- "What's our net profit?"

The AI analyzes real data from your database and provides intelligent insights.

## 📁 Project Structure

```
erp-ai/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Transaction.js
│   │   └── Employee.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── inventory.js
│   │   ├── orders.js
│   │   ├── finance.js
│   │   ├── employees.js
│   │   └── ai.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── index.js
│   ├── seed.js
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Common.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Finance.jsx
│   │   │   ├── Employees.jsx
│   │   │   └── AI.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── .env.example
└── README.md
```

## 🎨 UI Design

- **Color Scheme**: Indigo primary color with grayscale neutrals
- **Responsive**: Fully responsive on desktop, tablet, and mobile
- **Components**: Tailwind CSS utility-first styling
- **Charts**: Recharts for beautiful data visualizations

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs (10 salt rounds)
- CORS middleware for cross-origin requests
- Helmet.js for security headers
- Protected routes with role-based access
- Environment variable configuration

## 🚀 Production Deployment

### Environment Setup
1. Change `JWT_SECRET` to a strong random string
2. Update `MONGO_URI` to your production MongoDB instance
3. Set `NODE_ENV=production`
4. Configure `CLIENT_URL` to your frontend domain
5. Add your production `ANTHROPIC_API_KEY`

### Backend Deployment (Heroku, AWS, DigitalOcean, etc.)
```bash
# Install production dependencies
npm install --production

# Start server
npm start
```

### Frontend Deployment (Vercel, Netlify, AWS S3, etc.)
```bash
# Build for production
npm run build

# Deploy the dist folder
```

## 📝 Environment Variables Reference

### Server (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/erp-ai |
| JWT_SECRET | JWT signing secret (change in production!) | your_secret_key_here |
| ANTHROPIC_API_KEY | Claude API key from Anthropic | sk-ant-... |
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development \| production |
| CLIENT_URL | Frontend URL | http://localhost:5173 |

### Client (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in .env is correct
- For Atlas: Verify IP whitelist and credentials

### AI Assistant Not Working
- Verify ANTHROPIC_API_KEY is set
- Check API key is active in Anthropic console
- Ensure sufficient API quota

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

## 📚 Learning Resources

- [MERN Stack Documentation](https://mern.io/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Claude AI Documentation](https://docs.anthropic.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 📧 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using MERN Stack and Claude AI**
