const router = require("express").Router();
const { createChatroom } = require("../../api/chatrooms.api.js");

const connections = new Set();

router.ws("/", function (ws, req) {
  connections.add(ws);

  ws.on("message", async function (rawData) {
    const data = JSON.parse(rawData);
    if (!data || data.action !== "new-chatroom") {
      return;
    }

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
  });

  ws.on("close", function () {
    connections.delete(ws);
  });
});

async function broadcast(data) {
  for (const connection of connections) {
    if (connection.readyState === 1) {
      connection.send(data);
    }
  }
}

module.exports = router;
