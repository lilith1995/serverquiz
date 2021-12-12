const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Questions = require("../models/Question");

router.get('/questions', async (req, res) => {
    console.log("Hi")
    try {
        const questions = await Questions.find()
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})



















// const questionData = new Schema({
//   question: {
//     type: String,
//     required: true,
//   },
//   choices: {
//     type: [String],
//     required: true,
//   },
//   answer: {
//     type: String,
//     required: true,
//   },
// });
// const allQuestionsData = mongoose.model("allQuestionsData", questionData);

// const userData = new Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },
// });

// const allUsersData = mongoose.model("allUsersData", userData);

// router.get("/", (req, res) => {
//   res.send("apps");
// });

// router.post("/addQuestion", (req, res) => {
//   const a = new allQuestionsData(req.body);
//   a.save()
//     .then((data) => {
//       console.log(data);
//       res.status(200).json(data);
//     })
//     .catch((err) => res.status(400).send({ message: err.message }));
// });

// router.post("/addUser", (req, res) => {
//   let errMessage = "";
//   allUsersData.find((err, data) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else {
//       for (let i = 0; i < data.length; i++) {
//         if (data[i].username === req.body.username) {
//           errMessage += "Username is exist. ";
//         }
//         if (data[i].password === req.body.password) {
//           errMessage += "Password is exist. ";
//         }
//       }

//       if (errMessage !== "") {
//         res.status(401).send({ message: errMessage });
//       } else {
//         let newUser = new allUsersData(req.body);
//         newUser
//           .save()
//           .then((r) =>
//             res.status(201).send({ success: true, message: "User aded" })
//           )
//           .catch((err) => res.status(400).send({ message: err.message }));
//       }
//     }
//   });
// });

// router.get("/getAllUsers", (req, res) => {
//   allUsersData.find((err, data) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else {
//       res.json(data);
//     }
//   });
// });

// router.get("/getUser/:username", (req, res) => {
//   allUsersData.findOne(
//     {
//       username: req.params.username,
//     },
//     (err, data) => {
//       if (err) {
//         res.status(400).send({ message: err.message });
//       } else {
//         res.json(data);
//       }
//     }
//   );
// });

// router.get("/getAllQuestions", (req, res) => {
//   allQuestionsData.find((err, data) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else {
//       res.json(data);
//     }
//   });
// });

// router.get("/getQuestion/:id", (req, res) => {
//   let id = req.params.id;
//   allQuestionsData.findById(id, (err, data) => {
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

//   allQuestionsData.findById(id, (err, data) => {
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
