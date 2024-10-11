import express from 'express';
import pool from './config/db.js';
import cors from 'cors';
import router from './route/userRoute.js';  
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/api', (req, res) => {
  res.json({ message: 'This is data from the backend!' });
});


// Database test route
app.get('/dbtest', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/test2', async (req, res) => {

    res.status(200).json({ error: 'test' });
  
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

