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
      ProcessingStep.belongsTo(models.ProcessingStep, {
        as: "ReferenceStep",
        foreignKey: "referenceStepID",
      })

      ProcessingStep.belongsTo(models.Request, {
        foreignKey: "requestID",
      })

      ProcessingStep.belongsTo(models.User, {
        as: "Processor",
        foreignKey: "processorID",
      })
    }

    get referenceStep() {
      return this.getReferenceStep()
    }
    get request() {
      return this.getRequest()
    }
    get processor() {
      return this.getProcessor()
    }
  }
  ProcessingStep.init(
    {
      requestID: DataTypes.INTEGER,
      processorID: DataTypes.INTEGER,
      type: DataTypes.ENUM("public", "internal"),
      kind: DataTypes.ENUM("note", "answer", "question", "solution"),
      comment: DataTypes.TEXT,
      referenceStepID: DataTypes.INTEGER,
      fromState: DataTypes.STRING,
      toState: DataTypes.STRING,
      transition: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProcessingStep",
    }
  )
  return ProcessingStep
}
