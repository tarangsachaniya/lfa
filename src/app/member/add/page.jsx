import TeamMemberForm from '@/components/TeamMemberForm';
import { auth } from '@clerk/nextjs/server';
const page = () => {
  const {userId} = auth();
  return (
    <div className='min-h-screen'>
      <div className="flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl font-bold mb-2 text-wrap">Team Member Registration</h2>
            <p className="mb-6 text-lg text-white-700 text-wrap">Want to join a team? Fill this out:</p>
      </div>
      
      <TeamMemberForm props = {userId} />
    </div>
  );
};

export default page;
