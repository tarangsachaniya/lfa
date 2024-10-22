'use client';
import { useState } from "react";
import BlogComponent from "./BlogCompnent"; // Corrected spelling of the component

const BlogTable = ({ blogs, onUpdate }) => { // Accept onUpdate as a prop
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleReadNowClick = (blog) => {
    setSelectedBlog(blog); // Set the selected blog
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedBlog(null); // Clear the selected blog
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full bg-base-200 text-base-content">
        {/* head */}
        <thead className="bg-base-300">
          <tr>
            <th>Blog Title</th>
            <th>Author</th>
            <th>Admin Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Dynamically map over the blogs array */}
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <tr key={index} className="hover:bg-base-300">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={blog.image || "https://via.placeholder.com/150"} // Fallback if image doesn't exist
                          alt={`Avatar of ${blog.title}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{blog.title}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {blog.authorDetails.name || "Unknown Author"}
                </td>
                <td>
                  <div className={`badge ${blog.adminApproved ? "badge-success" : "badge-error"}`}>
                    {blog.isAdminApproved ? "Yes" : "No"}
                  </div>
                </td>
                <td>
                  <button 
                    className="btn btn-primary btn-sm" 
                    onClick={() => handleReadNowClick(blog)}
                  >
                    Read Now
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No blogs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <BlogComponent
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        blog={selectedBlog} 
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default BlogTable;
