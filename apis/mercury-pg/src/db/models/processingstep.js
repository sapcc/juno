"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class ProcessingStep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProcessingStep.init(
    {
      requestID: DataTypes.INTEGER,
      processorID: DataTypes.INTEGER,
      type: DataTypes.STRING,
      title: DataTypes.STRING,
      comment: DataTypes.TEXT,
      referenceStepID: DataTypes.INTEGER,
      fromState: DataTypes.STRING,
      toState: DataTypes.STRING,
      transition: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProcessingStep",
    }
  )
  return ProcessingStep
}
