# Installation & Setup Guide

## Prerequisites

Before you begin, ensure you have:
- **Node.js** 14+ (download from [nodejs.org](https://nodejs.org/))
- **MongoDB** 4.4+ (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Anthropic API Key** (get from [console.anthropic.com](https://console.anthropic.com))
- **Git** (optional, for cloning)

## Step-by-Step Installation

### 1. Download the Project

```bash
# If you have git
git clone <repository-url>
cd erp-ai

# Or download and extract the ZIP file
cd erp-ai
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

**Expected packages:**
- express, mongoose, dotenv, cors, helmet, morgan
- bcryptjs, jsonwebtoken, @anthropic-ai/sdk
- nodemon (dev dependency)

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

**Expected packages:**
- react, react-dom, react-router-dom
- axios, recharts, tailwindcss
- vite, @vitejs/plugin-react
- postcss, autoprefixer

### 4. Setup Environment Variables

#### Backend (.env file)

Create `server/.env` with these values:

```bash
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/erp-ai

# JWT Secret (use a strong random string in production)
JWT_SECRET=erp_ai_secret_key_2024

# Anthropic Claude AI Key
ANTHROPIC_API_KEY=sk-ant-YOUR_API_KEY_HERE

# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

#### Frontend (.env file)

Create `client/.env` with:

```bash
VITE_API_URL=http://localhost:5000/api
```

### 5. Start MongoDB

**Option A: Local MongoDB**
```bash
# On Windows
mongod

# On macOS
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Copy connection string
4. Update `MONGO_URI` in `server/.env`

### 6. Seed Database with Sample Data

```bash
cd server
npm run seed
```

**This creates:**
- 3 demo users with different roles
- 20 products across 4 categories
- 15 orders with various statuses
- 30 transactions (income/expense)
- 8 employees across departments

### 7. Start the Application

**Terminal 1 - Start Backend Server**
```bash
cd server
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected
```

**Terminal 2 - Start Frontend Dev Server**
```bash
cd client
npm run dev
```

Expected output:
```
VITE v4.5.0  ready in 123 ms

➜  Local:   http://localhost:5173/
```

### 8. Access the Application

Open your browser and go to: **http://localhost:5173**

## Demo Login Credentials

All demo accounts use password: **password123**

| Email | Password | Role | Permission |
|-------|----------|------|-----------|
| admin@erp.com | password123 | Admin | Full access |
| manager@erp.com | password123 | Manager | Create/Edit/Delete |
| employee@erp.com | password123 | Employee | View only |

## Verification Checklist

- [ ] MongoDB is running (check connection in console)
- [ ] Backend server shows "MongoDB connected"
- [ ] Frontend loads at http://localhost:5173
- [ ] Can login with demo credentials
- [ ] Dashboard displays data
- [ ] AI Assistant responds to queries

## Troubleshooting

### Issue: "MongoDB connection failed"
**Solution:**
- Ensure MongoDB is running: `mongod` (Windows) or `brew services start mongodb-community` (macOS)
- Check MONGO_URI in `server/.env`
- Try: `mongo` to test connection

### Issue: "ANTHROPIC_API_KEY is not set"
**Solution:**
- Get API key from: https://console.anthropic.com
- Add it to `server/.env`: `ANTHROPIC_API_KEY=sk-ant-...`
- Restart backend server

### Issue: "EADDRINUSE: address already in use :::5000"
**Solution:**
- Port 5000 is already in use. Either:
  - Kill the process: `lsof -ti:5000 | xargs kill -9` (macOS/Linux)
  - Or change PORT in `server/.env` and `VITE_API_URL` in `client/.env`

### Issue: npm install fails
**Solution:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Issue: "Module not found" errors
**Solution:**
- Make sure you're in the correct directory when running npm commands
- Backend: Run commands from `server/` folder
- Frontend: Run commands from `client/` folder

## Common Commands

### Backend
```bash
cd server

# Development mode with auto-reload
npm run dev

# Production start
npm start

# Seed database with sample data
npm run seed
```

### Frontend
```bash
cd client

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Next Steps

1. **Explore Dashboard**: Check out the KPI cards and charts
2. **Try Inventory**: Add/Edit/Delete products
3. **Create Orders**: Create and manage orders
4. **Use AI Assistant**: Ask questions about your data
5. **Check Finance**: Track income and expenses

## Customization

### Change AI Model
Edit `server/routes/ai.js`:
```javascript
const response = await client.messages.create({
  model: "claude-opus-4-1", // Change model here
  max_tokens: 500,
  ...
});
```

### Customize Theme Colors
Edit `client/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#4f46e5', // Change primary color
    },
  },
},
```

### Change Database Schema
Modify files in `server/models/` for your business needs

## Production Deployment

### Before Deploying

1. **Security**
   - Change `JWT_SECRET` to random string
   - Enable HTTPS
   - Set `NODE_ENV=production`

2. **Database**
   - Use MongoDB Atlas or production MongoDB instance
   - Enable authentication
   - Set up backups

3. **API Key**
   - Use environment variables
   - Rotate keys regularly
   - Monitor API usage

### Deploy Backend
- Heroku: `git push heroku main`
- AWS: Use Elastic Beanstalk
- DigitalOcean: Use App Platform
- Railway: Connect GitHub repo

### Deploy Frontend
- Vercel: Connect GitHub repo (automatic)
- Netlify: Connect GitHub repo (automatic)
- AWS S3 + CloudFront
- GitHub Pages

## Support & Resources

- **MongoDB Docs**: https://docs.mongodb.com/
- **React Docs**: https://react.dev/
- **Express Docs**: https://expressjs.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Claude API Docs**: https://docs.anthropic.com/

## Getting Help

1. Check the [README.md](README.md) for detailed info
2. Review error messages in console
3. Check `.env` file configuration
4. Verify all services are running

---

**Happy coding! 🚀**
