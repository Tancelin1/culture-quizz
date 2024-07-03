// routes/categories.js

const express = require('express');
const router = express.Router();
const Category = require('../models/Categories');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    const category = new Category({ name });
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { name } = req.body;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
