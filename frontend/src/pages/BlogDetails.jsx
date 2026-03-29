import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogAPI } from '../services/api';
import Loader from '../components/Loader';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await blogAPI.getById(id);
        setBlog(data.data);
      } catch (err) {
        console.error('Failed to load blog', err);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  if (loading) return <Loader />;
  if (!blog) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-pink dark:hover:text-primary-pink transition-colors mb-8 font-medium"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to all stories
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <div className="w-full h-[400px] md:h-[500px] relative">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="flex items-center gap-3 text-pink-300 font-semibold text-sm tracking-wider uppercase mb-4">
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
              <span>By {blog.author}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">
              {blog.title}
            </h1>
          </div>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {blog.content}
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default BlogDetails;
