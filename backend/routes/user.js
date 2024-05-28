// File: MyCMS/backend/routes/user.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log('User found:', user);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch);
      if (isMatch) {
        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', {
          expiresIn: '1h',
        });
        return res.json({ token });
      }
    }
    res.status(401).json({ msg: 'Invalid credentials' });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Server error');
  }
});

// Get current user details
router.get('/me', auth, async (req, res) => {
  console.log('Auth middleware passed. User:', req.user);
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new user
router.post('/', auth, async (req, res) => {
  const { username, password, role, name, email, bio } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      password,
      role,
      name,
      email,
      bio
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a user by ID
router.put('/:id', auth, async (req, res) => {
  const { username, password, role, name, email, bio } = req.body;

  const userFields = { username, role, name, email, bio };
  if (password) {
    const salt = await bcrypt.genSalt(10);
    userFields.password = await bcrypt.hash(password, salt);
  }

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    user = await User.findByIdAndUpdate(req.params.id, { $set: userFields }, { new: true });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a user by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
