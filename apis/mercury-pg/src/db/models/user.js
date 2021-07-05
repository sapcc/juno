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
      User.hasMany(models.ProcessingStep, {
        as: "processingSteps",
        foreignKey: "processorID",
        constraints: false,
      })
      User.hasMany(models.Request, {
        foreignKey: "requesterID",
        as: "createdRequests",
        constraints: false,
      })
    }

    // create or update user by name
    static async createOrUpdate({ name, email, fullName }) {
      return User.findOne({ where: { name } }).then((user) => {
        if (user) {
          if (email) user.email = email
          if (fullName) user.fullName = fullName
          user.save()
          return user
        }
        return User.create({ name, email, fullName })
      })
    }

    get processingSteps() {
      return this.getProcessingSteps()
    }
    get createdRequests() {
      return this.getCreatedRequests()
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      settings: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "User",
    }
  )

  return User
}
