"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Request, {
        as: "request",
        foreignKey: "requestID",
      })
      Comment.belongsTo(models.User, { as: "Author", foreignKey: "userID" })
    }
  }

  Comment.init(
    {
      requestID: DataTypes.INTEGER,
      kind: DataTypes.ENUM("notice", "question", "comment"),
      type: DataTypes.ENUM("internal", "public"),
      userID: DataTypes.INTEGER,
      title: DataTypes.STRING,
      text: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  )

  return Comment
}
