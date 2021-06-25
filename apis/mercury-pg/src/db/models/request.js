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
        as: "Requester",
        foreignKey: "requesterID",
      })
      Request.hasMany(models.ProcessingStep, {
        foreignKey: "requestID",
      })
    }

    get requester() {
      return this.getRequester()
    }

    get processors() {
      return sequelize.models.User.findAll({
        where: { id: this.processorsIDs },
      })
    }

    get scope() {
      const domainScope = this.domainID && {
        id: this.domainID,
        name: this.domainName,
      }
      if (this.projectID)
        return {
          project: {
            id: this.projectID,
            name: this.projectName,
            domain: domainScope,
          },
        }
      else if (domainScope) return { domain: domainScope }
      return {}
    }

    async start(processorID) {
      this.state = "processing"
      this.stateDetails = "accept request"
      this.processorsIDs = this.processorsIDs || []
      this.processorsIDs.push(processorID)
      this.save()
    }
    async reject(processorID) {
      this.state = "rejected"
      this.stateDetails = "cancel request"
      this.processorsIDs = this.processorsIDs || []
      this.processorsIDs.push(processorID)
      this.save()
    }
  }

  Request.init(
    {
      requesterID: DataTypes.INTEGER,
      lastProcessorID: DataTypes.INTEGER,
      kind: DataTypes.STRING,
      priority: DataTypes.INTEGER,
      subject: DataTypes.STRING,
      description: DataTypes.TEXT,
      payload: DataTypes.JSON,
      region: DataTypes.STRING,
      domainID: DataTypes.STRING,
      domainName: DataTypes.STRING,
      projectID: DataTypes.STRING,
      projectName: DataTypes.STRING,
      tags: DataTypes.JSON,
      state: DataTypes.ENUM(
        "open",
        "processing",
        "waiting",
        "rejected",
        "approved",
        "closed"
      ),
      stateDetails: DataTypes.STRING,
      processingStepsIDs: DataTypes.ARRAY(DataTypes.INTEGER),
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
