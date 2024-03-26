const { Chatroom } = require("../models/index.js");

async function getChatrooms() {
  try {
    const chatrooms = await Chatroom.findAll({ raw: true });
    return chatrooms;
  } catch (err) {
    throw err;
  }
}

module.exports = { getChatrooms };
