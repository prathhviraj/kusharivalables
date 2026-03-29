const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get specific blog
// @route   GET /api/blogs/:id
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a blog
// @route   POST /api/blogs
exports.createBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    if (!title || !content || !image) {
      return res.status(400).json({ success: false, message: 'Title, content, and image are mandatory' });
    }
    const blog = await Blog.create({ 
      title, 
      content, 
      image,
      author: req.user.name || 'Admin'
    });
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog removed perfectly' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
