// File: MyCMS/frontend/src/pages/CreatePage.js

import React, { useState } from 'react';
import axios from 'axios';
import MyEditor from '../components/MyEditor';

const CreatePage = ({ history }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const res = await axios.post('http://localhost:5005/api/pages', { title, content }, config);
      console.log('Page created:', res.data);
      history.push('/dashboard');
    } catch (err) {
      console.error('Error creating page:', err.message);
      alert('Error creating page');
    }
  };

  return (
    <div>
      <h2>Create Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Content</label>
          <MyEditor data={content} onChange={setContent} />
        </div>
        <button type="submit">Create Page</button>
      </form>
    </div>
  );
};

export default CreatePage;
