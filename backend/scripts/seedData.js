const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: '../.env' });

const products = [
  {
    title: 'Elegant Floral Summer Dress',
    description: 'Beautiful floral print summer dress perfect for any occasion. Made with premium cotton fabric for maximum comfort.',
    price: 89.99,
    category: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    rating: 4.5,
  },
  {
    title: 'Classic White Blouse',
    description: 'Timeless white blouse that pairs perfectly with any bottom. Versatile and elegant design.',
    price: 49.99,
    category: 'Tops',
    images: [
      'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
    ],
    sizes: ['S', 'M', 'L'],
    stock: 30,
    rating: 4.8,
  },
  {
    title: 'Casual Denim Co-ord Set',
    description: 'Stylish co-ord set featuring a denim top and matching shorts. Perfect for a casual day out.',
    price: 79.99,
    category: 'Co-ords',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 15,
    rating: 4.6,
  },
  {
    title: 'Traditional Embroidered Kurta',
    description: 'Beautiful traditional kurta with intricate embroidery work. Perfect for festivals and special occasions.',
    price: 129.99,
    category: 'Ethnic',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 20,
    rating: 4.7,
  },
  {
    title: 'Comfortable Cotton T-Shirt',
    description: 'Soft and comfortable cotton t-shirt perfect for everyday wear. Available in multiple colors.',
    price: 29.99,
    category: 'Casual',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
    rating: 4.4,
  },
  {
    title: 'Glamorous Sequin Party Dress',
    description: 'Stunning sequin dress that will make you shine at any party. Elegant and eye-catching design.',
    price: 149.99,
    category: 'Party',
    images: [
      'https://images.unsplash.com/photo-1566479179817-5aff92b98a5c?w=800',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    ],
    sizes: ['S', 'M', 'L'],
    stock: 12,
    rating: 4.9,
  },
  {
    title: 'Floral Maxi Dress',
    description: 'Elegant maxi dress with beautiful floral patterns. Perfect for summer events and gatherings.',
    price: 99.99,
    category: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
      'https://images.unsplash.com/photo-1566479179817-5aff92b98a5c?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 18,
    rating: 4.6,
  },
  {
    title: 'Striped Crop Top',
    description: 'Trendy striped crop top that pairs perfectly with high-waisted bottoms. Modern and stylish.',
    price: 39.99,
    category: 'Tops',
    images: [
      'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    ],
    sizes: ['S', 'M', 'L'],
    stock: 35,
    rating: 4.5,
  },
  {
    title: 'Designer Saree',
    description: 'Elegant designer saree with beautiful patterns and premium fabric. Perfect for weddings and special events.',
    price: 199.99,
    category: 'Ethnic',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    ],
    sizes: ['S', 'M', 'L'],
    stock: 10,
    rating: 4.8,
  },
  {
    title: 'Casual Jogger Set',
    description: 'Comfortable jogger set perfect for lounging or casual outings. Soft and breathable fabric.',
    price: 69.99,
    category: 'Casual',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 22,
    rating: 4.3,
  },
  {
    title: 'Cocktail Party Dress',
    description: 'Elegant cocktail dress perfect for evening parties and events. Sophisticated and stylish design.',
    price: 119.99,
    category: 'Party',
    images: [
      'https://images.unsplash.com/photo-1566479179817-5aff92b98a5c?w=800',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    ],
    sizes: ['S', 'M', 'L'],
    stock: 14,
    rating: 4.7,
  },
  {
    title: 'Printed Co-ord Set',
    description: 'Vibrant printed co-ord set with matching top and bottom. Perfect for a coordinated look.',
    price: 89.99,
    category: 'Co-ords',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
      'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 16,
    rating: 4.5,
  },
];

const seedProducts = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log('Seeded products successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
