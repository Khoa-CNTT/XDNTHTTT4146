"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: Sequelize.UUIDV4(),
          name: "Admin",
        },
        {
          id: Sequelize.UUIDV4(),
          name: "Teacher",
        },
        {
          id: Sequelize.UUIDV4(),
          name: "Student",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
