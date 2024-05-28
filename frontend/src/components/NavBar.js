// File: MyCMS/frontend/src/components/NavBar.js

import React, { useContext } from 'react';
import useMenuItems from '../hooks/useMenuItems';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const menuItems = useMenuItems();
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          {menuItems.map((item) => (
            <li key={item._id}>
              <a href={`/page/${item._id}`}>{item.title}</a>
            </li>
          ))}
          {isAuthenticated && <li><a href="/dashboard">Dashboard</a></li>}
          {isAuthenticated ? (
            <li><a href="/" onClick={logout}>Logout</a></li>
          ) : (
            <li><a href="/login">Login</a></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
