const express = require("express");
const { getHomeInfo } = require("../controllers/homeController");
const router = express.Router();

// middleware that is specific to this router
router.get("/", getHomeInfo);

module.exports = router;
