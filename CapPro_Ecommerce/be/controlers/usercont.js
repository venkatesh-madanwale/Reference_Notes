const User = require("../models/um");
const Cart = require("../models/cartmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "abcd"; // move to .env in production

const reg = async (req, res) => {
  try {
    const existing = await User.findById(req.body._id);
    if (existing) return res.json({ msg: "check email" });

    const hashedPwd = await bcrypt.hash(req.body.pwd, 10);
    const newUser = new User({ ...req.body, pwd: hashedPwd });
    await newUser.save();
    res.json({ msg: "reg done" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error in reg" });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    if (!user) return res.json({ msg: "check email" });

    const match = await bcrypt.compare(req.body.pwd, user.pwd);
    if (!match) return res.json({ msg: "check password" });

    const userCart = await Cart.find({ uid: user._id });
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);

    res.json({
      token,
      _id: user._id,
      name: user.name,
      role: user.role,
      cartlength: userCart.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error in login" });
  }
};

const islogin = async (req, res, next) => {
  try {
    // jwt.verify(req.headers.authorization, JWT_SECRET);
    // next();
    let islogin = async (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ msg: "plz login" });
  }
};
  } catch (err) {
    res.status(401).json({ msg: "plz login" });
  }
};

const isadmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.headers.uid);
    if (user?.role === "admin") return next();
    res.status(403).json({ msg: "you are not admin" });
  } catch (err) {
    res.status(500).json({ msg: "error in authorization" });
  }
};

module.exports = { reg, login, islogin, isadmin };
