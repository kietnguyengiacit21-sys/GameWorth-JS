require('dotenv').config();

const express = require('express');
const cors = require('cors');

const pool = require('./src/config/db');
const gameRoutes = require('./src/routes/gameRoutes');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const path = require('path');
const app = express();

const imageFolderPath = path.join(
  __dirname,
  'public',
  'images'
);

app.use(
  '/images',
  express.static(imageFolderPath)
);
const PORT = Number(process.env.PORT || 8080);

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      database: 'connected',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      message: error.message,
    });
  }
});

app.use('/api/games', gameRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`GameWorth Node API running on http://localhost:${PORT}`);
});
