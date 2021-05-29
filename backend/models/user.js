"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Comment }) {
      // define association here
      this.hasMany(Post, { foreignKey: "userId", as: "posts" });
      this.hasMany(Comment, { foreignKey: "userId", as: "comments" });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Vous devez indiquer votre prénom" },
          notEmpty: { msg: "Le prénom ne doit pas être vide" },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Vous devez indiquer votre nom" },
          notEmpty: { msg: "Le nom ne doit pas être vide" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Vous devez indiquer votre mail" },
          notEmpty: { msg: "Le mail ne doit pas être vide" },
          isEmail: { msg: "doit être une adresse mail valide" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Vous devez indiquer votre mot de passe" },
          notEmpty: { msg: "Le mot de passe ne doit pas être vide" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      photo: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },

    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });
  User.beforeUpdate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  return User;
};
