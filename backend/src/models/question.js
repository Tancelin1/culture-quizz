const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  category_id: {
    type: Number,
    required: true
  },
  question_text: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correct_answer: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.models.Question || mongoose.model('Question', questionSchema);
