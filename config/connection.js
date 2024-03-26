require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.POSTGRES_DB,
      process.env.POSTGRES_USER,
      process.env.POSTGRES_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
        dialectOptions: {
          decimalNumbers: true,
        },
        logging: false,
      }
    );

module.exports = sequelize;
