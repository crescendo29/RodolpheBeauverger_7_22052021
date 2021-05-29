const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comments");
const auth = require("../middleware/auth");

//router.post("/", commentCtrl.createComment);
//router.get("/", commentCtrl.getAllComments);
//router.get("/:uuid", commentCtrl.getOneComment);
//router.put("/:uuid", commentCtrl.updateComment);
//router.delete("/:uuid", commentCtrl.deleteComment);

module.exports = router;
