const { Chatroom, Message, User } = require("../models/index.js");
const { useAuth } = require("../util/useAuth");
const { v4: uuidv4 } = require("uuid");

const auth = useAuth();

/**
 * PUBLIC
 */

async function getChatrooms() {
  try {
    const chatrooms = await Chatroom.findAll({
      attributes: ["id", "name", "created_at"],
      include: [
        { model: User, as: "owner", attributes: ["id", "display_name"] },
      ],
      order: [["created_at", "ASC"]],
      raw: true,
      nest: true,
    });
    return chatrooms;
  } catch (err) {
    throw { message: err.message };
  }
}

async function getChatroom(id) {
  try {
    const chatroom = await Chatroom.findOne({
      where: { id },
      attributes: ["id", "name", "created_at"],
      include: [
        {
          model: Message,
          limit: 150,
          order: [["created_at", "DESC"]],
          include: [
            {
              model: User,
              as: "author",
              attributes: ["display_name", "created_at"],
            },
          ],
        },
        { model: User, as: "owner", attributes: ["id", "display_name"] },
      ],
    });

    if (!chatroom) {
      return null;
    }

    return chatroom.get({ plain: true });
  } catch (err) {
    throw { message: err.message };
  }
}

/**
 * AUTHENTICATED
 */

async function createChatroom(access_token, data) {
  const user = auth.verifyToken(access_token);
  if (!user) {
    return { message: "Invalid token" };
  }

  const { name } = data;
  if (!name || !user.id) {
    return { message: "Missing required fields" };
  }

  try {
    const chatroomData = await Chatroom.create({
      id: uuidv4(),
      name,
      owner_id: user.id,
    });

    const chatroomWithOwner = await Chatroom.findByPk(chatroomData.id, {
      attributes: ["id", "name", "created_at"],
      include: [
        { model: User, as: "owner", attributes: ["id", "display_name"] },
      ],
    });
    return chatroomWithOwner.get({ plain: true });
  } catch (err) {
    return { message: err.message };
  }
}

// TODO: DELETE MESSAGES AFTER DELETING CHATROOM
async function deleteChatroom(access_token, data) {
  const user = auth.verifyToken(access_token);
  if (!user) {
    return { message: "Invalid token" };
  }

  const { id: chatroom_id } = data;
  if (!chatroom_id || !user.id) {
    return { message: "Missing required fields" };
  }

  try {
    const chatroom = await Chatroom.findOne({
      attributes: ["id", "owner_id"],
      where: { id: chatroom_id },
      raw: true,
    });

    if (chatroom.owner_id != user.id) {
      return { message: "Unauthorized" };
    }

    await Chatroom.destroy({
      where: { id: chatroom_id },
      raw: true,
    });

    return chatroom_id;
  } catch (err) {
    return { message: err.message };
  }
}

module.exports = { getChatrooms, createChatroom, getChatroom, deleteChatroom };
