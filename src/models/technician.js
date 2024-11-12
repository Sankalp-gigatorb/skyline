// models/technician.js
module.exports = (sequelize, DataTypes) => {
  const Technician = sequelize.define(
    "Technician",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      employmentDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      availabilityStatus: {
        type: DataTypes.ENUM("available", "unavailable", "onLeave"),
      },
    },
    {
      timestamps: true,
    }
  );

  return Technician;
};
