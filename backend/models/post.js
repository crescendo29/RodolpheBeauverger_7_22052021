"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.hasMany(Comment, { foreignKey: "postId", as: "comments" });
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined };
    }
  }
  Post.init(
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
      content: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Post",
    }
  );
  return Post;
};
