module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("enrollments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: { model: "students", key: "id" },
        onDelete: "CASCADE",
        allowNull: false,
      },
      plan_id: {
        type: Sequelize.INTEGER,
        references: { model: "plans", key: "id" },
        onDelete: "CASCADE",
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("enrollments");
  },
};
