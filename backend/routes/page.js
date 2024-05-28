// File: MyCMS/backend/routes/page.js

const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const auth = require('../middleware/auth');

// Create a new page
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPage = new Page({
      title,
      content
    });
    await newPage.save();
    res.json(newPage);
  } catch (err) {
    console.error('Error creating page:', err.message);
    res.status(500).send('Server error');
  }
});

// Fetch all pages
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (err) {
    console.error('Error fetching pages:', err.message);
    res.status(500).send('Server error');
  }
});

// Fetch a single page by ID
router.get('/:id', async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ msg: 'Page not found' });
    }
    res.json(page);
  } catch (err) {
    console.error('Error fetching page:', err.message);
    res.status(500).send('Server error');
  }
});

// Update a page by ID
router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ msg: 'Page not found' });
    }
    page.title = title;
    page.content = content;
    await page.save();
    res.json(page);
  } catch (err) {
    console.error('Error updating page:', err.message);
    res.status(500).send('Server error');
  }
});

// Delete a page by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ msg: 'Page not found' });
    }
    await Page.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Page deleted' });
  } catch (err) {
    console.error('Error deleting page:', err.message);
    res.status(500).send(`Server error: ${err.message}`);
  }
});

module.exports = router;
