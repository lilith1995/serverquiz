const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();

const Question = require("../../models/Question");
const authenticateJWT = require('../../middleware/auth');

router.post("/addQuestion", authenticateJWT, async (req, res) => {
    console.log("Hello", req.body);
    try {

        const { description } = req.body;
        const { choices } = req.body;
        const { answer } = req.body;

        const newQuestion = new Question({
            description,
            choices,
            answer,
        });

        const question = await newQuestion.save();
        return res.status(201).json(question);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

router.delete('/deleteQuestion/:id', authenticateJWT, (req, res) => {
    const id = req.params.id;
    Question.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            res.status(400).send({ message: err.message });
        } else {
            res.status(200).json(data);
        }
    });
});

router.put('/updateQuestion/:id', authenticateJWT, async (req, res, next) => {
    try {
        let question = Question.findById(req.params.id);
        if (!question) {
            return res.json({
                success: false,
                message: "Question's ID is missing"
            })
        } else {


            let updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {
                new: true,

            })

            res.json({
                success: true,
                message: "Question is updated",
                question: updatedQuestion

            })

        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
