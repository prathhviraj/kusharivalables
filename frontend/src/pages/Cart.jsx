import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    toast.success('Checkout functionality coming soon!');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <svg
            width="128"
            height="128"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-300 mx-auto mb-6"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
          </svg>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Start shopping to add items to your cart
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-4 bg-primary-pink text-white rounded-full hover:bg-pink-400 transition-colors font-semibold"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={`${item._id}-${item.size}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex gap-6">
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.images[0] || '/placeholder.jpg'}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/product/${item._id}`}>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary-pink">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Size: {item.size} | ${item.price} each
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.size, item.quantity - 1)
                          }
                          className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.size, item.quantity + 1)
                          }
                          className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item._id, item.size)}
                          className="text-sm text-red-500 hover:text-red-700 mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm sticky top-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span className="text-primary-pink">
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-primary-pink text-white rounded-full hover:bg-pink-400 transition-colors font-semibold text-lg mb-4"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/shop"
                className="block w-full py-3 text-center border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="block w-full py-2 text-center text-red-500 hover:text-red-700 mt-4 text-sm"
              >
                Clear Cart
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
