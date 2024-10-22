import Blog from '@/lib/models/blogSchema';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { userId } = auth();

    // Ensure the user is authenticated
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the request body
    const formData = await req.formData();
    const title = formData.get('title');
    const content = formData.get('content');
    const image = formData.get('image'); // Assuming it's a base64 image string

    // Validate that all required fields are provided
    if (!title || !content || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a new blog post
    const newBlog = await Blog.create({
      title,
      content,
      userId,
      image, // Assuming the image is saved as a base64 string or handled elsewhere
    });

    return NextResponse.json({ message: 'Blog post created successfully', blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
