const express = require('express');
const router = express.Router();

const Teacher = require('../models/teacher.model');
const seedData = require('../db/dummyData');

// Get All Teachers API
router.get('/', async (req, res) => {
  try {
    const teachers = await getAllTeachers();
    if(teachers.length === 0){
      seedData(addTeacher, "teachers");
      console.log("Seeded Data..");
    }
    res.status(200).json({
      message: "Teachers Found",
      teachers,
    })
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message
    })
  }
});

async function getAllTeachers(){
  try{
    const teachers = await Teacher.find();
    return teachers;
  }catch(e){
    throw e;
  }
}

// Create New Teacher API
router.post('/', async (req, res) => {
  try {
    const teacherData = req.body;
    const teacher = await addTeacher(teacherData);
    res.status(201).json({
      message: "Teacher Created",
      teacher,
    })
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message
    })
  }
});

async function addTeacher(teacherData){
  try{
    const newTeacher = new Teacher(teacherData);
    const createdTeacher = await newTeacher.save();
    return createdTeacher;
  }catch(e){
    throw e;
  }
}

// Update Existing Teacher API
router.post('/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;
    const updatedData = req.body;
    const teacher = await updateTeacher(teacherId, updatedData);
    res.status(200).json({
      message: "Teacher Updated",
      teacher,
    })
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message
    })
  }
});

async function updateTeacher(teacherId, updatedData){
  try{
    const teacher = await Teacher.findOne({ _id: teacherId });
    if(!teacher){
      throw new Error("Teacher Not Found");
    }
    const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, updatedData);
    return updatedTeacher;
  }catch(e){
    throw e;
  }
}

// Delete Teacher API
router.delete('/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacher = await deleteTeacher(teacherId);
    res.status(200).json({
      message: "Teacher Deleted"
    })
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message
    })
  }
});

async function deleteTeacher(teacherId){
  try{
    const teacher = await Teacher.findOne({ _id: teacherId });
    if(!teacher){
      throw new Error("Teacher Not Found");
    }
    await Teacher.findByIdAndDelete(teacherId);
  }catch(e){
    throw e;
  }
}

module.exports = router;