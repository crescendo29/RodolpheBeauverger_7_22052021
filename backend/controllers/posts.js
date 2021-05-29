const fs = require("fs");
const { sequelize, User, Post } = require("../models");

exports.createPost = async (req, res, next) => {
  const { userUuid, body, content } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });

    const post = await Post.create({ body, content, userId: user.id });

    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll();

    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
exports.getOnePost = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const post = await Post.findOne({
      where: { uuid },
      include: "user",
    });

    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
exports.updatePost = async (req, res, next) => {
  const uuid = req.params.uuid;
  const { body, content } = req.body;
  try {
    const post = await Post.findOne({ where: { uuid } });

    post.body = body;
    post.content = content;

    await post.save();

    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.deletePost = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const post = await Post.findOne({ where: { uuid } });

    await post.destroy();

    return res.json({ message: "post effacé !" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
