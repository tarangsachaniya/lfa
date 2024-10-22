import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 300,
  },
  author: {
    type: String, // Now it stores the clerkUserId directly
    required: true,
  },
  image: {
    type: String,
  },
  isAdminApproved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
