require("dotenv").config();

module.exports = {
  development: {
    username: process.env.PG_SQL_DB_USER,
    password: process.env.PG_SQL_DB_PWD,
    database: process.env.PG_SQL_DB_NAME,
    host: process.env.PG_SQL_DB_SERVER,
    port: process.env.PG_SQL_DB_PORT,
    dialect: "postgres",
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.PG_SQL_DB_USER,
    password: process.env.PG_SQL_DB_PWD,
    database: process.env.PG_SQL_DB_NAME,
    host: process.env.PG_SQL_DB_SERVER,
    port: process.env.PG_SQL_DB_PORT,
    dialect: "postgres",
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  },
};
