import Sequelize, { Model } from "sequelize";

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
  }
}

export default Enrollment;
