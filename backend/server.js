// index.js
import express from 'express';
import pool from './config/db.js';
import cors from 'cors'; // Import cors

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
  res.json({ message: 'This is data from the backend!' });
});

app.get('/dbtest', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
