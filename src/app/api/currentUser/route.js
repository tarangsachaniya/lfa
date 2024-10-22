import connectDB from '@/lib/dbConnect';
import User from '@/lib/models/userSchema';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB(); 
    const { userId } = auth(); 
    const userData = await User.findOne({ clerkUserId: userId }); 
    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
  }
}
