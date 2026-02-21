const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a product title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Dresses', 'Tops', 'Co-ords', 'Ethnic', 'Casual', 'Party'],
    },
    images: {
      type: [String],
      required: [true, 'Please provide at least one image'],
    },
    sizes: {
      type: [String],
      enum: ['S', 'M', 'L', 'XL'],
      required: true,
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock quantity'],
      min: 0,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
