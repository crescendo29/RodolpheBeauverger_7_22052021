const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/user");

//const { sequelize, User, Post } = require("./models");

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth/", userRoutes);

/* app.post("/users", async (req, res, next) => {
  const { firstName, lastName, email, password, description, photo, isAdmin } = req.body;

  try {
    const user = await User.create({ firstName, lastName, email, password, description, photo, isAdmin });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});
app.get("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
      include: "posts",
    });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});
app.put("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;

  const { firstName, lastName, email, password, description, photo, isAdmin } = req.body;

  try {
    const user = await User.findOne({
      where: { uuid },
    });

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.description = description;
    user.photo = photo;

    await user.save();

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});
app.delete("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
    });

    await user.destroy();

    return res.json({ message: "Utilisateur effacé!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});

app.post("/posts", async (req, res) => {
  const { userUuid, body } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });

    const post = await Post.create({ body, userId: user.id });

    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({ include: ["user"] });

    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
}); */

module.exports = app;
