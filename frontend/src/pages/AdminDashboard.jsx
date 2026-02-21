import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('add-product');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/');
            toast.error('Access denied. Admin only.');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (activeTab === 'users' && user?.role === 'admin') {
            fetchUsers();
        }
    }, [activeTab, user]);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const { data } = await api.get('/auth/users');
            setUsers(data.data);
        } catch (err) {
            toast.error('Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Dresses',
        sizes: ['S', 'M', 'L'], // default choices
        stock: '',
    });
    const [imageFile, setImageFile] = useState(null);

    const handleInputChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            return toast.error('Please select an image for the product');
        }
        if (productData.sizes.length === 0) {
            return toast.error('Please select at least one size');
        }
        try {
            setIsLoading(true);

            // Upload the image
            const formData = new FormData();
            formData.append('image', imageFile);

            const { data: uploadData } = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // We prepend api base URL or host. In a real app we might store absolute URL.
            // Since `uploadData.url` comes as `/uploads/...`, we'll store it as is, or we can resolve it.
            // If the backend runs on port 5000 and we serve it, we should prefix with the backend URL.
            // E.g 'http://localhost:5000' + uploadData.url. Let's dynamically get it form env or standard port.
            const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
            const fullImageUrl = `${baseUrl}${uploadData.url}`;

            // Create the product
            const productPayload = {
                ...productData,
                images: [fullImageUrl],
            };

            await api.post('/products', productPayload);
            toast.success('Product created successfully');

            setProductData({
                title: '',
                description: '',
                price: '',
                category: 'Dresses',
                sizes: ['S', 'M', 'L'],
                stock: '',
            });
            setImageFile(null);
            e.target.reset();

        } catch (err) {
            toast.error(err.response?.data?.message || 'Error creating product');
        } finally {
            setIsLoading(false);
        }
    };

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row gap-8"
            >
                {/* Sidebar Tabs */}
                <div className="md:w-1/4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-pink to-pink-400 bg-clip-text text-transparent mb-6">
                            Admin Panel
                        </h2>
                        <nav className="flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab('add-product')}
                                className={`py-3 px-4 rounded-xl text-left transition-colors ${activeTab === 'add-product'
                                        ? 'bg-primary-pink text-white font-medium'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                📝 Add New Product
                            </button>
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`py-3 px-4 rounded-xl text-left transition-colors ${activeTab === 'users'
                                        ? 'bg-primary-pink text-white font-medium'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                👥 Users Activity
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:w-3/4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 min-h-[500px]">

                        {/* Add Product Form */}
                        {activeTab === 'add-product' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Create a New Product
                                </h3>
                                <form onSubmit={handleCreateProduct} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Product Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                required
                                                value={productData.title}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-pink outline-none transition-all"
                                                placeholder="E.g. Elegant Summer Dress"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Price (₹)
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                required
                                                min="0"
                                                value={productData.price}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-pink outline-none transition-all"
                                                placeholder="2999"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            required
                                            rows="4"
                                            value={productData.description}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-pink outline-none transition-all resize-none"
                                            placeholder="Product details..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Category
                                            </label>
                                            <select
                                                name="category"
                                                value={productData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-pink outline-none transition-all"
                                            >
                                                <option value="Dresses">Dresses</option>
                                                <option value="Tops">Tops</option>
                                                <option value="Co-ords">Co-ords</option>
                                                <option value="Ethnic">Ethnic</option>
                                                <option value="Casual">Casual</option>
                                                <option value="Party">Party</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Stock Quantity
                                            </label>
                                            <input
                                                type="number"
                                                name="stock"
                                                required
                                                min="0"
                                                value={productData.stock}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-pink outline-none transition-all"
                                                placeholder="50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Sizes (select all that apply)
                                        </label>
                                        <div className="flex gap-4">
                                            {['S', 'M', 'L', 'XL'].map((size) => (
                                                <label key={size} className="flex items-center gap-2 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={productData.sizes.includes(size)}
                                                        onChange={(e) => {
                                                            const newSizes = e.target.checked
                                                                ? [...productData.sizes, size]
                                                                : productData.sizes.filter(s => s !== size);
                                                            setProductData({ ...productData, sizes: newSizes });
                                                        }}
                                                        className="w-5 h-5 text-primary-pink rounded border-gray-300 focus:ring-primary-pink cursor-pointer"
                                                    />
                                                    <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-pink transition-colors">{size}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Product Image (Required)
                                        </label>
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold text-primary-pink">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or WEBP</p>
                                                    {imageFile && <p className="mt-4 px-4 py-1.5 bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 rounded-full font-medium truncate max-w-[200px] text-sm">✓ {imageFile.name}</p>}
                                                </div>
                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                            </label>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-4 bg-gradient-to-r from-primary-pink to-pink-500 text-white rounded-xl font-bold shadow-lg shadow-pink-200 dark:shadow-none hover:shadow-xl transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                                    >
                                        {isLoading ? (
                                            <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                                        ) : (
                                            'Publish Product'
                                        )}
                                    </motion.button>
                                </form>
                            </motion.div>
                        )}

                        {/* Users Activity */}
                        {activeTab === 'users' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Platform Users
                                    </h3>
                                    <button onClick={fetchUsers} className="text-primary-pink hover:text-pink-600 font-medium text-sm flex items-center gap-1 bg-pink-50 dark:bg-pink-900/20 px-3 py-1.5 rounded-lg transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                        Refresh List
                                    </button>
                                </div>

                                {isLoading ? (
                                    <div className="flex justify-center py-12">
                                        <span className="w-8 h-8 border-4 border-primary-pink border-t-transparent rounded-full animate-spin"></span>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                                                <tr>
                                                    <th className="px-6 py-4 font-semibold tracking-wider">User Details</th>
                                                    <th className="px-6 py-4 font-semibold tracking-wider">Role Access</th>
                                                    <th className="px-6 py-4 font-semibold tracking-wider">Joined Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                                {users.map((u) => (
                                                    <tr key={u._id} className="bg-white dark:bg-gray-800 hover:bg-pink-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-gray-900 dark:text-white text-base">{u.name}</span>
                                                                <span className="text-sm text-gray-500 font-normal">{u.email}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === 'admin'
                                                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                                                                    : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border border-green-200 dark:border-green-800'
                                                                }`}>
                                                                {u.role.toUpperCase()}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                                            <div className="flex items-center gap-2">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                                {new Date(u.createdAt).toLocaleDateString('en-US', {
                                                                    year: 'numeric', month: 'short', day: 'numeric'
                                                                })}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {users.length === 0 && (
                                                    <tr>
                                                        <td colSpan="3" className="px-6 py-12 text-center text-gray-500 flex flex-col items-center justify-center">
                                                            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                                            <span>No users have joined yet.</span>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
