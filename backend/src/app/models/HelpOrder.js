import Sequelize, { Model } from "sequelize";

class HelpOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.STRING,
        answer: Sequelize.STRING,
        answer_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
  }
}

export default HelpOrder();
