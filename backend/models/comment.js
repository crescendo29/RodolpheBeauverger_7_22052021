"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ Post, User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.belongsTo(Post, { foreignKey: "postId", as: "post" });
    }
  }
  Comment.init(
    {
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "comments",
      modelName: "Comment",
    }
  );
  return Comment;
};
