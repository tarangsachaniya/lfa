'use client'; 
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';

const Page = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch('/api/currentUser');
        const data = await res.json();
        setIsAdmin(data.user.isAdmin);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser(); // Call the function to check user status
  }, []);

  // Effect to toggle body scroll
  useEffect(() => {
    if (loading || !isAdmin) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }
    
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup to enable scrolling when the component unmounts
    };
  }, [loading, isAdmin]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-3xl text-wrap text-center">
          You do not have permission to access this page.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg text-gray-700">
        Welcome to the admin dashboard. Here you can manage the application.
      </p>
      {/* Additional admin dashboard content goes here */}
    </div>
  );
};

export default Page;
