# Nexus ERP

An ERP system with AI assistant. MERN stack (React, Node, MongoDB) + Gemini AI.

## Setup

**Prerequisites:**
- Node.js 16+
- MongoDB (Atlas or local)
- Gemini API key

**Installation:**
```bash
cd server && npm install
cd ../client && npm install
```

**Environment (.env in server/):**
```
MONGO_URI=your_mongodb_connection
JWT_SECRET=any_secret_key
GEMINI_API_KEY=your_gemini_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

**Run:**
```bash
# Terminal 1 - Backend
cd server && npm start

# Terminal 2 - Frontend  
cd client && npm run dev
```

Access at `http://localhost:5173`

## Demo Login

- Email: `admin@erp.com`
- Password: `password123`

(Also available: manager@erp.com, employee@erp.com)

## Features

- Dashboard with KPIs and charts
- Inventory management with low stock alerts
- Order tracking
- Finance/transactions
- Employee management
- AI assistant for business queries

## Tech

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT

**Frontend:** React 18, Vite, Tailwind CSS, Recharts

**AI:** Google Generative AI (Gemini)
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

