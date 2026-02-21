# Kusharivalables - Premium Girls Clothing Brand Website

A complete production-ready full-stack e-commerce website for Kusharivalables, a premium girls clothing brand.

## 🚀 Tech Stack

### Frontend
- **React.js** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router DOM** for routing
- **Context API** for state management (Cart & Auth)
- **Axios** for API calls
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **Morgan** for logging

## 📁 Project Structure

```
kusharivalables/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context providers
│   │   ├── services/      # API services
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── backend/           # Node.js backend API
    ├── controllers/   # Route controllers
    ├── models/        # Database models
    ├── routes/        # API routes
    ├── middleware/    # Custom middleware
    ├── config/        # Configuration files
    ├── scripts/       # Utility scripts
    ├── server.js      # Entry point
    └── package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory (copy from `.env.example` if available):
```env
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. Update the MongoDB URI in `.env` with your MongoDB Atlas connection string.
   - Get your connection string from MongoDB Atlas dashboard
   - Replace `your-username` and `your-password` with your credentials
   - Make sure to whitelist your IP address in MongoDB Atlas

5. Seed the database with sample products (optional):
```bash
node scripts/seedData.js
```

6. Start the backend server:
```bash
npm run server
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional, defaults to `http://localhost:5000/api`):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📝 Features

### Frontend Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/Light mode toggle
- ✅ Product browsing and filtering
- ✅ Search functionality
- ✅ Shopping cart with persistent storage
- ✅ User authentication (Login/Register)
- ✅ Product details page
- ✅ Category pages
- ✅ Smooth animations with Framer Motion
- ✅ Loading states and skeletons
- ✅ Toast notifications

### Backend Features
- ✅ RESTful API
- ✅ JWT authentication
- ✅ User registration and login
- ✅ Product CRUD operations
- ✅ Product filtering and search
- ✅ Pagination support
- ✅ Error handling middleware
- ✅ CORS configuration

## 🎨 Design

The website features a premium, modern design with:
- Soft pastel pink (#F8C8DC) and beige (#F5E6DA) color scheme
- Elegant typography
- Smooth animations
- Rounded corners
- Hover effects
- Minimal luxury UI

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products (with filters, pagination)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=query` - Search products

### Query Parameters
- `category` - Filter by category
- `search` - Search query
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `page` - Page number for pagination
- `limit` - Items per page (default: 12)

## 📦 Database Models

### User
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- role (String, enum: ['user', 'admin'], default: 'user')

### Product
- title (String, required)
- description (String, required)
- price (Number, required)
- category (String, enum: ['Dresses', 'Tops', 'Co-ords', 'Ethnic', 'Casual', 'Party'])
- images (Array of Strings)
- sizes (Array, enum: ['S', 'M', 'L', 'XL'])
- stock (Number, default: 0)
- rating (Number, 0-5)
- createdAt (Date, auto)

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Ensure MongoDB Atlas allows connections from your server IP
3. Deploy to platforms like Heroku, Railway, or Render

### Frontend Deployment
1. Build the production bundle:
```bash
npm run build
```

2. Deploy the `dist` folder to platforms like:
   - Vercel
   - Netlify
   - GitHub Pages

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Development

### Running in Development Mode

**Backend:**
```bash
cd backend
npm run server
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

The production build will be in the `frontend/dist` directory.

## 🐛 Troubleshooting

1. **MongoDB Connection Error**: Ensure your MongoDB URI is correct and your IP is whitelisted in MongoDB Atlas.

2. **CORS Errors**: Make sure the backend CORS configuration allows requests from your frontend URL.

3. **Port Already in Use**: Change the PORT in `.env` file or kill the process using the port.

4. **Module Not Found**: Run `npm install` in both frontend and backend directories.

## 📞 Support

For issues or questions, please check the code comments or create an issue in the repository.

---

Built with ❤️ for Kusharivalables
