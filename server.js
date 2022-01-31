const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport');
const admincheck = require('./middleware/admincheck');

const users = require('./routes/api/users');
const questions = require('./routes/api/questions');
const admin = require('./routes/api/admin');

require("dotenv").config();

const app = express();

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("MongoDB connected"));

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/questions', questions);
app.use('/api/admin', admin);

app.listen(process.env.PORT, () => {
  console.log("The API is running...");
});
