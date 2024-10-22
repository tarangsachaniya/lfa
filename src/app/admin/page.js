'use client';
import BlogTable from '@/components/BlogTable';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';

const Page = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]); // State to hold the blogs

  // Check if the user is an admin and update loading state
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user); // Parse the user from localStorage
      setIsAdmin(parsedUser?.isAdmin); // Check if the user is an admin
    }
    setLoading(false); // Set loading to false after checking
  }, []); // Only run on mount

  // Fetch blogs if the user is an admin
  const fetchBlogs = async () => {
    setLoading(true); // Set loading true before fetching
    try {
      const res = await fetch('/api/blog');
      if (!res.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await res.json();
      setBlogs(data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchBlogs();
    }
  }, [isAdmin]); // Only run when isAdmin changes

  // Manage body overflow based on loading state and admin status
  useEffect(() => {
    if (loading || !isAdmin) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [loading, isAdmin]); // Only run when loading or isAdmin changes

  // Display loading spinner if still fetching
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  // Display message if the user is not an admin
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-3xl text-wrap text-center">
          You do not have permission to access this page.
        </div>
      </div>
    );
  }

  // Display the admin dashboard with the fetched blogs
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg text-white-500">
        Welcome to the admin dashboard. Here you can manage the application.
      </p>
      <div role="tablist" className="tabs tabs-lifted">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Blog" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <BlogTable blogs={blogs} onUpdate={fetchBlogs} /> {/* Pass fetchBlogs as onUpdate */}
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="User"
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          Tab content 2
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Team Members" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          Tab content 3
        </div>
      </div>
    </div>
  );
};

export default Page;
