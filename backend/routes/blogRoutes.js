const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogById,
  createBlog,
  deleteBlog
} = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', protect, admin, createBlog);
router.delete('/:id', protect, admin, deleteBlog);

module.exports = router;
