// File: MyCMS/frontend/src/pages/ManageContent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageContent = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await axios.get('http://localhost:5005/api/pages');
        setPages(res.data);
      } catch (err) {
        console.error('Error fetching pages:', err.message);
      }
    };
    fetchPages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.delete(`http://localhost:5005/api/pages/${id}`, config);
      setPages(pages.filter((page) => page._id !== id));
      window.location.reload(); // Refresh to update the menu
    } catch (err) {
      console.error('Error deleting page:', err.message);
    }
  };

  return (
    <div>
      <h2>Manage Content</h2>
      <ul>
        {pages.map((page) => (
          <li key={page._id}>
            {page.title} <a href={`/edit-page/${page._id}`}>Edit</a> <button onClick={() => handleDelete(page._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageContent;
