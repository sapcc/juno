"use strict"

const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.belongsTo(models.User, {
        as: "requester",
        foreignKey: "requesterID",
      })
      Request.belongsTo(models.User, {
        as: "processors",
        foreignKey: "processorsIDs",
      })
      Request.hasMany(models.Comment, {
        as: "comments",
        foreignKey: "requestID",
      })
    }
  }

  Request.init(
    {
      kind: DataTypes.STRING,
      priority: DataTypes.STRING,
      description: DataTypes.TEXT,
      subject: DataTypes.STRING,
      region: DataTypes.STRING,
      isDomainScoped: DataTypes.BOOLEAN,
      isProjectScoped: DataTypes.BOOLEAN,
      domainID: DataTypes.STRING,
      domainName: DataTypes.STRING,
      projectID: DataTypes.STRING,
      projectName: DataTypes.STRING,
      requesterID: DataTypes.INTEGER,
      processorsIDs: DataTypes.ARRAY(DataTypes.STRING),
      tags: DataTypes.JSON,
      state: DataTypes.STRING,
      payload: DataTypes.JSON,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Request",
    }
  )

  return Request
}
