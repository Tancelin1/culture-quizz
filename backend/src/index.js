const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const answerRouter = require('./routes/answer');
const categoriesRouter = require('./routes/categories');
const questionRouter = require('./routes/question');
const scoresRouter = require('./routes/scores');

app.use('/answers', answerRouter);
app.use('/categories', categoriesRouter);
app.use('/questions', questionRouter);
app.use('/scores', scoresRouter);

mongoose.connect('mongodb://localhost:27017/culture-quizz', {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
