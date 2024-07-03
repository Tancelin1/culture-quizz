// models/Answer.js

const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    statement: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Answer', answerSchema);
