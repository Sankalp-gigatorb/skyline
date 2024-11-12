"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Services", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Name of the Role table
          key: "id",
        },
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      serviceType: {
        type: Sequelize.ENUM("installation", "maintenance", "warranty_claim"),
        allowNull: false,
      },
      bookingDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      scheduledDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      serviceStatus: {
        type: Sequelize.ENUM("pending", "confirmed", "completed", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
      technicianId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Technicians", // Name of the Role table
          key: "id",
        },
      },
      receipt: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Services");
  },
};
