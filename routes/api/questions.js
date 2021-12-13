const express = require("express");
const router = express.Router();

const Question = require("../../models/Question");

router.post("/", async (req, res) => {
  console.log("Hello", req.body);
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
    return res.status(500).json({ error: error.message || error});
  }
});


module.exports = router;
