/**
 * @fileoverview User Profile Page
 * Matches trendy brand aesthetics for e-commerce. Superior Dark Mode Contrast.
 */
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Profile = () => {
  const { user, updateProfile, logout, loading } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    }
  });

  const [activeTab, setActiveTab] = useState('personal'); // personal, shipping, orders
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || '',
        }
      });
    }
  }, [user, loading, navigate]);

  if (loading) return <Loader />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [addressField]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await updateProfile(formData);
    setIsSubmitting(false);
  };

  const menuItems = [
    { id: 'personal', label: 'Personal Details', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'shipping', label: 'Shipping Address', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'orders', label: 'Order History', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  ];

  const commonInputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:border-primary-pink dark:focus:border-primary-pink focus:ring-1 focus:ring-primary-pink transition-colors shadow-sm dark:shadow-none";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-8"
      >
        {/* Sidebar Menu */}
        <div className="w-full md:w-1/4">
          <div className="bg-pink-50 dark:bg-gray-800/80 rounded-3xl p-6 shadow-sm border border-pink-100 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-primary-pink flex items-center justify-center text-white text-2xl font-bold shadow-md">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize truncate max-w-[120px]">{user?.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[120px]">{user?.email}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    activeTab === item.id 
                      ? 'bg-primary-pink text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                  {item.label}
                </button>
              ))}
              
              <button
                onClick={() => logout()}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/40 mt-4"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout Account
              </button>
            </nav>
          </div>

          {/* Cart Mini Summary */}
          <div className="mt-6 bg-gradient-to-br from-pink-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 shadow-sm border border-pink-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Cart Snapshot</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">You have {cartItems?.length || 0} items waiting in your cart.</p>
            <Link to="/cart" className="inline-block w-full text-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium hover:bg-primary-pink dark:hover:bg-primary-pink dark:hover:text-white transition-colors">
              View Cart Details
            </Link>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="w-full md:w-3/4">
          <div className="bg-white dark:bg-gray-800/80 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 min-h-[500px]">
            {activeTab === 'personal' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-pink to-pink-400 bg-clip-text text-transparent mb-6">Personal Details</h2>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={commonInputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={commonInputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className={commonInputClass}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full shadow-lg shadow-pink-200 dark:shadow-none bg-primary-pink text-white py-3 px-4 rounded-xl font-medium hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink transition-all transform hover:-translate-y-1 mt-4"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Personal Details'}
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === 'shipping' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-pink to-pink-400 bg-clip-text text-transparent mb-6">Shipping Address</h2>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                      placeholder="123 Fashion Ave, Apt 4B"
                      className={commonInputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        className={commonInputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State/Province</label>
                      <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        className={commonInputClass}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ZIP / Postal Code</label>
                      <input
                        type="text"
                        name="address.zipCode"
                        value={formData.address.zipCode}
                        onChange={handleChange}
                        className={commonInputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
                      <input
                        type="text"
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleChange}
                        className={commonInputClass}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full shadow-lg shadow-pink-200 dark:shadow-none bg-primary-pink text-white py-3 px-4 rounded-xl font-medium hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink transition-all transform hover:-translate-y-1 mt-4"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Shipping Address'}
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-pink to-pink-400 bg-clip-text text-transparent mb-6">Recent Orders</h2>
                <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="w-24 h-24 mb-6 rounded-full bg-pink-100 dark:bg-gray-700 flex items-center justify-center text-primary-pink shadow-inner">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">No active orders yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">Browse our trendy collection and start shopping for the latest styles.</p>
                  <Link to="/shop" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-primary-pink dark:hover:bg-primary-pink dark:hover:text-white transition-colors shadow-md">
                    Start Shopping
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
