import connectDB from '@/lib/dbConnect';
import Blog from '@/lib/models/blogSchema';
import upload from '@/lib/multer';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
connectDB();
export async function GET(req) {
      try {
            const blogs = await Blog.aggregate([
                  {
                        $lookup: {
                              from: 'users',
                              localField: 'author',
                              foreignField: 'clerkUserId',
                              as: 'authorDetails',
                        },
                  },
                  {
                        $unwind: '$authorDetails',
                  },
                  {
                        $sort: {
                              createdAt: -1,
                        },
                  },
            ]);
            return NextResponse.json({ blogs });
      } catch (error) {
            console.error('Error fetching blogs:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
}
export async function POST(req) {
      const { userId } = auth();
      if (!userId) {
            return resolve(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
      }

      return new Promise((resolve, reject) => {
            upload.single('image')(req, {}, async (err) => {
                  if (err) {
                        return reject(NextResponse.json({ error: 'File upload failed' }, { status: 400 }));
                  }

                  try {
                        const { title, content, slug } = req.body;
                        const image = req.file?.path

                        if (!title || !content || !image) {
                              return resolve(NextResponse.json({ error: 'Missing required fields' }, { status: 400 }));
                        }

                        const newBlog = await Blog.create({
                              title,
                              content,
                              author: userId,
                              slug,
                              image,
                        });

                        return resolve(NextResponse.json({ message: 'Blog post created successfully', blog: newBlog }, { status: 201 }));
                  } catch (error) {
                        console.error('Error creating blog post:', error);
                        return resolve(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
                  }
            });
      });
}
