const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin.ejs";

//check login
const authMiddleware = (req, res, next) => {
  // req.cookies property is used when the user is using cookie-parser middleware
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
};

// GET admin - login page
router.get("/admin", async (req, res) => {
  const locals = {
    title: "NodeJS Blog",
    description: "Simple Blog created with Nodejs, express, mongoDB",
  };

  try {
    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

// POST admin - check login
router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// GET - private route / admin dashboard
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Admin Dashboard",
      description: "Simple Blog created with Nodejs, express, mongoDB",
    };
    const data = await Post.find();

    res.render("admin/dashboard", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

// GET - admin creates new post
router.post("/add-post", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Add Post",
      description: "Simple Blog created with Nodejs, express, mongoDB",
    };
    const data = await Post.find();

    res.render("admin/ad-post", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

// POST admin - register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashPassword });
      res.status(201).json({ message: "User created", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User is already in used" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
