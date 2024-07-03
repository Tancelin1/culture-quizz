const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
}, { _id: false });

const categoriesArraySchema = new mongoose.Schema({
  categories: [categoriesSchema]
});

module.exports = mongoose.models.Categories || mongoose.model('Categories', categoriesArraySchema);
