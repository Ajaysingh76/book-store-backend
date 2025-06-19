const express = require('express');
const router  = express.Router();
const Book    = require('../models/Book');


router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  const { title, author, price, publishedDate } = req.body;
  try {
    const newBook  = new Book({ title, author, price, publishedDate });
    const saved    = await newBook.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const { title, author, price, publishedDate } = req.body;
  try {
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, price, publishedDate },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Book not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;      
