# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/kusharivalables?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

Start the server:
```bash
npm run server
```

### Step 2: Seed Database (Optional)

In a new terminal:
```bash
cd backend
node scripts/seedData.js
```

This will add 12 sample products to your database.

### Step 3: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Step 4: Open Browser

Navigate to `http://localhost:3000`

## ✅ You're All Set!

The website should now be running with:
- ✅ Backend API on `http://localhost:5000`
- ✅ Frontend on `http://localhost:3000`
- ✅ Sample products in database
- ✅ Full authentication system
- ✅ Shopping cart functionality

## 🎯 Test Credentials

After seeding, you can register a new account or use these test credentials (if you create them):
- Email: test@example.com
- Password: password123

## 📝 Next Steps

1. Register a new account
2. Browse products in the shop
3. Add items to cart
4. Explore different categories
5. Try the search functionality

## 🐛 Troubleshooting

**Backend won't start:**
- Check MongoDB connection string
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify PORT is not already in use

**Frontend won't start:**
- Check if backend is running
- Verify Node.js version (v16+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Products not showing:**
- Run the seed script: `node backend/scripts/seedData.js`
- Check browser console for errors
- Verify API URL in frontend `.env`

---

Happy coding! 🎉
