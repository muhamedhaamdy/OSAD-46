const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let students = [
  { id: 1, name: 'Ali', age: 20 },
  { id: 2, name: 'Sara', age: 22 }
];

let courses = [
  { id: 1, title: 'Introduction to Programming' },
  { id: 2, title: 'Web Development' }
];

let nextStudentId = 3;

app.get('/students', (req, res) => {
  res.status(200).json(students);
});

app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === studentId);

  if (!student) return res.status(404).json({ error: 'Student not found' });

  res.status(200).json({
    ...student,
    links: [
      { rel: 'self', href: `/students/${student.id}`, method: 'GET' },
      { rel: 'update', href: `/students/${student.id}`, method: 'PUT' },
      { rel: 'delete', href: `/students/${student.id}`, method: 'DELETE' },
      { rel: 'all-students', href: '/students', method: 'GET' }
    ]
  });
});

app.post('/students', (req, res) => {
  const { name, age } = req.body;

  if (!name || !age || typeof age !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const newStudent = { id: nextStudentId++, name, age };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const { name, age } = req.body;
  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) return res.status(404).json({ error: 'Student not found' });
  if (!name || !age || typeof age !== 'number') return res.status(400).json({ error: 'Invalid input' });

  students[studentIndex] = { id: studentId, name, age };
  res.status(200).json(students[studentIndex]);
});

app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) return res.status(404).json({ error: 'Student not found' });

  students.splice(studentIndex, 1);
  res.status(200).json({ message: 'Student deleted' });
});

app.get('/courses', (req, res) => {
  res.status(200).json(courses);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));