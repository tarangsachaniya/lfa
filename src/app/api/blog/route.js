import Blog from '@/lib/models/blogSchema';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const { userId } = auth();

    // Ensure the user is authenticated
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the request body form data
    const formData = await req.formData();
    const title = formData.get('title');
    const content = formData.get('content');
    const imageFile = formData.get('image'); // Assuming image is a file

    // Validate required fields
    if (!title || !content || !imageFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a unique filename and store the image in the public directory
    const fileName = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

    // Convert the image to a buffer and save it in the public folder
    const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
    await fs.writeFile(filePath, fileBuffer);

    // Store the file path in the database (relative path)
    const imageUrl = `/uploads/${fileName}`;

    // Create the blog post
    const newBlog = await Blog.create({
      title,
      content,
      userId,
      image: imageUrl, // Store the relative image URL
    });

    return NextResponse.json({ message: 'Blog post created successfully', blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}