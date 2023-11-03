require('./db/db.connection');

const express = require('express');
const app = express();
app.use(express.json());

const studentRouter = require("./routes/students.router");
const teacherRouter = require("./routes/teachers.router");

const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:3000', 'https://thescholify.vercel.app'],
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send("Hello, Express!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});

app.use('/students', studentRouter);
app.use('/teachers', teacherRouter);