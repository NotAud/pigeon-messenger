const { Chatroom, Message, User } = require("../models/index.js");
const { useAuth } = require("../util/useAuth");
const { v4: uuidv4 } = require("uuid");

const auth = useAuth();

/**
 * PUBLIC
 */

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
    const chatroom = await Chatroom.findOne({
      where: { id },
      include: [
        {
          model: Message,
          limit: 100,
          order: [["created_at", "ASC"]],
          include: [{ model: User, as: "author" }],
        },
      ],
    });

    if (!chatroom) {
      return null;
    }

    return chatroom.get({ plain: true });
  } catch (err) {
    throw err;
  }
}

/**
 * AUTHENTICATED
 */

async function createChatroom(token, data) {
  const user = auth.verifyToken(token);
  if (!user) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const { name } = data;
  if (!name || !user.id) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    const chatroomData = await Chatroom.create({
      id: uuidv4(),
      name,
      owner_id: user.id,
    });
    return chatroomData.get({ plain: true });
  } catch (err) {
    throw err;
  }
}

module.exports = { getChatrooms, createChatroom, getChatroom };
