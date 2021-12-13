const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

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

app.use(express.json({ extended: false}));


app.get('/', (req, res) => res.send('API Running'))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
}) 

app.use('/api/questions', require('./routes/api/questions'));
app.use('/api/questions/id', require('./routes/api/questions'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/users/id', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(process.env.PORT, () => {
  console.log("The API is running...");
});
