const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function restructureQuestions() {
  try {
    await client.connect();
    const database = client.db('culture-quizz');
    const questionsCollection = database.collection('questions');

    // Trouver le document unique contenant les questions imbriquées
    const questionsDoc = await questionsCollection.findOne();
    
    if (questionsDoc && questionsDoc.questions && Array.isArray(questionsDoc.questions)) {
      const questions = questionsDoc.questions;

      // Supprimez le document original contenant les questions imbriquées
      await questionsCollection.deleteOne({ _id: questionsDoc._id });

      // Insérez chaque question comme un document individuel dans la collection 'questions'
      for (const question of questions) {
        await questionsCollection.insertOne(question);
      }

      console.log('Questions restructured successfully.');
    } else {
      console.log('No questions found to restructure.');
    }
  } catch (err) {
    console.error('Error restructuring questions:', err);
  } finally {
    await client.close();
  }
}

restructureQuestions();
