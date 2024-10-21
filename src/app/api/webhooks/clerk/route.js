import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser } from '@/lib/actions/user.action'
export async function POST(req) {
      const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_KEY;
      
}