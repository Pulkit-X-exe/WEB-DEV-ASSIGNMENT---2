const express = require('express');
const router = express.Router();
let students = require('../data/students');

// 1. Get all students
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    students: students
  });
});

// 2. Get student by ID
router.get('/:id', (req, res) => {
  const student = students.find((s) => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  res.status(200).json({
    success: true,
    student: student
  });
});

// 3. Create new student
router.post('/create', (req, res) => {
  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({
      success: false,
      message: "Name, age and course are required"
    });
  }

  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  const newStudent = {
    id: newId,
    name,
    age: Number(age),
    course
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    student: newStudent
  });
});

// 4. Update student by ID
router.put('/update/:id', (req, res) => {
  const student = students.find((s) => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({
      success: false,
      message: "Name, age and course are required"
    });
  }

  student.name = name;
  student.age = Number(age);
  student.course = course;

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    student: student
  });
});

// 5. Delete student by ID
router.delete('/:id', (req, res) => {
  const index = students.findIndex((s) => s.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  students.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully"
  });
});

module.exports = router;
