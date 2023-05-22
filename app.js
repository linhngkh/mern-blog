require("dotenv").config();
const express = require("express");
const colors = require("colors");
const app = express();
const PORT = process.env.PORT;
const expressLayout = require("express-ejs-layouts");
const connectDB = require("./server/config/db");

//connect db
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgMagenta);
});
