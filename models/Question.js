const mongoose = require('mongoose')

const QuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    choices: {
        type: [String],
        required: true
    },
    Answer: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('questions', QuestionsSchema);