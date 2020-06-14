import express from "express";

import "dotenv/config";
import "./database";

class App {
  constructor() {
    this.server = express();
  }

  middleware() {
    this.server.use(express.json());
  }
}

export default new App().server;
