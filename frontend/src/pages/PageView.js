// File: MyCMS/frontend/src/pages/PageView.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PageView = () => {
  const { id } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(`http://localhost:5005/api/pages/${id}`);
        setPage(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchPage();
  }, [id]);

  if (!page) return <div>Loading...</div>;

  return (
    <div>
      <h2>{page.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};

export default PageView;
