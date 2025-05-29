const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  categories: [String],
  price: Number,
  description: String,
  requiresRx: Boolean,
  imageUrl: String,
  inStock: Boolean,
});

module.exports = mongoose.model('Medicine', medicineSchema);
