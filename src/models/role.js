const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const roleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Role", roleSchema);
