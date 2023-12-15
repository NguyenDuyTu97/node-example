const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  published: {
    type: String,
    required: false,
  },
  publisher: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
