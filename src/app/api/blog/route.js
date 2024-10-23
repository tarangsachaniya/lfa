import connectDB from '@/lib/dbConnect';
import Blog from '@/lib/models/blogSchema';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { URL } from 'url';

connectDB();

export async function GET(req) {
      try {
            const url = new URL(req.url);
            const isAdminApproved = url.searchParams.get('isAdminApproved') === 'true';
            const query = [
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
            ];
            if (isAdminApproved) {
                  query.unshift({
                        $match: {
                              isAdminApproved: true,
                        },
                  });
            }
            const blogs = await Blog.aggregate(query);

            return NextResponse.json({ blogs });
      } catch (error) {
            console.error('Error fetching blogs:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
}

export async function POST(req) {
      try {
            const { userId } = auth();
            if (!userId) {
                  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }

            const formData = await req.formData();
            const title = formData.get('title');
            const content = formData.get('content');
            const image = formData.get('image');
            const slug = formData.get('slug');

            if (!title || !content || !image) {
                  return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
            }

            const newBlog = await Blog.create({
                  title,
                  content,
                  author: userId,
                  slug,
                  image,
            });

            return NextResponse.json({ message: 'Blog post created successfully', blog: newBlog }, { status: 201 });
      } catch (error) {
            console.error('Error creating blog post:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
}
