const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express(); // ✅ FIRST declare app

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes); // ✅ Now works

app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB! ✅');
});

const PORT = 5050;
const HOST = '127.0.0.1';

mongoose.connect(process.env.MONGO_URI, {})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server listening on http://${HOST}:${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
