const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true },
  phno: { type: String, required: true },
  pwd: { type: String, required: true }, // You should hash this before saving
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
