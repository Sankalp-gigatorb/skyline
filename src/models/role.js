"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false, // Disable createdAt and updatedAt
    }
  );

  Role.associate = function (models) {
    // define associations here if needed
     Role.hasOne(models.User, {
       foreignKey: "roleId",
       as: "user", // alias for easier access
     });
  };

  return Role;
};
