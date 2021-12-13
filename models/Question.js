const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema({
  description: {
        type: String,
        required: true
    },
    choices: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("questions", QuestionsSchema);
