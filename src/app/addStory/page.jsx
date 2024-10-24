'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(
      newTitle
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('content', content);
    formData.append('image', image);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        body: formData,
      }); 
      if (res.ok) {
        toast.success("Blog created successfully");
        setTitle('');
        setSlug('');
        setContent('');
        setImage('');
        router.push('/stories');
      } else {
        throw new Error('Failed to create blog');
      }
    } catch (error) {
      toast.error('Error creating blog: ' + error.message); // Error toast
    }
  };

  return (
    <div className="bg-base-100 p-6">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h1 className="text-3xl font-bold text-center mb-4">Add Article</h1>
      <div className="flex flex-wrap justify-center mb-4">
        <p className="text-center text-lg pb-2">
          Whether it&apos;s a story, poem, insight, or any other creative piece, we invite you to share your voice with our community by submitting your work below.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="min-w-0 md:max-w-[75%] mx-auto p-6 rounded-lg shadow-md bg-base-300"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-white-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="input input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white-700">Slug</label>
          <input
            type="text"
            value={slug}
            readOnly
            className="input input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white-700">Content</label>
          <div className="border rounded-md border-gray-300">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="bg-base-300 text-white rounded-md md:h-48"
            />
          </div>
        </div>
        <div className="mb-4 md:mt-12">
          <label className="block text-sm font-medium text-white-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
            required
          />
        </div>
        {image && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-white-700">Image Preview</label>
            <div className="flex justify-center">
              <Image
                src={image}
                alt="Preview"
                height={0}
                width={0}
                className="mt-2 border border-gray-300 object-cover w-[80%] md:w-[35%] h-auto aspect-square"
              />
            </div>
          </div>
        )}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default Page;