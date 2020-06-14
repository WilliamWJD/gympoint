require("dotenv").config();

module.exports = {
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    undescored: true,
    undescoredAll: true,
  },
};
