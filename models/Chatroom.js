const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Chatroom extends Model {}

Chatroom.init(
  {
    id: DataTypes.STRING,
    name: DataTypes.STRING,
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

module.exports = Chatroom;
