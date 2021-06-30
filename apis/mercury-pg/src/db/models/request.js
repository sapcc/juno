"use strict"

const transitions = {
  startProcessing: { from: "open", to: "processing" },
  addNote: { from: "open", to: "open" },
  process: { from: "processing", to: "processing" },
  askRequester: { from: ["open", "processing"], to: "waiting" },
  answer: { from: "waiting", to: "processing" },
  approve: {
    from: ["open", "processing", "waiting"],
    to: "approved",
  },
  reject: {
    from: ["open", "processing", "waiting"],
    to: "rejected",
  },
  close: {
    from: ["open", "processing", "waiting", "rejected"],
    to: "closed",
  },
  reopen: { from: "rejected", to: "open" },
}

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

      Request.belongsTo(models.User, {
        as: "LastProcessor",
        foreignKey: "lastProcessorID",
      })

      Request.hasMany(models.ProcessingStep, {
        foreignKey: "requestID",
      })
    }

    toState(transition) {
      const stateTransitions = transitions[transition]
      if (!stateTransitions) throw new Error(`UNKNOWN TRANSITION ${transition}`)

      // get available transitions
      let { from, to } = stateTransitions
      if (!Array.isArray(from)) from = [from]

      if (from.indexOf(this.state) < 0)
        throw new Error(`BAD FROM STATE ${this.state}`)

      return to
    }

    performStateTransition(
      transition,
      { processor, kind, type, comment, referenceStepID }
    ) {
      const toState = this.toState(transition)

      const step = sequelize.models.ProcessingStep.create({
        requestID: this.id,
        processorID: processor.id,
        type: type || "public",
        kind: kind || "note",
        referenceStepID,
        comment,
        fromState: this.state,
        toState,
        transition,
      })

      if (step) {
        this.state = toState
        this.stateDetails = transition
        this.lastProcessorID = processor.id
        this.save()
      }
      return this
    }

    // constructor(values, options) {
    //   super(values, options)
    // }

    get requester() {
      return this.getRequester()
    }

    get lastProcessor() {
      return this.getLastProcessor()
    }

    get processingSteps() {
      return this.getProcessingSteps()
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

    async update(args) {
      const keys = [
        "kind",
        "subject",
        "description",
        "priority",
        "region",
        "payload",
        "tags",
      ]
      keys
        .filter((key) => args[key] !== undefined)
        .forEach((key) => (this[key] = args[key]))

      return this.save()
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
    },
    {
      sequelize,
      modelName: "Request",
    }
  )

  Request.addHook("beforeCreate", (request, options) => {
    request.state = "open"
  })

  return Request
}
