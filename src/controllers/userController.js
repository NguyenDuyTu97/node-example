const mongoose = require("mongoose");
const User = require("../models/user");

const addUser = (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author,
  });

  console.log(user, "user 1111111111");

  return user
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: "New user created successfully",
        User: newUser,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

module.exports = {
  addUser,
};
