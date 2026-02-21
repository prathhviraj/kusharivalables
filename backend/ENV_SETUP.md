# Environment Variables Setup

## Backend .env File

Create a `.env` file in the `backend/` directory with the following syntax:

```env
# Server Port
PORT=5000

# MongoDB Connection String
# For MongoDB Atlas (Cloud):
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/kusharivalables?retryWrites=true&w=majority

# For Local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/kusharivalables

# JWT Secret (Use a random string in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024

# Environment
NODE_ENV=development
```

## How to Get MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in to your account
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `kusharivalables` (or your preferred database name)

**Example:**
```
mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/kusharivalables?retryWrites=true&w=majority
```

## Important Notes

⚠️ **Security:**
- Never commit `.env` file to git (it's in `.gitignore`)
- Use strong passwords
- Change JWT_SECRET in production
- Don't share your `.env` file

✅ **After creating .env:**
1. Update `MONGODB_URI` with your actual connection string
2. Update `JWT_SECRET` with a random string
3. Restart your backend server

## Quick Setup

```bash
cd backend
cp .env.example .env
# Then edit .env with your actual values
nano .env  # or use your preferred editor
```
