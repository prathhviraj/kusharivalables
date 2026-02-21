import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const response = await authAPI.getMe();
      setUser(response.data.data);

      const wishlistRes = await authAPI.getWishlist();
      setWishlist(wishlistRes.data.data);
    } catch (error) {
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token: newToken, ...userInfo } = response.data.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userInfo);
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token: newToken, ...userInfo } = response.data.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userInfo);
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setWishlist([]);
    toast.success('Logged out successfully');
  };

  const addToWishlist = async (productId) => {
    try {
      if (!user) return toast.error('Please login to wishlist products');
      await authAPI.addToWishlist(productId);
      const res = await authAPI.getWishlist();
      setWishlist(res.data.data);
      toast.success('Added to wishlist');
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to add to wishlist';
      toast.error(message);
      return false;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await authAPI.removeFromWishlist(productId);
      const res = await authAPI.getWishlist();
      setWishlist(res.data.data);
      toast.success('Removed from wishlist');
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to remove from wishlist';
      toast.error(message);
      return false;
    }
  };

  const value = {
    user,
    loading,
    wishlist,
    register,
    login,
    logout,
    addToWishlist,
    removeFromWishlist,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
