# Troubleshooting Guide

## 🔴 Registration Not Working

### Step 1: Check MongoDB Connection

**Check your backend terminal.** You should see:
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

If you see an error instead:
```
Error: ...
```

**Fix:**
1. Open `backend/.env` file
2. Update `MONGODB_URI` with your actual MongoDB connection string
3. Make sure it looks like:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/kusharivalables?retryWrites=true&w=majority
   ```
4. Restart backend server

### Step 2: Test Registration with curl

Open terminal and run:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user",
    "token": "..."
  }
}
```

**If you get an error:**
- `User already exists` → Try different email
- `Please provide all required fields` → Check all fields are filled
- `MongoDB connection error` → Fix `.env` file

### Step 3: Check Browser Console

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to register
4. Look for the `/api/auth/register` request
5. Check the response for error messages

### Step 4: Check Backend Logs

Look at your backend terminal for:
- Request received
- Any error messages
- MongoDB connection status

---

## Common Registration Errors

### Error: "User already exists"
**Solution:** Use a different email address

### Error: "Please provide all required fields"
**Solution:** Make sure name, email, and password are all filled in

### Error: "MongoDB connection error"
**Solution:** 
1. Check `.env` file has correct `MONGODB_URI`
2. Make sure MongoDB Atlas allows connections from your IP
3. Check internet connection

### Error: "Password validation failed"
**Solution:** Password must be at least 6 characters

---

## ✅ Quick Fix Checklist

- [ ] Backend server is running (`npm run server`)
- [ ] Frontend server is running (`npm run dev`)
- [ ] MongoDB URI is set in `backend/.env`
- [ ] MongoDB is connected (check backend terminal)
- [ ] No errors in backend terminal
- [ ] Browser console shows no errors
- [ ] All form fields are filled correctly

---

## 🧪 Test Your Setup

Run these commands to test:

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

## 📞 Still Having Issues?

1. **Check backend terminal** - Look for error messages
2. **Check browser console** - Look for network errors
3. **Verify MongoDB connection** - Make sure `.env` is correct
4. **Restart both servers** - Sometimes fixes connection issues
