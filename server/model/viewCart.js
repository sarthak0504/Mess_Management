// server/model/cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Associate cart items with a user
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 }, // Track quantity
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
