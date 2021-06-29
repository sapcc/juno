"use strict"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProcessingSteps", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      requestID: {
        type: Sequelize.INTEGER,
      },
      processorID: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      kind: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.TEXT,
      },
      referenceStepID: {
        type: Sequelize.INTEGER,
      },
      fromState: {
        type: Sequelize.STRING,
      },
      toState: {
        type: Sequelize.STRING,
      },
      transition: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ProcessingSteps")
  },
}
