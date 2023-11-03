const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    enums: ['Math', 'Science', 'English', 'Computer'],
  }
}, {
  timestamps: true,
});

const Teacher = mongoose.model('teacher', teacherSchema);

module.exports = Teacher;