const mongoose = require("mongoose");
const User = require("../models/user");

const getUsers = (req, res) => {
  return User.find({}).then((users) => {
    return res
      .status(200)
      .json({
        success: true,
        message: "get list user successfully",
        User: users,
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: error.message,
        });
      });
  });
};

const addUser = (req, res) => {
  const { firstName, lastName, email, password } = req?.body || {};
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName,
    lastName,
    email,
    password,
  });

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

const updateUser = async (req, res) => {
  const { id, firstName, lastName, email, password } = req?.body || {};

  const user = await User.findById(id).exec();
  if (!user)
    return res.status(203).json({
      success: true,
      message: "User does not exist",
      User: null,
    });

  // const result = await User.updateOne(
  //   {},
  //   { firstName, lastName, email, password }
  // );
  // console.log(result, "result 111");

  return User.updateOne({}, { firstName, lastName, email, password })
    .then((newUser) => {
      return res.status(200).json({
        success: true,
        message: "Update user successfully",
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

const deleteUser = async (req, res) => {
  const { id } = req?.params || {};
  const user = await User.findById(id).exec();
  if (!user)
    return res.status(203).json({
      success: true,
      message: "User does not exist",
      User: null,
    });

  return User.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  }).then((response) => {
    return res.status(200).json({
      success: true,
      message: "Delete user successfully",
      User: response,
    });
  });
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
