const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

// Load env vars
dotenv.config({ path: '../.env' });

const addCategory = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    const newCategory = process.argv[2];

    if (!newCategory) {
      console.log(`
Usage: node addCategory.js <category-name>

Example:
node addCategory.js "Accessories"

Note: After adding a category, you need to update:
1. backend/models/Product.js - Add to enum array
2. frontend/src/components/FilterSidebar.jsx - Add to categories array
3. frontend/src/pages/Home.jsx - Add to categories array (if needed)
      `);
      process.exit(0);
    }

    console.log(`
⚠️  To add a new category "${newCategory}", you need to:

1. Update backend/models/Product.js:
   Change line 22 from:
   enum: ['Dresses', 'Tops', 'Co-ords', 'Ethnic', 'Casual', 'Party'],
   To:
   enum: ['Dresses', 'Tops', 'Co-ords', 'Ethnic', 'Casual', 'Party', '${newCategory}'],

2. Update frontend/src/components/FilterSidebar.jsx:
   Add '${newCategory}' to the categories array

3. Update frontend/src/pages/Home.jsx:
   Add '${newCategory}' to categories if you want it on homepage

4. Restart your servers after making changes
    `);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

addCategory();
