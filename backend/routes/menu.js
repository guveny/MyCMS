// File: MyCMS/backend/routes/menu.js

const express = require('express');
const router = express.Router();
const Page = require('../models/Page');

// Get menu items
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find({}, 'title');
    res.json(pages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
