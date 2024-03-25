const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Message extends Model {}

Message.init(
  {
    id: DataTypes.STRING,
    chatroom_id: DataTypes.STRING,
    message: DataTypes.STRING,
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

module.exports = Message;
