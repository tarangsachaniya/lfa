'use client';
import Loading from '@/components/Loading';
import StoryCard from '@/components/StoryCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Page = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/blog?isAdminApproved=true',{
          method: 'GET',
        });
        const data = await res.json(); 
        setStories(data.blogs || []);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="bg-base-100 p-6">
      <h1 className="text-3xl font-bold text-center">Stories</h1>
      <p className="text-center text-sm p-4">
        Explore the latest stories from the world of art and design.
      </p>

      {/* Add Story link aligned to the right */}
      <div className="flex justify-end mb-3">
        <Link href="/addStory">
          <button className="btn btn-primary">
            Add Story
          </button>
        </Link>
      </div>

      <hr className="pb-3" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="text-center col-span-3"><Loading /></div>
        ) : stories.length > 0 ? (
          stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))
        ) : (
          <p className="text-center col-span-3">No stories available</p>
        )}
      </div>
    </div>
  );
};

export default Page;
