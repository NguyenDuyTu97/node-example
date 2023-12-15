const express = require("express");
const { getHomeInfo } = require("../controllers/homeController");
const { addUser } = require("../controllers/userController");
const { addRole } = require("../controllers/roleController");
const router = express.Router();

// middleware that is specific to this router
// home
router.get("/", getHomeInfo);

// user
router.post("/add-user", addUser);

// role
router.post("/add-role", addRole);

module.exports = router;
