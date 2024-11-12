"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true, // enables soft delete with deletedAt timestamp
    }
  );

  User.associate = function (models) {
    // A User belongs to one Role
    User.belongsTo(models.Role, {
      foreignKey: "roleId",
      as: "role", // alias for easier access
    });

    // A User belongs to one Address
    User.belongsTo(models.Address, {
      foreignKey: "addressId",
      as: "address", // alias for easier access
    });
  };

  return User;
};
