import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: __dirname + '/.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create MySQL connection pool
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
    return;
  }
  console.log('Successfully connected to the database.');
  connection.release();
});

// Create table if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS patient_questionnaires (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(255),
    age INT,
    gender VARCHAR(10),
    symptoms TEXT,
    medical_history TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

pool.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table created or already exists.');
  }
});

// API endpoint to save form data
app.post('/api/save-questionnaire', (req, res) => {
  const { patientName, age, gender, symptoms, medicalHistory } = req.body;

  const query = 'INSERT INTO patient_questionnaires (patient_name, age, gender, symptoms, medical_history) VALUES (?, ?, ?, ?, ?)';
  const values = [patientName, age, gender, symptoms, medicalHistory];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error saving questionnaire:', err);
      res.status(500).json({ error: 'Error saving questionnaire' });
    } else {
      res.status(201).json({ message: 'Questionnaire saved successfully', id: result.insertId });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
