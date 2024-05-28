// File: MyCMS/frontend/src/components/MainLayout.js

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './MainLayout.css'; // Ensure your CSS file is correctly imported

const MainLayout = ({ children }) => {
  const [pages, setPages] = useState([]);
  const { isAuthenticated, logout } = useContext(AuthContext);

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

  return (
    <div>
      <nav className="main-nav">
        <Link to="/">Home</Link>
        {pages.map((page) => (
          <Link key={page._id} to={`/page/${page._id}`}>
            {page.title}
          </Link>
        ))}
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
