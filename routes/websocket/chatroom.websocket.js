const router = require("express").Router();
const { createMessage } = require("../../api/message.api");

router.ws("/:chatroomID", function (ws, req) {
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
      ws.send(newMessage);
    } catch (err) {
      throw err;
    }
  });
});

module.exports = router;
