require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const tasksRouter = require('./routes/tasks');
const { connectDB } = require('./lib/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req,res) => res.json({ status: 'ok' }));
app.use('/api/tasks', tasksRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 4000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('DB connection failed. If USE_MEMORY=true, this is expected.', err.message);
    app.listen(PORT, () => console.log(`API (no DB) on http://localhost:${PORT}`));
  });
