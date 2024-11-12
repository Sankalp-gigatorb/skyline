"use strict";
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service",
    {
      customerId: {
        // Foreign key referencing the Users table
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      serviceType: {
        // Type of service (installation, maintenance, etc.)
        type: DataTypes.ENUM("installation", "maintenance", "warranty_claim"),
        allowNull: false,
      },
      bookingDate: {
        // Date when the service was booked
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      scheduledDate: {
        // Scheduled date for the service
        type: DataTypes.DATE,
        allowNull: true,
      },
      serviceStatus: {
        // Status of the service ('pending', 'confirmed', 'completed', 'cancelled')
        type: DataTypes.ENUM("pending", "confirmed", "completed", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
      technicianId: {
        // Foreign key referencing the Technicians table
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Technicians",
          key: "id",
        },
      },
      receipt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  Service.associate = function (models) {
    // Associations
    Service.belongsTo(models.User, {
      foreignKey: "customerId",
     
    });
    Service.belongsTo(models.Technician, {
      foreignKey: "technicianId",
      as: "technician",
    });
  };

  return Service;
};
