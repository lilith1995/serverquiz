const express = require("express");
const router = express.Router();

const Question = require("../../models/Question");

router.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const { choices } = req.body;
    const { answer } = req.body;

    const question = await Question.create({
      description,
      choices,
      answer,
    });

    return res.status(201).json(question);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Question.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
// router.get("/id", (req, res) => {
//   let id = req.params.id;
//   Question.findById(id, (err, data) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else {
//       res.json(data);
//     }
//   });
// });

// router.delete("/deleteQuestion/:id", (req, res) => {
//   const id = req.params.id;
//   allQuestionsData.deleteOne({ _id: id }, (err, data) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else {
//       res.status(200).json(data);
//     }
//   });
// });

// router.put("/updateQuestion/:id", (req, res) => {
//   const id = req.params.id;

//   Question.findById(id, (err, data) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else {
//       data.question = req.body.question;
//       data.answers = req.body.answers;
//       data.rightAnswer = req.body.rightAnswer;
//       data.save();
//       res.status(200).json(data);
//     }
//   });
// });

module.exports = router;
