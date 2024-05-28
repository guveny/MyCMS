// File: MyCMS/backend/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const pageRoutes = require('./routes/page');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Database connected');
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/pages', pageRoutes);

module.exports = app;
