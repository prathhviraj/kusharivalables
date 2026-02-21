const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

// Load env vars
dotenv.config({ path: '../.env' });

const addProduct = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Get product data from command line arguments or use defaults
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      console.log(`
Usage: node addProduct.js <title> <description> <price> <category> <stock> <image1> [image2] [image3] [sizes]

Example:
node addProduct.js "Summer Dress" "Beautiful summer dress" 99.99 Dresses 25 "https://image1.jpg" "https://image2.jpg" S,M,L,XL

Categories: Dresses, Tops, Co-ords, Ethnic, Casual, Party
Sizes: S, M, L, XL (comma-separated)
      `);
      process.exit(0);
    }

    const [title, description, price, category, stock, ...rest] = args;
    
    // Parse images (everything until sizes)
    const images = [];
    const sizes = [];
    let foundSizes = false;

    for (const arg of rest) {
      if (arg.includes(',') && !arg.includes('http')) {
        // This is sizes
        foundSizes = true;
        sizes.push(...arg.split(',').map(s => s.trim()));
      } else if (!foundSizes) {
        // This is an image URL
        images.push(arg);
      }
    }

    // Default sizes if not provided
    const finalSizes = sizes.length > 0 ? sizes : ['S', 'M', 'L', 'XL'];

    // Validate category
    const validCategories = ['Dresses', 'Tops', 'Co-ords', 'Ethnic', 'Casual', 'Party'];
    if (!validCategories.includes(category)) {
      console.error(`Invalid category. Must be one of: ${validCategories.join(', ')}`);
      process.exit(1);
    }

    // Create product
    const product = await Product.create({
      title,
      description,
      price: parseFloat(price),
      category,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800'],
      sizes: finalSizes,
      stock: parseInt(stock),
      rating: 0,
    });

    console.log('✅ Product added successfully!');
    console.log(JSON.stringify(product, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding product:', error.message);
    process.exit(1);
  }
};

addProduct();
