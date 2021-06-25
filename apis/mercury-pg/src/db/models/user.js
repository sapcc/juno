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
      })
      User.hasMany(models.Request, {
        foreignKey: "requesterID",
        as: "createdRequests",
      })
    }

    // create or update user by name
    static async createOrUpdate({ name, email, fullName }) {
      const [user, created] = await User.findOrCreate({
        where: { name },
        defaults: {
          createdAt: Date.now(),
          name,
        },
      })
      if (!email && !fullName) return user
      user.email = data.email
      user.fullName = data.fullName
      user.updatedAt = data.updatedAt
      return await user.save()
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      settings: DataTypes.JSON,
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
