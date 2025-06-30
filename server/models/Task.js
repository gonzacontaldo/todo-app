const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  category: { type: String, default: "General" }, // NEW
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
