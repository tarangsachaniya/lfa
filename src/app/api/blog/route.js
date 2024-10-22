import { auth } from '@clerk/nextjs/server';
export async function POST(req) {
     try {
      const authUser = auth();
      console.log(authUser);
     } catch (error) {
      console.error(error);
     }
}