const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 8081;

// config template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// config static files
app.use(express.static(path.join(__dirname, "public")));

// config route
app.get("/", (req, res) => {
  res.render("example.ejs", { title: "Hey", message: "Hello there!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
