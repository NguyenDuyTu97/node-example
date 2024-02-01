const express = require("express");
const { getHomeInfo } = require("../controllers/homeController");
const {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  login,
  refreshToken,
} = require("../controllers/userController");
const { addRole } = require("../controllers/roleController");
const { verifyAuth } = require("../middleware/userMiddleware");
const router = express.Router();

// middleware that is specific to this router

// login
router.post("/login", login);
router.post("/refresh-token", refreshToken);

// home
router.get("/", getHomeInfo);

// user
// router.get("/get-users", verifyAuth, getUsers);
router.get("/get-users", getUsers);
router.post("/add-user", addUser);
router.put("/update-user", updateUser);
router.delete("/delete-user/:id", deleteUser);

// role
router.post("/add-role", addRole);

module.exports = router;
