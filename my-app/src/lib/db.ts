import { Sequelize } from "sequelize";

const globalForSequelize = globalThis as unknown as {
  sequelize?: Sequelize;
};

function createSequelize() {
  const url =
    process.env.DATABASE_URL ??
    "postgres://postgres:postgres@localhost:5432/tasks_dev";

  return new Sequelize(url, {
    dialect: "postgres",
    logging: false,
  });
}

export const sequelize =
  globalForSequelize.sequelize ?? createSequelize();

if (process.env.NODE_ENV !== "production") {
  globalForSequelize.sequelize = sequelize;
}