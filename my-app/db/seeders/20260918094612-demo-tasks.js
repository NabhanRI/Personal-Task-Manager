"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("tasks", [
      {
        title: "Write project README",
        description: "Document setup for the next engineer",
        dueDate: "2026-09-22",
        done: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        title: "Run Docker Compose",
        description: "Confirm app and Postgres start together",
        dueDate: "2026-09-23",
        done: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        title: "Submit GitHub repository",
        description: null,
        dueDate: null,
        done: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};