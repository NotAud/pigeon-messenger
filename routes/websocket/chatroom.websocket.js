const router = require("express").Router();

router.ws("/:chatroomID", function (ws, req) {
  ws.on("message", function (message) {
    try {
      message = JSON.stringify({
        type: "message",
        action: "new-message",
        message,
      });
      ws.send(message);
    } catch (err) {
      throw err;
    }
  });
});

module.exports = router;
