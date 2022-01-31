const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema({
    description: {
        type: String,

    },
    choices: {
        type: [String],

    },
    answer: {
        type: String,

    }
})

module.exports = mongoose.model("questions", QuestionsSchema);
