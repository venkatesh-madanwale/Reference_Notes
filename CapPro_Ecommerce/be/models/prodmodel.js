const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: { type: String },
  text: { type: String },
  rt: { type: Number, min: 0, max: 5 }
}, { _id: false });

const productSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true },
  cat: { type: String },
  price: { type: Number, required: true, min: 0 },
  desc: { type: String },
  pimg: { type: String },
  comm: [commentSchema]
}, { timestamps: true });

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
