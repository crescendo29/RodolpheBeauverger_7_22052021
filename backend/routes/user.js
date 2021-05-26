const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const user = require("../models/user");

router.post("/signup", multer, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:uuid", userCtrl.currentUser);
router.get("/", userCtrl.getAllUsers);

module.exports = router;
