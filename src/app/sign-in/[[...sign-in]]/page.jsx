import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='bg-base-100 p-6 flex justify-center min-h-0'>
    <SignIn />
    
    </div>
}