import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 'M', 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/product/${product._id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
          {/* Image */}
          <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-square">
            <img
              src={product.images[0] || '/placeholder.jpg'}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Quick Add Button */}
            <motion.button
              onClick={handleAddToCart}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary-pink text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity font-medium shadow-lg hover:bg-pink-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Quick Add
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {product.category}
            </p>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
              {product.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-primary-pink">
                ${product.price}
              </span>
              {product.rating > 0 && (
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
