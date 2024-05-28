// File: MyCMS/frontend/src/pages/ManageBlogs.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5005/api/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error('Error fetching blogs:', err.message);
      }
    };
    fetchBlogs();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/blogs/create', { title, content });
      setBlogs([...blogs, res.data]);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Error creating blog:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (err) {
      console.error('Error deleting blog:', err.message);
    }
  };

  return (
    <div>
      <h2>Manage Blogs</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button type="submit">Create Blog</button>
      </form>
      <ul>
        {blogs.map(blog => (
          <li key={blog._id}>
            {blog.title} <button onClick={() => handleDelete(blog._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBlogs;
