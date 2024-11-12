"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Roles", [
      { role: "admin" },
      { role: "user" },
      { role: "technician" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
