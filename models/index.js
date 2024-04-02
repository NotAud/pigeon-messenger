const Auth = require("./Auth");
const User = require("./User");
const Chatroom = require("./Chatroom");
const Message = require("./Message");

User.hasMany(Chatroom, {
  foreignKey: "owner_id",
});

Chatroom.belongsTo(User, {
  foreignKey: "owner_id",
  as: "owner",
});

Chatroom.hasMany(Message, {
  foreignKey: "chatroom_id",
});

Message.belongsTo(Chatroom, {
  foreignKey: "chatroom_id",
});

Auth.hasOne(User, {
  foreignKey: "id",
});

User.belongsTo(Auth, {
  foreignKey: "id",
});

User.hasMany(Message, {
  foreignKey: "author_id",
});

Message.belongsTo(User, {
  foreignKey: "author_id",
  as: "author",
});

module.exports = {
  Auth,
  Chatroom,
  Message,
  User,
};
