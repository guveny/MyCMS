// File: MyCMS/frontend/src/pages/ManageUsers.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ username: '', password: '', role: '', name: '', email: '', bio: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const res = await axios.get('http://localhost:5005/api/users', config);
        setUsers(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      let res;
      if (editUser) {
        res = await axios.put(`http://localhost:5005/api/users/${editUser._id}`, form, config);
        setUsers(users.map(user => (user._id === editUser._id ? res.data : user)));
      } else {
        res = await axios.post('http://localhost:5005/api/users', form, config);
        setUsers([...users, res.data]);
      }
      setForm({ username: '', password: '', role: '', name: '', email: '', bio: '' });
      setEditUser(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setForm({ username: user.username, role: user.role, name: user.name, email: user.email, bio: user.bio });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      await axios.delete(`http://localhost:5005/api/users/${id}`, config);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <form onSubmit={handleCreateOrUpdateUser}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Role</label>
          <input type="text" name="role" value={form.role} onChange={handleChange} required />
        </div>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Bio</label>
          <input type="text" name="bio" value={form.bio} onChange={handleChange} />
        </div>
        <button type="submit">{editUser ? 'Update User' : 'Create User'}</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} ({user.role})
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
