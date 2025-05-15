const multer = require("multer");
const { v4 } = require("uuid");
const fs = require("fs");
const Product = require("../models/prodmodel");
const Cart = require("../models/cartmodel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./prodimgs");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`);
  },
});
const upload = multer({ storage });

const add = async (req, res) => {
  try {
    const data = new Product({ ...req.body, pimg: req.file.filename, _id: v4() });
    await data.save();
    res.json({ msg: "prod added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error in adding prod" });
  }
};

const getprod = async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "error in fetching products" });
  }
};

const addcom = async (req, res) => {
  try {
    const { _id, ...comment } = req.body;
    await Product.findByIdAndUpdate(_id, { $push: { comm: comment } });
    const updated = await Product.findById(_id);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error in adding comment" });
  }
};

const edit = async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    await Product.findByIdAndUpdate(_id, rest);
    await Cart.updateMany({ pid: _id }, rest);
    res.json({ msg: "upd done" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error in edit prod" });
  }
};

const editimg = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.body._id, { pimg: req.file.filename });
    fs.rm(`./prodimgs/${req.body.oldimg}`, { force: true }, () => {});
    await Cart.updateMany({ pid: req.body._id }, { pimg: req.file.filename });
    res.json({ msg: "upd done" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error in edit prod" });
  }
};

const delprod = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.pid);
    if (deleted?.pimg) {
      fs.rm(`./prodimgs/${deleted.pimg}`, { force: true }, () => {});
    }
    await Cart.deleteMany({ pid: req.params.pid });
    res.json({ msg: "deldone" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error in del" });
  }
};

module.exports = { add, getprod, upload, addcom, edit, editimg, delprod };
