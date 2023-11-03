const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  grade: String,
  attendance: Number,
  marks: Number,
}, {
  timestamps: true,
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;