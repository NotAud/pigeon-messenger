const router = require("express").Router();
const { createMessage } = require("../../api/message.api");

const connections = {};

router.ws("/:chatroomID", function (ws, req) {
  if (!connections[req.params.chatroomID]) {
    connections[req.params.chatroomID] = new Set();
  }

  connections[req.params.chatroomID].add(ws);

  ws.on("message", async function (rawData) {
    const data = JSON.parse(rawData);
    if (!data || data.action !== "new-message") {
      return;
    }

    const response = await createMessage(data?.access_token, data);

    try {
      const newMessage = JSON.stringify({
        type: "message",
        action: "new-message",
        data: {
          message: response.message,
          author: response.author,
        },
      });

      broadcast(req.params.chatroomID, newMessage);
    } catch (err) {
      throw err;
    }
  });

  ws.on("close", function () {
    connections[req.params.chatroomID].delete(ws);
  });
});

async function broadcast(id, data) {
  for (const connection of connections[id]) {
    if (connection.readyState === 1) {
      connection.send(data);
    }
  }
}

module.exports = router;
