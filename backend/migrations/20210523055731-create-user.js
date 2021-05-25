"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        allownull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allownull: false,
        type: DataTypes.STRING,
      },
      email: {
        allownull: false,
        type: DataTypes.STRING,
      },
      password: {
        allownull: false,
        type: DataTypes.STRING,
      },
      description: {
        allownull: true,
        type: DataTypes.TEXT,
      },
      photo: {
        allownull: true,
        type: DataTypes.BLOB,
      },
      isAdmin: {
        allownull: false,
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("users");
  },
};
