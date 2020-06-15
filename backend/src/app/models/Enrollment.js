import Sequelize, { Model } from "sequelize";

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.REAL,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: "student_id", as: "Student" });
    this.belongsTo(models.Plan, { foreignKey: "plan_id", as: "Plan" });
  }
}

export default Enrollment;
