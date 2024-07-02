const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");

const saltRounds = 10;

const getUsers = async (req, res) => {
  try {
    const result = await User.find({});
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Get users successfully",
        data: result,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    }
  } catch (error) {
    console.log(error, "error");
  }
};

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req?.body || {};
    const encodePassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      email,
      password: encodePassword,
    });

    const result = await newUser.save();
    if (result) {
      return res.status(201).json({
        success: true,
        message: "Created user successfully",
        data: newUser,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    }
  } catch (error) {
    console.log(error, "error");
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id, ...rest } = req?.body || {};
    const user = await User.findById(_id).exec();

    // validation
    if (!user)
      return res.status(203).json({
        success: false,
        message: "User does not exist",
        data: null,
      });

    // update data
    const result = await User.updateOne({ _id }, { ...rest });
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Update user successfully",
        data: user,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    }
  } catch (error) {
    console.log(error, "error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req?.params || {};
    const user = await User.findById(id).exec();
    if (!user)
      return res.status(203).json({
        success: false,
        message: "User does not exist",
        data: null,
      });

    const result = await User.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Delete user successfully",
        data: null,
      });
    }
  } catch (error) {
    console.log(error, "error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req?.body || {};
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User is incorrect",
        data: null,
      });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
        data: null,
      });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "30m",
      }
    );

    const { _id, firstName, lastName } = user;
    const userResponse = { _id, firstName, lastName, token, email: user.email };

    // return new user
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      data: userResponse,
    });
  } catch (error) {
    console.log(error, "error");
  }
};

const refreshToken = async (req, res) => {
  try {
    const auth = req?.headers?.authorization;
    const user =
      JSON.parse(Buffer.from(auth.split(".")[1], "base64").toString()) || {};
    if (!user) return res.status(400).send("Data error");

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "30m",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Refresh token successfully",
      data: token,
    });
  } catch (error) {
    console.log(error, "error");
  }
};

const verifyLoginWithGoogle = async (req, res) => {
  try {
    const { accessToken } = req?.body || {};
    console.log(req?.body, "req body 000");

    // const tokenInfo = await oAuth2Client.getTokenInfo(accessToken);
    // console.log(tokenInfo, "token info 1");
  } catch (error) {
    console.log(error, "error");
  }
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,

  login,
  refreshToken,

  verifyLoginWithGoogle,
};
