const express = require('express');
const router = express.Router();
const Widget = require('../models/Widget');

// Get all widgets
router.get('/', async (req, res) => {
  try {
    const widgets = await Widget.find();
    res.json(widgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create/Update widgets (bulk)
router.post('/sync', async (req, res) => {
  try {
    const { widgets } = req.body;
    // Simple implementation: clear and re-insert
    await Widget.deleteMany({});
    const savedWidgets = await Widget.insertMany(widgets);
    res.status(201).json(savedWidgets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a widget
router.delete('/:id', async (req, res) => {
  try {
    await Widget.deleteOne({ id: req.params.id });
    res.json({ message: 'Widget deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
