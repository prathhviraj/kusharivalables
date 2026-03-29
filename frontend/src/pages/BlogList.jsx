import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import Loader from '../components/Loader';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await blogAPI.getAll();
        setBlogs(data.data);
      } catch (err) {
        console.error('Failed to load blogs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-pink to-pink-400 bg-clip-text text-transparent mb-4">
          Style & Stories
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Discover the latest fashion trends, style guides, and exclusive behind-the-scenes content from Kusharivalables.
        </p>
      </motion.div>

      {blogs.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-pink-100 dark:border-gray-700">
          <svg className="w-16 h-16 mx-auto text-pink-200 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Stories Yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Check back later for trendy fashion insights!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none dark:border border-gray-700 transition-all flex flex-col"
            >
              <Link to={`/blog/${blog._id}`} className="block relative h-64 overflow-hidden group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary-pink tracking-wider uppercase mb-3">
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>By {blog.author}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-primary-pink transition-colors">
                  <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 flex-1 text-sm">
                  {blog.content}
                </p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="inline-flex items-center gap-2 text-primary-pink font-semibold hover:text-pink-600 transition-colors"
                >
                  Read full story
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
