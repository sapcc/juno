"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment, { as: "comments", foreignKey: "userID" })
      User.hasMany(models.Request, {
        foreignKey: "requesterID",
        as: "openedRequests",
      })
      User.hasMany(models.Request, {
        foreignKey: "processorsIDs",
        as: "processedRequests",
      })
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      profileSettings: DataTypes.JSON,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  )

  return User
}
