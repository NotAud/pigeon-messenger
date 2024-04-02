require("dotenv").config();

const Sequelize = require("sequelize");

let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
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
}

module.exports = sequelize;
