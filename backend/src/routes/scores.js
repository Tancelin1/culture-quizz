// routes/scores.js

const express = require('express');
const router = express.Router();
const Scores = require('../models/Scores');

router.get('/', async (req, res) => {
    try {
        const scores = await Scores.find();
        res.json(scores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const score = await Scores.findById(req.params.id);
        if (!score) {
            return res.status(404).json({ message: 'Score not found' });
        }
        res.json(score);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { user_id, score } = req.body;
    const newScore = new Scores({ user_id, score });
    try {
        const savedScore = await newScore.save();
        res.status(201).json(savedScore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { user_id, score } = req.body;
    try {
        const updatedScore = await Scores.findByIdAndUpdate(req.params.id, { user_id, score }, { new: true });
        res.json(updatedScore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Scores.findByIdAndDelete(req.params.id);
        res.json({ message: 'Score deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
