import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server'
import { createUser } from '@/lib/actions/user.action'
export async function POST(req) {
      const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_KEY;
      if (!WEBHOOK_SECRET) {
            throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
      }
      const headerPayload = headers()
      const svix_id = headerPayload.get('svix-id')
      const svix_timestamp = headerPayload.get('svix-timestamp')
      const svix_signature = headerPayload.get('svix-signature')
      if (!svix_id || !svix_timestamp || !svix_signature) {
            return new Response('Error occured -- no svix headers', {
                  status: 400,
            })
      }

      // Get the body
      const payload = await req.json()
      const body = JSON.stringify(payload)

      const wh = new Webhook(WEBHOOK_SECRET)

      let evt

      // Verify the payload with the headers
      try {
            evt = wh.verify(body, {
                  'svix-id': svix_id,
                  'svix-timestamp': svix_timestamp,
                  'svix-signature': svix_signature,
            })
      } catch (err) {
            console.error('Error verifying webhook:', err)
            return new Response('Error occured', {
                  status: 400,
            })
      }
      const eventType = evt.type
      if(eventType === "user.created"){
            const {id,email_addresses,image_url,first_name,last_name,username} = evt.data;
            const user = {
                  id,
                  email: email_addresses[0].email_addresses,
                  photo : image_url,
                  name:username || `${first_name}${last_name}`,
                  firstName: first_name,
                  lastName: last_name
            }
            const newUser = await createUser(user);

            if(newUser){
                  await clerkClient.users.updateUserMetadata(id,{
                        publicMetadata:{
                              userId : newUser._id
                        }
                  })
            }
            return NextResponse.json({
                  message : "user created successfully!",
                  user : newUser
            });
      }
}