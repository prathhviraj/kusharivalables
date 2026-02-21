import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Your Wishlist
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                        Please login to view and manage your wishlisted products.
                    </p>
                    <Link
                        to="/login"
                        className="inline-block bg-primary-pink text-white px-8 py-3 rounded-full font-medium hover:bg-pink-400 transition-colors shadow-lg hover:shadow-xl"
                    >
                        Login to Continue
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        My Wishlist
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {wishlist?.length || 0} {wishlist?.length === 1 ? 'item' : 'items'} saved
                    </p>
                </motion.div>

                {!wishlist || wishlist.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                        <div className="w-24 h-24 bg-pink-50 dark:bg-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg
                                className="w-12 h-12 text-primary-pink"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Your wishlist is empty
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Found something you like? Tap the heart icon on any product to save it here for later.
                        </p>
                        <Link
                            to="/shop"
                            className="inline-block bg-primary-pink text-white px-8 py-3 rounded-full font-medium hover:bg-pink-400 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Start Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {wishlist.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
