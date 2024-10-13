const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'medical1012',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to the database.');
    connection.release();
  }
});

// Test route
app.get('/api/test', (req, res) => {
  console.log('Test route hit');
  res.json({ message: 'Backend is working' });
});

// API endpoint to save form data
app.post('/api/save-questionnaire', (req, res) => {
  console.log('Received form data:', req.body);
  const { patientName, age, gender, symptoms, medicalHistory } = req.body;

  const query = 'INSERT INTO patient_questionnaires (patient_name, age, gender, symptoms, medical_history) VALUES (?, ?, ?, ?, ?)';
  const values = [patientName, age, gender, symptoms, medicalHistory];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error saving questionnaire:', err);
      res.status(500).json({ error: 'Error saving questionnaire', details: err.message });
    } else {
      console.log('Questionnaire saved successfully:', result);
      res.status(201).json({ message: 'Questionnaire saved successfully', id: result.insertId });
    }
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
