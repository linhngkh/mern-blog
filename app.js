require("dotenv").config();
const express = require("express");
const colors = require("colors");
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("helo");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgMagenta);
});
