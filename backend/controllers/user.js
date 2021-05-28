const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const { sequelize, User } = require("../models");

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, description, photo, isAdmin } = req.body;

  try {
    const user = await User.create({ firstName, lastName, email, password, description, photo, isAdmin });

    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            message: "Utilisateur connecté !",
            userUuid: user.uuid,
            token: jwt.sign({ userUuid: user.uuid }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }),
          });
        })
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.currentUser = async (req, res) => {
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
};

exports.deleteUser = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid } });

    await user.destroy();

    return res.json({ message: "Utilisateur effacé !" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.updateUser = async (req, res) => {
  const uuid = req.params.uuid;
  const { firstName, lastName, email, password, description, photo, isAdmin } = req.body;
  try {
    const user = await User.findOne({ where: { uuid } });

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
    return res.status(500).json({ error: "Something went wrong" });
  }
};
