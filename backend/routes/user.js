const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("/signup", multer, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:uuid", userCtrl.currentUser);
router.get("/", userCtrl.getAllUsers);
router.delete("/:uuid", userCtrl.deleteUser);
router.put("/:uuid", auth, multer, userCtrl.updateUser);

module.exports = router;
