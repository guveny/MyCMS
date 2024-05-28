// File: MyCMS/frontend/src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('http://localhost:5005/api/users/me')
        .then((response) => {
          setIsAuthenticated(true);
          setUserRole(response.data.role);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user role:', error);
          setIsAuthenticated(false);
          setLoading(false);
          localStorage.removeItem('token');
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get('http://localhost:5005/api/users/me');
      setUserRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole('');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
