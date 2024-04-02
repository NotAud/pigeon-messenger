const router = require("express").Router();
const {
  createChatroom,
  deleteChatroom,
} = require("../../api/chatrooms.api.js");

const connections = new Set();

router.ws("/", function (ws, req) {
  connections.add(ws);

  ws.on("message", async function (rawData) {
    const data = JSON.parse(rawData);
    if (!data) {
      return;
    }

    if (data.action === "new-chatroom") {
      _createChatroom(data);
      return;
    }

    if (data.action === "delete-chatroom") {
      _deleteChatroom(data);
      return;
    }
  });

  ws.on("close", function () {
    connections.delete(ws);
  });

  async function _createChatroom(data) {
    const response = await createChatroom(data?.access_token, data.request);

    try {
      const newMessage = JSON.stringify({
        action: "new-chatroom",
        data: response,
      });

      broadcast(newMessage);
    } catch (err) {
      throw err;
    }
  }

  async function _deleteChatroom(data) {
    const response = await deleteChatroom(data?.access_token, data.request);

    try {
      const newMessage = JSON.stringify({
        action: "delete-chatroom",
        data: response,
      });

      broadcast(newMessage);
    } catch (err) {
      throw err;
    }
  }
});

async function broadcast(data) {
  for (const connection of connections) {
    if (connection.readyState === 1) {
      connection.send(data);
    }
  }
}

module.exports = router;
