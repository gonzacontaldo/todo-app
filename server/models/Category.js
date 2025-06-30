const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, default: '#16dfba' }
});

module.exports = mongoose.model('Category', CategorySchema);
