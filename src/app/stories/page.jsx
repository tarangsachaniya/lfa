import StoryCard from '@/components/StoryCard';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="bg-base-100 p-6">
      <h1 className="text-3xl font-bold text-center">Stories</h1>
      <p className="text-center text-sm p-4">
        Explore the latest stories from the world of art and design.
      </p>

      {/* Add Story link aligned to the right */}
      <div className="flex justify-end mb-3">
        <Link href="/stories/addStory">
          <button className="btn btn-primary">
            Add Story
          </button>
        </Link>
      </div>

      <hr className='pb-3' />

      {/* Responsive grid layout for story cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StoryCard />
        <StoryCard />
        <StoryCard />
        <StoryCard />
        <StoryCard />
        <StoryCard />
      </div>
    </div>
  );
};

export default Page;
