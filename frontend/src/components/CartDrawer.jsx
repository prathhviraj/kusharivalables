import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Shopping Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-gray-300 mb-4"
                  >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Your cart is empty
                  </p>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="px-6 py-2 bg-primary-pink text-white rounded-full hover:bg-pink-400 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={`${item._id}-${item.size}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                      <img
                        src={item.images[0] || '/placeholder.jpg'}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          Size: {item.size}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() =>
                                removeFromCart(item._id, item.size)
                              }
                              className="text-sm text-red-500 hover:text-red-700 mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900 dark:text-white">Total:</span>
                  <span className="text-primary-pink">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="block w-full py-3 bg-primary-pink text-white text-center rounded-full hover:bg-pink-400 transition-colors font-medium"
                >
                  Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="block w-full py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
