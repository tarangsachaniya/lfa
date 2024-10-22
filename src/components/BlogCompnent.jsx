import React from 'react';
import DOMPurify from 'dompurify';

const BlogComponent = ({ isOpen, onClose, blog,onUpdate }) => {
  if (!isOpen || !blog) return null; // Ensure a blog is selected

  const sanitizedContent = DOMPurify.sanitize(blog.content);

  const onApprove = async (id) => {
    try {
      const response = await fetch('/api/blog/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Specify content type
        },
        body: JSON.stringify({ id }), // Send the ID as JSON
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        onUpdate();
        onClose(); // Close the modal
      } else {
        const errorText = await response.text();
        console.error('Error updating blog: ', errorText); // Log the error message
      }
    } catch (error) {
      console.error('Fetch error: ', error); // Log fetch errors
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box text-white p-6 rounded-lg shadow-lg">
        <h3 className="font-bold text-lg mb-4">{blog.title}</h3>
        <div
          className="py-4"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }} // Set sanitized HTML
        />
        <div className="modal-action">
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
          {blog.isAdminApproved === false && ( // Show button if not approved
            <button
              className="btn bg-green-500 text-white hover:bg-green-600"
              onClick={() => onApprove(blog._id)} // Call onApprove with the blog ID
            >
              Approve
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default BlogComponent;
