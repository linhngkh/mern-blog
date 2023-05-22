const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

const adminLayout = "../views/layouts/admin.ejs";

// get admin - login
router.get("/admin", async (req, res) => {
  const locals = {
    title: "NodeJS Blog",
    description: "Simple Blog created with Nodejs, express, mongoDB",
  };
  res.render("admin/index", { locals, adminLayout });
  try {
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
