const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Auth extends Model {}

Auth.init(
  {
    id: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    created_at: DataTypes.STRING,
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "message",
  }
);

module.exports = Auth;
