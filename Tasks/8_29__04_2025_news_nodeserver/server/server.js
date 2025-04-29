// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// --- Models ---
const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  phno: String,
  pwd: String,
  role: { type: String, default: "user" }
});
const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
  _id: String,
  title: String,
  cat: String,
  text: String,
  date: String,
  uname: String,
  uid: String,
  status: { type: String, default: "pending" },
  comm: String,
  likes: [],
  dlikes: []
});
const Post = mongoose.model("Post", postSchema);

// --- Middleware ---
const isLogin = async (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, "abcd");
    next();
  } catch {
    res.json({ msg: "plz login" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    let user = await User.findById(req.headers.uid);
    if (user && user.role === "admin") {
      next();
    } else {
      res.json({ msg: "you are not admin" });
    }
  } catch {
    res.json({ msg: "error in authorization" });
  }
};

// --- Controllers ---
// User
const register = async (req, res) => {
  try {
    let existing = await User.findById(req.body._id);
    if (existing) return res.json({ msg: "check email" });

    const hashedPwd = await bcrypt.hash(req.body.pwd, 10);
    let user = new User({ ...req.body, pwd: hashedPwd });
    await user.save();
    res.json({ msg: "reg done" });
  } catch {
    res.json({ msg: "error in reg" });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findById(req.body._id);
    if (!user) return res.json({ msg: "check email" });

    let valid = await bcrypt.compare(req.body.pwd, user.pwd);
    if (!valid) return res.json({ msg: "check password" });

    res.json({
      token: jwt.sign({ _id: user._id }, "abcd"),
      _id: user._id,
      name: user.name,
      role: user.role
    });
  } catch {
    res.json({ msg: "error in login" });
  }
};

// Posts
const addPost = async (req, res) => {
  try {
    let post = new Post({ ...req.body, _id: uuidv4() });
    await post.save();
    res.json({ msg: "post created" });
  } catch {
    res.json({ msg: "error in adding post" });
  }
};

const getAllApproved = async (req, res) => {
  try {
    let data = await Post.find({ status: "approved" });
    res.json(data);
  } catch {
    res.json({ msg: "error in getting post" });
  }
};

const getByCategory = async (req, res) => {
  try {
    let data = await Post.find({ cat: req.params.cat, status: "approved" });
    res.json(data);
  } catch {
    res.json({ msg: "error in getting post" });
  }
};

const postsByUser = async (req, res) => {
  try {
    let data = await Post.find({ uid: req.params.uid });
    res.json(data);
  } catch {
    res.json({ msg: "error in getting post" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    let data = await Post.find({});
    res.json(data);
  } catch {
    res.json({ msg: "error in getting post" });
  }
};

const updatePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate({ _id: req.body._id }, req.body);
    res.json({ msg: "updated" });
  } catch {
    res.json({ msg: "error in updpost" });
  }
};

const addLike = async (req, res) => {
  try {
    let found = await Post.find({ _id: req.body._id, dlikes: { $in: [req.body.uid] } });
    if (found.length === 0) {
      await Post.findByIdAndUpdate({ _id: req.body._id }, { $addToSet: { likes: req.body.uid } });
    }
    res.json({ msg: "ok" });
  } catch {
    res.json({ msg: "notok" });
  }
};

const addDislike = async (req, res) => {
  try {
    let found = await Post.find({ _id: req.body._id, likes: { $in: [req.body.uid] } });
    if (found.length === 0) {
      await Post.findByIdAndUpdate({ _id: req.body._id }, { $addToSet: { dlikes: req.body.uid } });
    }
    res.json({ msg: "ok" });
  } catch {
    res.json({ msg: "notok" });
  }
};

// --- App Setup ---
const app = express();
app.use(express.json());
app.use(cors());

// --- Routes ---
app.post("/reg", register);
app.post("/login", login);
app.post("/add", addPost);
app.get("/", getAllApproved);
app.get("/posts/:cat", getByCategory);
app.get("/postsbyme/:uid", postsByUser);
app.get("/admin", getAllPosts); // Optionally protect with isAdmin
app.put("/updpost", updatePost);
app.post("/addlike", addLike);
app.post("/adddlike", addDislike);

// --- DB Connect & Start Server ---
mongoose.connect("mongodb://127.0.0.1:27017/hfs1postdb")
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
