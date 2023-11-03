const express = require('express');
const router = express.Router();

const Student = require('../models/student.model');
const seedData = require('../db/dummyData');

// Get All Students API
router.get('/', async (req, res) => {
  try{
    const students = await getAllStudents();
    if(students.length === 0){
      seedData(addStudent, "students");
      console.log("Seeded Data..")
    }
    res.status(200).json({
      message: "Students Found",
      students,
    })
  }catch(e){
    res.status(500).json({
      error: e.message,
    });
  }
})

async function getAllStudents(){
  try{
    const students = await Student.find();
    return students;
  }catch(e){
    throw e;
  }
}

// Create New Student API
router.post('/', async (req, res) => {
  try{
    const newStudent = req.body;
    const student = await addStudent(newStudent);
    res.status(201).json({
      message: "Student Created",
      student,
    })
  }catch(e){
    res.status(500).json({
      error: e.message,
    });
  }
});

async function addStudent(studentData){
  try{
    const newStudent = new Student(studentData);
    const createdStudent = await newStudent.save();
    return createdStudent;
  }catch(e){
    throw e;
  }
}

// Update Existing Student API
router.post('/:studentId', async (req, res) => {
  try{
    const { studentId } = req.params;
    const updatedData = req.body;
    const student = await updateStudent(studentId, updatedData);
    res.status(200).json({
      message: "Student Updated",
      student,
    })
  }catch(e){
    res.status(500).json({
      error: e.message,
    });
  }
})

async function updateStudent(studentId, updatedData){
  try{
    const student = await Student.findOne({ _id: studentId });
    if(!student){
      throw new Error("Student Not Found");
    }
    const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData);
    return updatedStudent;
  }catch(e){
    throw e;
  }
}

// Delete Student API
router.delete("/:studentId", async (req, res) => {
  try{
    const { studentId } = req.params;
    const student = await deleteStudent(studentId);
    res.status(200).json({
      message: "Student Deleted",
    })
  }catch(e){
    res.status(500).json({
      error: e.message,
    });
  }
})

async function deleteStudent(studentId){
  try{
    const student = Student.findOne({ _id: studentId });
    if(!student){
      throw new Error("Student Not Found");
    }
    await Student.findByIdAndDelete(studentId);
  }catch(e){
    throw e;
  }
}

module.exports = router;