const mongoose = require('mongoose');

async function connectDB() {
  if (process.env.USE_MEMORY === 'true' || !process.env.MONGO_URI) {
    console.log('Using in-memory store (no MongoDB).');
    return;
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
}

module.exports = { connectDB };
