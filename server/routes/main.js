const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const locals = {
    title: "NodeJS Blog",
    description: "Simple Blog created with Nodejs, express, mongoDB",
  };
  res.render("index", { locals });
});

module.exports = router;