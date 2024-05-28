// File: MyCMS/frontend/src/components/NavButtons.js

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavButtons = () => {
  const history = useHistory();
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="nav-buttons">
      <button onClick={() => history.push('/')}>Home</button>
      <button onClick={() => history.goBack()}>Back</button>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => history.push('/login')}>Login</button>
      )}
    </div>
  );
};

export default NavButtons;
