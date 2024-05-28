// File: MyCMS/frontend/src/pages/Dashboard.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="ashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <ul className='dashboard-links'>
        <li><Link to="/create-page">Create Page</Link></li>
        <li><Link to="/manage-content">Manage Content</Link></li>
        <li><Link to="/manage-users">Manage Users</Link></li>
        <li><Link to="/manage-themes">Manage Themes</Link></li>
        <li><Link to="/manage-contacts">Manage Contacts</Link></li>
        <li><Link to="/manage-blogs">Manage Blogs</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;
