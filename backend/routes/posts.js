const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/posts");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("/", postCtrl.createPost);
router.get("/", postCtrl.getAllPosts);
router.get("/:uuid", postCtrl.getOnePost);
router.put("/:uuid", postCtrl.updatePost);
router.delete("/:uuid", postCtrl.deletePost);

module.exports = router;
