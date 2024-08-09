import { Sequelize } from "sequelize";
import path from "path";

const db = path.resolve(__dirname, "findings.db");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: db,
});

export default sequelize;
