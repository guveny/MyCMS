// File: MyCMS/frontend/src/pages/EditPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import MyEditor from '../components/MyEditor';

const EditPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(`http://localhost:5005/api/pages/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching page:', err.message);
        setLoading(false);
      }
    };
    fetchPage();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.put(`http://localhost:5005/api/pages/${id}`, { title, content }, config);
      history.push('/manage-content');
    } catch (err) {
      console.error('Error updating page:', err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Content</label>
          <MyEditor data={content} onChange={setContent} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPage;
