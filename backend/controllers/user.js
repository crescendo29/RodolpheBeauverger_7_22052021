const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { sequelize, User, Post } = require("../models");

exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, password, description, photo, isAdmin } = req.body;

  try {
    User.beforeCreate(async (user) => {
      const salt = await bcrypt.genSalt(10); //whatever number you want
      user.password = await bcrypt.hash(user.password, salt);
    });
    const user = await User.create({ firstName, lastName, email, password, description, photo, isAdmin });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

/* exports.login = async (req, res) => {

} */
