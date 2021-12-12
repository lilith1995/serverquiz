const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("MongoDB connected"));

app.use(express.json({ extended: false}));


app.get('/', (req, res) => res.send('API Running'))

app.use('/api/questions', require('./routes/api/questions'));
app.use('/api/users', require('./routes/api/users'));

app.listen(process.env.PORT, () => {
  console.log("The API is running...");
});
