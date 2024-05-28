// File: MyCMS/frontend/src/pages/Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5005/api/users/profile', {
        headers: {
          'x-auth-token': token
        }
      });
      setName(res.data.name);
      setEmail(res.data.email);
      setBio(res.data.bio);
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put('http://localhost:5005/api/users/update-profile', { name, email, bio }, {
        headers: {
          'x-auth-token': token
        }
      });
      console.log(res.data);
      // Show success message
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
