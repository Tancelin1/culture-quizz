const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const Categories = require('../models/categories');

router.get('/', async (req, res) => {
  const { category_id } = req.query;

  try {
    if (!category_id) {
      return res.status(400).json({ message: 'Missing category_id parameter' });
    }

    const parsedCategoryId = parseInt(category_id);

    const categoryDocument = await Categories.findOne({ 'categories.id': parsedCategoryId });

    if (!categoryDocument) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const category = categoryDocument.categories.find(cat => cat.id === parsedCategoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const questions = await Question.find({ category_id: parsedCategoryId });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this category_id' });
    }

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
