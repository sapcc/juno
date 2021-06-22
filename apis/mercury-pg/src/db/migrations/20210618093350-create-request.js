"use strict"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Requests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kind: {
        type: Sequelize.STRING,
      },
      priority: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      subject: {
        type: Sequelize.STRING,
      },
      region: {
        type: Sequelize.STRING,
      },
      isDomainScoped: {
        type: Sequelize.BOOLEAN,
      },
      isProjectScoped: {
        type: Sequelize.BOOLEAN,
      },
      domainID: {
        type: Sequelize.STRING,
      },
      domainName: {
        type: Sequelize.STRING,
      },
      projectID: {
        type: Sequelize.STRING,
      },
      projectName: {
        type: Sequelize.STRING,
      },
      requesterID: {
        type: Sequelize.INTEGER,
      },
      processorsIDs: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      tags: {
        type: Sequelize.JSON,
      },
      state: {
        type: Sequelize.STRING,
      },
      payload: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable("Requests")
  },
}
