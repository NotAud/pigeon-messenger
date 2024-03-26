const { Chatroom } = require("../models/index.js");
const { v4: uuidv4 } = require("uuid");

async function getChatrooms() {
  try {
    const chatrooms = await Chatroom.findAll({ raw: true });
    return chatrooms;
  } catch (err) {
    throw err;
  }
}

async function getChatroom(id) {
  try {
    const chatroom = await Chatroom.findOne({ where: { id } });
    return chatroom.get({ plain: true });
  } catch (err) {
    throw err;
  }
}

async function createChatroom({ name, owner_id }) {
  try {
    const chatroomData = await Chatroom.create({
      id: uuidv4(),
      name,
      owner_id,
    });
    return chatroomData.get({ plain: true });
  } catch (err) {
    throw err;
  }
}

module.exports = { getChatrooms, createChatroom, getChatroom };
