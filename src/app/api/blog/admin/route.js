import connectDB from "@/lib/dbConnect";
import Blog from "@/lib/models/blogSchema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(req) {
  try {
    await connectDB();

    // Parse the JSON body
    const { id } = await req.json();

    // Ensure that id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid blog ID' }, { status: 400 });
    }

    const updatedBlog = await Blog.updateOne(
      { _id: id },
      { isAdminApproved: true }
    );

    if (updatedBlog.nModified === 0) {
      return NextResponse.json({ message: 'Blog not found or already approved' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog approved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error approving blog:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
