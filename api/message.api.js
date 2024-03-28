const { Message, User } = require("../models/index.js");
const { useAuth } = require("../util/useAuth");
const { v4: uuidv4 } = require("uuid");

const auth = useAuth();

/**
 * PUBLIC
 */

async function getMessages(data) {
  const { chatroom_id } = data;
  if (!chatroom_id) {
    throw { message: "Missing required fields" };
  }

  try {
    const messages = await Message.findAll({
      where: { chatroom_id },
      attributes: ["message", "created_at"],
      include: [{ model: User, as: "author", attributes: ["display_name"] }],
      raw: true,
      nest: true,
    });
    return messages;
  } catch (err) {
    throw { message: err.message };
  }
}

/**
 * AUTHENTICATED
 */

async function createMessage(access_token, data) {
  const user = auth.verifyToken(access_token);
  if (!user) {
    throw { message: "Invalid token" };
  }

  const { chatroom_id, message } = data;
  if (!chatroom_id || !user.id || !message) {
    throw { message: "Missing required fields" };
  }

  try {
    const messageData = await Message.create({
      id: uuidv4(),
      chatroom_id,
      author_id: user.id,
      message,
    });

    const messageWithAuthor = await Message.findByPk(messageData.id, {
      attributes: ["message", "created_at"],
      include: [
        { model: User, as: "author", attributes: ["id", "display_name"] },
      ],
    });

    return messageWithAuthor.get({ plain: true });
  } catch (err) {
    throw { message: err.message };
  }
}

module.exports = { createMessage, getMessages };
