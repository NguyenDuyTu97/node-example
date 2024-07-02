require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");

const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");

const app = express();
const port = process.env.PORT || 8081;

// config app use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

// config CORS
app.use(cors());

// set up mongoose
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database 000");
  });

// config template engine
configViewEngine(app);

// config route
app.use("/api/", webRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
