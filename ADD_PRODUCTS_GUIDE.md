# How to Add Products and Categories

## 🔧 Fix Registration Issue First

The registration issue is likely due to **MongoDB not being connected**. Check:

1. **Is MongoDB connected?** Check your backend terminal for:
   - ✅ `MongoDB Connected: ...` (good)
   - ❌ `Error: ...` (bad - need to fix connection)

2. **Update `.env` file** in `backend/` directory:
   ```env
   MONGODB_URI=your-actual-mongodb-connection-string
   ```

3. **Restart backend server** after updating `.env`

---

## 📦 Adding Products

### Method 1: Using the Add Product Script (Recommended)

```bash
cd backend
node scripts/addProduct.js "Product Title" "Description" 99.99 Dresses 25 "https://image1.jpg" "https://image2.jpg" S,M,L,XL
```

**Example:**
```bash
node scripts/addProduct.js "Floral Summer Dress" "Beautiful floral print summer dress" 89.99 Dresses 30 "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800" "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800" S,M,L,XL
```

**Parameters:**
- Title: Product name
- Description: Product description
- Price: Number (e.g., 99.99)
- Category: One of: Dresses, Tops, Co-ords, Ethnic, Casual, Party
- Stock: Number of items available
- Images: One or more image URLs (space-separated)
- Sizes: Comma-separated sizes (S,M,L,XL) - optional, defaults to all sizes

### Method 2: Using Seed Data Script

Edit `backend/scripts/seedData.js` and add your products to the array, then run:

```bash
cd backend
node scripts/seedData.js
```

**Note:** This will **delete all existing products** and replace them with the ones in the script.

### Method 3: Direct MongoDB (Advanced)

1. Connect to MongoDB (MongoDB Compass or MongoDB Atlas)
2. Navigate to `kusharivalables` database → `products` collection
3. Click "Insert Document"
4. Add product with this structure:

```json
{
  "title": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Dresses",
  "images": ["https://image1.jpg", "https://image2.jpg"],
  "sizes": ["S", "M", "L", "XL"],
  "stock": 25,
  "rating": 0
}
```

---

## 🏷️ Adding New Categories

### Step 1: Update Backend Model

Edit `backend/models/Product.js`:

```javascript
category: {
  type: String,
  required: [true, 'Please provide a category'],
  enum: ['Dresses', 'Tops', 'Co-ords', 'Ethnic', 'Casual', 'Party', 'Accessories'], // Add your category here
},
```

### Step 2: Update Frontend Filter

Edit `frontend/src/components/FilterSidebar.jsx`:

```javascript
const categories = ['Dresses', 'Tops', 'Co-ords', 'Ethnic', 'Casual', 'Party', 'Accessories']; // Add here
```

### Step 3: Update Homepage (Optional)

Edit `frontend/src/pages/Home.jsx` and add to the categories array if you want it on the homepage.

### Step 4: Restart Servers

```bash
# Stop servers (Ctrl+C)
# Then restart:
cd backend && npm run server
cd frontend && npm run dev
```

---

## 🐛 Troubleshooting Registration

### Issue: "Cannot register user"

**Common causes:**

1. **MongoDB not connected**
   - Check backend terminal for connection errors
   - Verify `.env` file has correct `MONGODB_URI`
   - Test connection: `curl http://localhost:5000/api/health`

2. **Email already exists**
   - Try a different email address
   - Or check MongoDB to see if user exists

3. **Password too short**
   - Password must be at least 6 characters

4. **Missing fields**
   - Make sure name, email, and password are all provided

### Test Registration with curl:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Check Backend Logs

Look at your backend terminal for error messages. Common errors:
- `MongoDB connection error` → Fix `.env` file
- `User already exists` → Use different email
- `Validation error` → Check required fields

---

## 📝 Quick Reference

### Valid Categories:
- Dresses
- Tops
- Co-ords
- Ethnic
- Casual
- Party

### Valid Sizes:
- S
- M
- L
- XL

### Product Fields:
- `title` (required) - String
- `description` (required) - String
- `price` (required) - Number
- `category` (required) - One of the categories above
- `images` (required) - Array of image URLs
- `sizes` (required) - Array of sizes
- `stock` (required) - Number
- `rating` (optional) - Number (0-5)

---

## 💡 Tips

1. **Use Unsplash for images:** `https://images.unsplash.com/photo-XXXXX?w=800`
2. **Test products:** Add a few test products first
3. **Check MongoDB:** Use MongoDB Compass to view your data
4. **Backup data:** Export products before running seed script

---

Need help? Check the backend terminal logs for specific error messages!
