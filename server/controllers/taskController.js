// controllers/taskController.js
const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

// Create a new task
const createTask = async (req, res) => {
  const { title, category } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTask = await Task.create({ title, category });
  res.status(201).json(newTask);

};


// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.status(204).end();
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
