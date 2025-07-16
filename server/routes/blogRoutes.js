import express from 'express';
import { addBlog, getAllBlogs, getBlogById, togglePublish, deleteBlogById, addComment, getBlogComment, generateContent } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';
import { get } from 'mongoose';

const blogRouter = express.Router();


blogRouter.post('/comments', getBlogComment);
blogRouter.post('/add', upload.single('image'), auth, addBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/delete', auth, deleteBlogById);
blogRouter.post('/toggle-publish', auth, togglePublish);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/generate', generateContent);

export default blogRouter;