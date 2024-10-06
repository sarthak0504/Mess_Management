// server/model/inventory.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
});

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
const Item = mongoose.model('Item', itemSchema);

module.exports = { Category, Item };
