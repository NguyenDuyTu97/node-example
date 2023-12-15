const mongoose = require("mongoose");
const Role = require("../models/role");

const addRole = (req, res) => {
  const role = new Role({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
  });

  return role
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: "New role created successfully",
        Role: newUser,
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
  addRole,
};
