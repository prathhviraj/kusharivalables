const mongoose = require('mongoose');
const readline = require('readline');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const addProductInteractive = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected\n');

    console.log('📦 Add New Product\n');
    console.log('Press Ctrl+C to cancel at any time\n');

    const title = await question('Product Title: ');
    const description = await question('Description: ');
    const price = await question('Price ($): ');
    console.log('\nCategories: Dresses, Tops, Co-ords, Ethnic, Casual, Party');
    const category = await question('Category: ');
    const stock = await question('Stock Quantity: ');
    
    console.log('\nEnter image URLs (press Enter with empty line to finish):');
    const images = [];
    while (true) {
      const img = await question(`Image ${images.length + 1} URL (or Enter to finish): `);
      if (!img.trim()) break;
      images.push(img.trim());
    }

    if (images.length === 0) {
      images.push('https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800');
      console.log('Using default image');
    }

    console.log('\nSizes: S, M, L, XL');
    const sizesInput = await question('Sizes (comma-separated, or Enter for all): ');
    const sizes = sizesInput.trim() 
      ? sizesInput.split(',').map(s => s.trim().toUpperCase())
      : ['S', 'M', 'L', 'XL'];

    // Validate category
    const validCategories = ['Dresses', 'Tops', 'Co-ords', 'Ethnic', 'Casual', 'Party'];
    if (!validCategories.includes(category)) {
      console.error(`\n❌ Invalid category. Must be one of: ${validCategories.join(', ')}`);
      process.exit(1);
    }

    const product = await Product.create({
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category,
      images,
      sizes,
      stock: parseInt(stock),
      rating: 0,
    });

    console.log('\n✅ Product added successfully!');
    console.log('\nProduct Details:');
    console.log(JSON.stringify(product, null, 2));
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    rl.close();
    process.exit(1);
  }
};

addProductInteractive();
