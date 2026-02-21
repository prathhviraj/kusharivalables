import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await productsAPI.getAll({ limit: 8 });
        setFeaturedProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const categories = [
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400' },
    { name: 'Tops', image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400' },
    { name: 'Co-ords', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400' },
    { name: 'Ethnic', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400' },
  ];

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-pink/20 to-primary-beige/20" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary-pink to-pink-400 bg-clip-text text-transparent">
              Kusharivalables
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover elegant and modern fashion for the modern girl
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-4 bg-primary-pink text-white rounded-full hover:bg-pink-400 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Shop by Category
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.name.toLowerCase()}`}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-square bg-gray-100 dark:bg-gray-800">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Featured Products
            </h2>
            <Link
              to="/shop"
              className="text-primary-pink hover:text-pink-400 font-semibold"
            >
              View All →
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary-pink to-pink-400 rounded-3xl p-12 text-white"
          >
            <h2 className="text-4xl font-bold mb-4">
              Join the Kusharivalables Family
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get exclusive offers and updates on new arrivals
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-white text-primary-pink rounded-full hover:bg-gray-100 transition-colors font-semibold"
            >
              Sign Up Now
            </Link>
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default Home;
