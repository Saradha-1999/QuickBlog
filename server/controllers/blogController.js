import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
// import main from '../configs/gemini.js';
// blogController.js
import { generateGeminiContent } from '../configs/gemini.js';


export const addBlog = async (req, res) => {
  try {
    // Parse the JSON string from multipart/form-data field 'blog'
    let { title, subTitle, description, category, image, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    // Convert isPublished to boolean (handles both string and actual boolean values)
    isPublished = isPublished === true || isPublished === "true";

    // Validate required fields
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    // Read file buffer from uploaded image
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/QuickBlog"
    });

    // Optimize image URL
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" }
      ]
    });

    const Image = optimizedImageUrl;

    // Save blog to the database
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: Image,
      isPublished
    });

    res.json({ success: true, message: "Blog added successfully" });

  } catch (error) {
    console.error("Error in addBlog:", error);
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({isPublished:true})
    res.json({ success: true, blogs});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const getBlogById = async (req, res) => {
  try {
    const {blogId} = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
}

export const deleteBlogById = async (req, res) => {
  try {
    const {id} = req.body;
    await Blog.findByIdAndDelete(id);
    
    //delete all comments associated with the blog
    await Comment.deleteMany({blog: id});

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
}

export const togglePublish = async (req, res) => {
  try {
      const {id} = req.body;
      const blog = await Blog.findById(id);
      blog.isPublished = !blog.isPublished;
      await blog.save(); 
      res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
}

export const addComment = async (req, res) => {
  try {
      const {blog, name, content} = req.body;
      await Comment.create({blog, name, content});
      res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
}

export const getBlogComment = async (req, res) => {
  try {
      const {blogId} = req.body;
      const comments = await Comment.find({blog: blogId, isApproved: true}).sort
      ({createdAt:-1});
      res.json({ success: true, comments });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
}

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await generateGeminiContent(prompt + '. Generate a blog content for this topic in simple words.');

    if (!content) {
      return res.status(500).json({ success: false, message: "Failed to generate content" });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error("❌ Controller Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};




// import fs from 'fs';
// import imagekit from '../configs/imageKit.js';
// import Blog from '../models/Blog.js';

// export const addBlog = async (req, res) => {
//     try {
//         const {title, subTitle, description, category, image, isPublished} = JSON.parse
//         (req.body.blog);
//         const imageFile = req.file;

//         if(!title || !description || !category || !imageFile) {
//             return res.json({success: false, message: "Please fill all fields"});
//         }

//         const fileBuffer = fs.readFileSync(imageFile.path)

//         // Upload image to ImageKit
//         const response = await imagekit.upload({
//             file:fileBuffer,
//             fileName: imageFile.originalname,
//             folder: "/QuickBlog"
//         })

//         // Optimisation through imagekit url trasnformation
//         const optimizedImageUrl = imagekit.url({
//             path: response.filePath,
//             transformation: [
//                 {quality: "auto"},  //auto compression
//                 {format: "webp"}, //convert to modern format
//                 {width: "1280"} //resizing
                
//             ]
//         });

//         const Image = optimizedImageUrl;

//         await Blog.create({title, subTitle, description, category, image: Image, isPublished})
//         res.json({success: true, message: "Blog added successfully"});

//     } catch (error) {
//         res.json({success:false, message: error.message});
//     }
// }