const Cart = require("../models/cartmodel");
const { v4 } = require("uuid");

const addcart = async (req, res) => {
  try {
    const existing = await Cart.findOne({ uid: req.body.uid, pid: req.body.pid });
    if (existing) {
      await Cart.findByIdAndUpdate(existing._id, { $inc: { qty: 1 } });
      res.json({ msg: "qty inc" });
    } else {
      const data = new Cart({ ...req.body, _id: v4() });
      await data.save();
      res.json({ msg: "prod added to cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error in adding" });
  }
};

const getcart = async (req, res) => {
  try {
    const data = await Cart.find({ uid: req.params.uid });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "error in fetching cart" });
  }
};

const inc = async (req, res) => {
  try {
    await Cart.findByIdAndUpdate(req.params.cid, { $inc: { qty: 1 } });
    res.json({ msg: "cart inc" });
  } catch (err) {
    res.status(500).json({ msg: "error in cart inc" });
  }
};

const dec = async (req, res) => {
  try {
    // await Cart.findByIdAndUpdate(req.params.cid, { $inc: { qty: -1 } });
    let item = await cm.findById(req.params.cid);
    if (item.qty > 1) {
      await cm.findByIdAndUpdate(req.params.cid, { $inc: { qty: -1 } });
      res.json({ msg: "cart dec" });
    } else {
      res.json({ msg: "min qty reached" });
    }
    res.json({ msg: "cart dec" });
  } catch (err) {
    res.status(500).json({ msg: "error in cart dec" });
  }
};

const delcart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cid);
    res.json({ msg: "prod del from cart" });
  } catch (err) {
    res.status(500).json({ msg: "error in del cart" });
  }
};

module.exports = { addcart, getcart, inc, dec, delcart };
