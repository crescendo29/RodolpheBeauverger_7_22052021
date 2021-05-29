const { sequelize, User, Post, Comment } = require("../models");

exports.createComment = async (req, res, next) => {
  const { userUuid, postUuid, body } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    const post = await User.findOne({ where: { uuid: postUuid } });

    const comment = await Comment.create({ body, userId: user.id, postId: post.id });

    return res.json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
exports.getAllComments = async (req, res, next) => {
  try {
    const posts = await Post.findAll();

    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
exports.getOneComment = async (req, res, next) => {
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

exports.deleteComment = async (req, res, next) => {
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
