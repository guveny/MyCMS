// File: MyCMS/frontend/src/pages/ManageContacts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get('http://localhost:5005/api/contacts');
        setContacts(res.data);
      } catch (err) {
        console.error('Error fetching contacts:', err.message);
      }
    };
    fetchContacts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/contacts/create', { name, email, message });
      setContacts([...contacts, res.data]);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Error creating contact:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/contacts/${id}`);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      console.error('Error deleting contact:', err.message);
    }
  };

  return (
    <div>
      <h2>Manage Contacts</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <button type="submit">Create Contact</button>
      </form>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            {contact.name} ({contact.email}) <button onClick={() => handleDelete(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageContacts;
