// routes/answer.js

const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');

router.get('/', async (req, res) => {
    try {
        const answers = await Answer.find();
        res.json(answers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }
        res.json(answer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { statement, isCorrect, question_id } = req.body;
    const answer = new Answer({ statement, isCorrect, question_id });
    try {
        const newAnswer = await answer.save();
        res.status(201).json(newAnswer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { statement, isCorrect, question_id } = req.body;
    try {
        const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, { statement, isCorrect, question_id }, { new: true });
        res.json(updatedAnswer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Answer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Answer deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
