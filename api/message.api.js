const { Message } = require("../models/index.js");
const { useAuth } = require("../util/useAuth");
const { v4: uuidv4 } = require("uuid");

const auth = useAuth();

/**
 * PUBLIC
 */

async function getMessages(data) {
  const { chatroom_id } = data;
  if (!chatroom_id) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    const messages = await Message.findAll({
      where: { chatroom_id },
      raw: true,
    });
    return messages;
  } catch (err) {
    throw err;
  }
}

/**
 * AUTHENTICATED
 */

async function createMessage(token, data) {
  const user = auth.verifyToken(token);
  if (!user) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const { chatroom_id, message } = data;
  if (!chatroom_id || !user.id || !message) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    const messageData = await Message.create({
      id: uuidv4(),
      chatroom_id,
      author_id: user.id,
      message,
    });
    return messageData.get({ plain: true });
  } catch (err) {
    throw err;
  }
}

module.exports = { createMessage, getMessages };
