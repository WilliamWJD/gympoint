import Sequelize from "sequelize";
import dbConfig from "../config/database";

import User from "../app/models/User";
import Student from "../app/models/Student";
import Plan from "../app/models/Plan";
import Enrollment from "../app/models/Enrollment";
import Checkin from "../app/models/Checkin";
import HelpOrder from "../app/models/HelpOrder";

const models = [User, Student, Plan, Enrollment, Checkin, HelpOrder];

class Database {
  constructor() {
    this.connection = new Sequelize(dbConfig);
    this.init();
    this.associate();
  }

  init() {
    models.forEach((model) => model.init(this.connection));
  }

  associate() {
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
