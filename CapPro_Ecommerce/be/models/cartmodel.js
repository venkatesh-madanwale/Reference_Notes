const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  _id: { type: String },
  uid: { type: String, required: true },
  pid: { type: String, required: true },
  name: { type: String, required: true },
  qty: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  pimg: { type: String }
}, { timestamps: true });

const CartModel = mongoose.model('Cart', cartSchema);
module.exports = CartModel;
