import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-pink to-pink-400 bg-clip-text text-transparent mb-4">
              Kusharivalables
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Premium girls clothing brand. Elegant, modern, and timeless fashion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-pink transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-pink transition-colors text-sm"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-pink transition-colors text-sm"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {['Dresses', 'Tops', 'Co-ords', 'Ethnic', 'Casual', 'Party'].map(
                (category) => (
                  <li key={category}>
                    <Link
                      to={`/category/${category.toLowerCase()}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-pink transition-colors text-sm"
                    >
                      {category}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Email: hello@kusharivalables.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} Kusharivalables. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
