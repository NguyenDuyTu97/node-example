const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUsers = (req, res) => {
  return User.find({}).then((users) => {
    return res.status(200).json({
      success: true,
      message: "get list user successfully",
      User: users,
    });
    // .catch((error) => {
    //   console.log(error);
    //   res.status(500).json({
    //     success: false,
    //     message: "Server error. Please try again.",
    //     error: error.message,
    //   });
    // });
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

const login = async (req, res) => {
  const { email, password } = req?.body || {};
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  // Validate if user exist in our database
  const user = await User.findOne({ email, password });

  if (!user)
    return res.status(400).json({
      success: false,
      message: "User does not exist",
      data: null,
    });

  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: "15s",
  });

  // save user token
  user.token = token;

  // return new user
  return res.status(200).json({
    success: true,
    message: "Login successfully",
    data: user,
  });
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,

  login,
};
