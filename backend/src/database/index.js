import Sequelize from "sequelize";
import dbConfig from "../config/database";

import User from "../app/models/User";
import Student from "../app/models/Student";

const models = [User, Student];

class Database {
  constructor() {
    this.connection = new Sequelize(dbConfig);
    this.init();
  }

  init() {
    models.forEach((model) => model.init(this.connection));
  }
}

export default new Database();
