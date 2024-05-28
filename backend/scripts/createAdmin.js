// File: MyCMS/backend/scripts/createAdmin.js

const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect('mongodb://localhost:27017/cmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Database connected');

  const admin = new User({
    username: 'admin',
    password: 'admin123',
    role: 'admin',
  });

  await admin.save();
  console.log('Admin user created');
  mongoose.connection.close();
});
