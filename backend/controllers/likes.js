const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/signup", multer, userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/logout", userCtrl.logout);
router.delete("/delete", userCtrl.deleteUser);
router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, multer, userCtrl.updateUser);

module.exports = router;
